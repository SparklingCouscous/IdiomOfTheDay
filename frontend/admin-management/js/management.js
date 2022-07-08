var newIdiom = {idiom: '', meanig: '', origin: '', rating: ''};

const form = document.getElementById('idiomForm');

const submitButtom = document.getElementById('Submit');
const idiom = document.getElementById('idiom');
const meaning = document.getElementById('meaning');
const origin = document.getElementById('origin');

submitButtom.addEventListener('click', addIdiom);

const test = document.getElementById('test');

function addIdiom()
{
    let addedIdiom = idiom.value;
    let addedMeaning = meaning.value;
    let addedOrigin = origin.value;

    newIdiom.idiom = addedIdiom;
    newIdiom.meanig = addedMeaning;
    newIdiom.origin = addedOrigin;

    console.log(newIdiom);

    // event.preventDefault();
}