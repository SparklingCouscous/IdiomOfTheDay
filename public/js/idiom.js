var Idioms = [
    {idiom: "Man of Few Words", description: "A person who does not speak a great deal; someone who talks with as few words as possible.", rating: 1},
    {idiom: "Dropping Like Flies", description: "To fall down ill or to die in large numbers.", rating: 1},
    {idiom: "Short End of the Stick", description: "Getting the bad end of a deal, or receiving the least desirable outcome from something.", rating: 1},
];


let idiomCounter = 0;
function initialIdiom()
{
    document.getElementById('Idiom').innerHTML = Idioms[idiomCounter].idiom;
    document.getElementById('Description').innerHTML = Idioms[idiomCounter].description;
}

initialIdiom();

function nextIdiom() 
{
    if(idiomCounter < Idioms.length-1)
    {
        idiomCounter++;
        document.getElementById('Idiom').innerHTML = Idioms[idiomCounter].idiom;
        document.getElementById('Description').innerHTML = Idioms[idiomCounter].description;

    }

    console.log('next');
}

function previousIdiom() 
{
    if(idiomCounter > 0)
    {
        idiomCounter--;
        document.getElementById('Idiom').innerHTML = Idioms[idiomCounter].idiom;
        document.getElementById('Description').innerHTML = Idioms[idiomCounter].description;

    }

    console.log('previous');
}

const nextButton = document.getElementById('Next');
const previousButton = document.getElementById('Previous');
const loginButton = document.getElementById('Login');

nextButton.addEventListener('click', nextIdiom);
previousButton.addEventListener('click', previousIdiom);