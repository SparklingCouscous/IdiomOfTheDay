const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const axios = require('axios').default;

const getJwks = (() => {
  let promise = null;

  return () => promise = (promise || (async () => {

    const response = await axios.get(process.env.COGNITO_URL + '/.well-known/jwks.json');

    if (response.status === 200) {
      return await response.data;
    }

    promise = null; //Function should be able to be called again if request failed.
    throw new Error('Invalid JWKS response.');
  })());
})();

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send("No token provided.");
    return;
  }

  try {
    const decodedToken = jwt.decode(token, {
      complete: true,
    });

    if (!decodedToken) {
      res.status(401).send('Invalid token provided.');
      return;
    }

    const jwks = await getJwks();

    let jwk = null;
    for (const key of jwks.keys) {
      if (key.kid === decodedToken.header.kid) {
        jwk = key;
        break;
      }
    }

    if (!jwk) {
      res.status(401).send('Invalid token provided.');
      return;
    }

    const pem = jwkToPem(jwk);

    const verifiedToken = jwt.verify(token, pem, {
      algorithms: ['RS256'],
    });

    if (!verifiedToken) {
      res.status(401).send('Could not verify token.');
      return;
    }

    if (verifiedToken.iss !== process.env.COGNITO_URL) {
      res.status(401).send('Invalid token issuer.');
      return;
    }

    if (verifiedToken.token_use !== 'access') {
      res.status(401).send('Token must be an access token.');
      return;
    }

    if (verifiedToken.client_id !== process.env.COGNITO_CLIENT_ID) {
      res.status(401).send('Invalid Client ID.');
      return;
    }

    next();

  } catch (ex) {
    if (ex instanceof jwt.TokenExpiredError) {
      res.status(401).send('Token has expired.');
      return;
    }

    console.log(ex);
    res.status(401).send('Auth error.');
  }
}
