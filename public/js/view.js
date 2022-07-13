
let idiomData = [];

const table = document.getElementById("idiomTable");

function getIdioms()
{
    fetch("/api/idiom/all")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for(let i = 0; i < data.length; i++) {
            idiomData.push(data[i]);
            
            var row = `<tr>
                            <td>${idiomData[i].id}</td> 
                            <td>${idiomData[i].Idiom}</td>
                            <td>${idiomData[i].Meaning}</td>
                            <td>${idiomData[i].Origin}</td>   
                        </tr>`

            table.innerHTML += row;
        }
    })
}

getIdioms();
