



var Idioms = [
    {idiom: "Man of Few Words", description: "A person who does not speak a great deal; someone who talks with as few words as possible.", rating: 1},
    {idiom: "Dropping Like Flies", description: "To fall down ill or to die in large numbers.", rating: 1},
    {idiom: "Short End of the Stick", description: "Getting the bad end of a deal, or receiving the least desirable outcome from something.", rating: 1},
];


let idiomCounter = 0;

let reply = [];
function initialIdiom()
{
    // fetch('http://localhost:8080/api/idiom') 
    // .then(response => { 
    //     const data = response.json();
    //     console.log(data);
    //     console.log(data.then)
    //     // console.log(data[["PromiseResult"]]);
    // });
    
   
    fetch('http://localhost:8080/api/idiom')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        console.log(data["Idiom"]);

        document.getElementById('Idiom').innerHTML = data["Idiom"];
        document.getElementById('Description').innerHTML = data['Meaning'];
        document.getElementById('Origin').innerHTML = data['Origin'];
        
    });
   
  
   

    
    // document.getElementById('Idiom').innerHTML = reply;
    
}

initialIdiom();

function nextIdiom() 
{
    if(idiomCounter < Idioms.length-1)
    {
        idiomCounter++;


    fetch('http://localhost:8080/api/idiom')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
        console.log(data["Idiom"]);

        document.getElementById('Idiom').innerHTML = data["Idiom"];
        document.getElementById('Description').innerHTML = data['Meaning'];
        document.getElementById('Origin').innerHTML = data['Origin'];
        
    });
        

    }

    console.log('next');
}

function previousIdiom() 
{
    if(idiomCounter > 0)
    {
        idiomCounter--;
        

        fetch('http://localhost:8080/api/idiom')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            console.log(data["Idiom"]);
    
            document.getElementById('Idiom').innerHTML = data["Idiom"];
            document.getElementById('Description').innerHTML = data['Meaning'];
            document.getElementById('Origin').innerHTML = data['Origin'];
            
        });

    }

    console.log('previous');
}

const nextButton = document.getElementById('Next');
const previousButton = document.getElementById('Previous');
const loginButton = document.getElementById('Login');

nextButton.addEventListener('click', nextIdiom);
previousButton.addEventListener('click', previousIdiom);