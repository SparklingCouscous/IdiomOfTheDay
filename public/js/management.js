var newIdiom = { idiom: "", meanig: "", origin: "", rating: "" };

const form = document.getElementById("idiomForm");
const submitButtom = document.getElementById("Submit");
const idiom = document.getElementById("idiom");
const meaning = document.getElementById("meaning");
const origin = document.getElementById("origin");
const test = document.getElementById("test");
const searchParams = new URL(location).searchParams;
const cognitoLoginUrl =
  "https://idiom-a-day-sign-in.auth.us-east-1.amazoncognito.com";
const clientId = "20e1ukc740tq9ced1ikk676119";

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
} else {
  console.log("HEIHBJKHB");
  // generate nonce and PKCE
  const state = await generateNonce();
  const codeVerifier = await generateNonce();
  sessionStorage.setItem(`codeVerifier-${state}`, codeVerifier);
  const codeChallenge = base64URLEncode(await sha256(codeVerifier));
  // redirect to login
  window.location = `${cognitoLoginUrl}/login?response_type=code&client_id=${clientId}&state=${state}&code_challenge_method=S256&code_challenge=${codeChallenge}&redirect_uri=${window.location}`;
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

// ENDPOINTS for login / logout buttons:

// LOGIN: https://idiom-a-day-sign-in.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=20e1ukc740tq9ced1ikk676119&redirect_uri=http://localhost:8080/admin&state=STATE&scope=openid+aws.cognito.signin.user.admin

// LOGOUT: https://idiom-a-day-sign-in.auth.us-east-1.amazoncognito.com/logout?client_id=20e1ukc740tq9ced1ikk676119&logout_uri=http://localhost:8080/
