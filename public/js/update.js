
let id;
const searchButton = document.getElementById("search");
const searchInput = document.getElementById("searchIdiom");

const formSection = document.getElementById("formSection")

const updateId = document.getElementById("updateId")
const updateIdiom = document.getElementById("updateIdiom");
const updateMeaning = document.getElementById("updateMeaning");
const updateOrigin = document.getElementById("updateOrigin");

searchButton.addEventListener('click', getId);

function getId()
{
    id = searchInput.value;
    if(id !== null)
    {
        formSection.classList.remove("content-invisble");
        formSection.classList.add("content");
    }
    getIdiom();
}

function getIdiom()
{
    fetch(`http://localhost:8080/api/idiom/one/${id}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        updateId.value = data["id"];
        updateIdiom.value = data["Idiom"];
        updateMeaning.value = data["Meaning"];
        updateOrigin.value = data["Origin"];
    });
}