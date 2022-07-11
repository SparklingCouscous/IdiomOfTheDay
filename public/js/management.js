

const form = document.getElementById("idiomForm");

const submitButtom = document.getElementById("Submit");
const idiom = document.getElementById("idiom");
const meaning = document.getElementById("meaning");
const origin = document.getElementById("origin");

// ENDPOINTS for login / logout buttons:

// LOGIN: https://idiom-a-day-sign-in.auth.us-east-1.amazoncognito.com/login?response_type=code&client_id=20e1ukc740tq9ced1ikk676119&redirect_uri=http://localhost:8080/admin&state=STATE&scope=openid+aws.cognito.signin.user.admin

// LOGOUT: https://idiom-a-day-sign-in.auth.us-east-1.amazoncognito.com/logout?client_id=20e1ukc740tq9ced1ikk676119&logout_uri=http://localhost:8080/
