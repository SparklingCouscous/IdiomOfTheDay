var newIdiom = { idiom: "", meanig: "", origin: "", rating: "" };
// var axios = require("axios");
const form = document.getElementById("idiomForm");
const submitButtom = document.getElementById("Submit");
const idiom = document.getElementById("idiom");
const meaning = document.getElementById("meaning");
const origin = document.getElementById("origin");
const test = document.getElementById("test");

const logoutButton = document.getElementById("logout");

const searchParams = new URL(location).searchParams;
const cognitoLoginUrl =
  "https://idiom-a-day-sign-in.auth.us-east-1.amazoncognito.com";
const clientId = "20e1ukc740tq9ced1ikk676119";

let logoutButtonClicked = false;

submitButtom.addEventListener("click", addIdiom);

const sha256 = async (str) => {
  return await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
};

const generateNonce = async () => {
  const hash = await sha256(
    crypto.getRandomValues(new Uint32Array(4)).toString()
  );
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const base64URLEncode = (string) => {
  return window
    .btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

if (searchParams.get("code") !== null) {
  // logged in
  // remove the query parameters
  window.history.replaceState({}, document.title, "admin");

  // get state and PKCE
  const state = searchParams.get("state");
  const codeVerifier = sessionStorage.getItem(`codeVerifier-${state}`);
  sessionStorage.removeItem(`codeVerifier-${state}`);
  if (codeVerifier === null) {
    throw new Error("Unexpected code");
  }

  // exchange code for tokens
  await fetch(
    `${cognitoLoginUrl}/oauth2/token?grant_type=authorization_code&code=${searchParams.get(
      "code"
    )}&client_id=${clientId}&redirect_uri=http://localhost:8080/admin&code_verifier=${codeVerifier}`,
    {
      method: "POST",
      headers: new Headers({
        "content-type": "application/x-www-form-urlencoded",
      }),
      body: new URLSearchParams(),
      redirect: "follow",
    }
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  // TODO: remove this once button implementation is up
  //logoutButtonClicked = true;
} else {
  // generate nonce and PKCE
  const state = await generateNonce();
  const codeVerifier = await generateNonce();
  sessionStorage.setItem(`codeVerifier-${state}`, codeVerifier);
  const codeChallenge = base64URLEncode(await sha256(codeVerifier));

  // redirect to login
  window.location = `${cognitoLoginUrl}/login?response_type=code&client_id=${clientId}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=${window.location}`;
}

async function Logout()
{
  console.log("Logging Out");
  // Logout on button click
  const logoutState = await generateNonce();
  window.location = `${cognitoLoginUrl}/logout?client_id=${clientId}&state=${logoutState}&logout_uri=http://localhost:8080/`;
}

logoutButton.addEventListener('click', Logout);

// TODO: Add button implementation
if (logoutButtonClicked) {
  // console.log("Implement button");
  // // Logout on button click
  // const logoutState = await generateNonce();
  // window.location = `${cognitoLoginUrl}/logout?client_id=${clientId}&state=${logoutState}&logout_uri=http://localhost:8080/`;
}

function addIdiom() {
  let addedIdiom = idiom.value;
  let addedMeaning = meaning.value;
  let addedOrigin = origin.value;

  newIdiom.idiom = addedIdiom;
  newIdiom.meanig = addedMeaning;
  newIdiom.origin = addedOrigin;

  console.log(newIdiom);

  // event.preventDefault();
}
