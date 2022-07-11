function randomIdiom()
{
   
    fetch('http://localhost:8080/api/idiom')
    .then((response) => {
        return response.json();
    })
    .then((data) => {

        document.getElementById('Idiom').innerHTML = data["Idiom"];
        document.getElementById('Description').innerHTML = data['Meaning'];
        document.getElementById('Origin').innerHTML = data['Origin'];
        
    });


}


document.getElementById("randomButton").addEventListener("click", randomIdiom);

