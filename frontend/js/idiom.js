var Idioms = [
    {idiom: "Spill The Beans",description:"to reveal a secret" ,origin: "This is likely drawn from the ancient Greek process of voting, where votes were cast by placing one of two different colored beans in a vase (usually a white bean meant yes, and a black/brown one meant no). If someone literally spilled the beans, the election results would be revealed.", rating: 1},
    {idiom: "Man of Few Words", description: "A person who does not speak a great deal; someone who talks with as few words as possible.",origin:"", rating: 1},
    {idiom: "Dropping Like Flies", description: "To fall down ill or to die in large numbers.", rating: 1,origin:""},
    {idiom: "Short End of the Stick", description: "Getting the bad end of a deal, or receiving the least desirable outcome from something.", rating: 1,origin:""},
];




let idiomCounter = 0;
function initialIdiom()
{
    document.getElementById('Idiom').innerHTML = Idioms[idiomCounter].idiom;
    document.getElementById('Description').innerHTML = Idioms[idiomCounter].description;
    document.getElementById('Origin').innerHTML= Idioms[idiomCounter].origin;
}

initialIdiom();

function nextIdiom() 
{
    if(idiomCounter < Idioms.length-1)
    {
        idiomCounter++;
        document.getElementById('Idiom').innerHTML = Idioms[idiomCounter].idiom;
        document.getElementById('Description').innerHTML = Idioms[idiomCounter].description;
        document.getElementById('Origin').innerHTML= Idioms[idiomCounter].origin;

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
        document.getElementById('Origin').innerHTML= Idioms[idiomCounter].origin;

    }

    console.log('previous');
}

const nextButton = document.getElementById('Next');
const previousButton = document.getElementById('Previous');
const loginButton = document.getElementById('Login');

nextButton.addEventListener('click', nextIdiom);
previousButton.addEventListener('click', previousIdiom);