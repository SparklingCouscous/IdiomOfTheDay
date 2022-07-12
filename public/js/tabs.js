
const submitCreate = document.getElementById('submitCreate');
const submitUpdate = document.getElementById('submitUpdate');
const submitDelete = document.getElementById('submitDelete');

const createTab = document.getElementById("createTab");
const deleteTab = document.getElementById("deleteTab");
const viewTab = document.getElementById("viewTab");
const updateTab = document.getElementById("updateTab");

const createButton = document.getElementById("createButton");
const deleteButton = document.getElementById("deleteButton");
const viewButton = document.getElementById("viewButton");
const updateButton = document.getElementById("updateButton");

function openCreate()
{
    createTab.classList.add("create");
    createTab.classList.remove("create-invisible");
    deleteTab.classList.add("delete-invisible");
    deleteTab.classList.remove("delete");
    viewTab.classList.add("view-invisible");
    viewTab.classList.remove("view");
    updateTab.classList.add("update-invisible");
    updateTab.classList.remove("update");
}

createButton.addEventListener('click', openCreate);

function openDelete()
{
    createTab.classList.remove("create");
    createTab.classList.add("create-invisible");
    deleteTab.classList.remove("delete-invisible");
    deleteTab.classList.add("delete");
    viewTab.classList.add("view-invisible");
    viewTab.classList.remove("view");
    updateTab.classList.add("update-invisible");
    updateTab.classList.remove("update");
}

deleteButton.addEventListener('click', openDelete);

function openView()
{
    createTab.classList.remove("create");
    createTab.classList.add("create-invisible");
    deleteTab.classList.add("delete-invisible");
    deleteTab.classList.remove("delete");
    viewTab.classList.remove("view-invisible");
    viewTab.classList.add("view");
    updateTab.classList.add("update-invisible");
    updateTab.classList.remove("update");
}

viewButton.addEventListener('click', openView);

function openUpdate()
{
    createTab.classList.remove("create");
    createTab.classList.add("create-invisible");
    deleteTab.classList.add("delete-invisible");
    deleteTab.classList.remove("delete");
    viewTab.classList.add("view-invisible");
    viewTab.classList.remove("view");
    updateTab.classList.remove("update-invisible");
    updateTab.classList.add("update");
}

updateButton.addEventListener('click', openUpdate);

const onSubmitCreate = () => {
    const idiom = document.getElementById("idiom");
    const meaning = document.getElementById("meaning");
    const origin = document.getElementById("origin");

    let addedIdiom = idiom.value;
    let addedMeaning = meaning.value;
    let addedOrigin = origin.value;

    const newIdiom = {};

    newIdiom.idiom = addedIdiom;
    newIdiom.meaning = addedMeaning;
    newIdiom.origin = addedOrigin;

    fetch('http://localhost:8080/api/idiom', {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newIdiom),
    })
    .then(response => {
        if (response.status === 401) {
            alert('Unauthorized. Please log in again.');
            localStorage.clear('access_token');
            return;
        }

        if (response.status !== 200) {
            throw new Error();
        }

        idiom.value = "";
        meaning.value = "";
        origin.value = "";
        alert('Idiom successfully added to the database.');
    })
    .catch(err => {
        console.error(err);
        alert('Failed to add idiom to the database.');
    });
}

const onSubmitUpdate = () => {
    const idField = document.getElementById('updateId');
    const idiomField = document.getElementById('updateIdiom');
    const meaningField = document.getElementById('updateMeaning');
    const originField = document.getElementById('updateOrigin');

    const id = idField.value;
    const idiom = idiomField.value;
    const meaning = meaningField.value;
    const origin = originField.value;

    const updatedIdiom = {
        id,
        idiom,
        meaning,
        origin,
    }

    fetch('http://localhost:8080/api/idiom/update', {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedIdiom),
    })
    .then(response => {
        if (response.status === 401) {
            alert('Unauthorized. Please log in again.');
            localStorage.clear('access_token');
            return;
        }

        if (response.status !== 200) {
            throw new Error();
        }

        idField.value = "";
        idiomField.value = "";
        meaningField.value = "";
        originField.value = "";
        alert('Idiom successfully updated.');
    })
    .catch(err => {
        console.error(err);
        alert('Failed to update idiom.');
    });
}

const onSubmitDelete = () => {
    const idField = document.getElementById('deleteId');
    const id = idField.value;

    fetch('http://localhost:8080/api/idiom/delete', {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
      }),
    })
    .then(response => {
        if (response.status === 401) {
            alert('Unauthorized. Please log in again.');
            localStorage.clear('access_token');
            return;
        }

        if (response.status !== 200) {
            throw new Error();
        }

        idField.value = "";
        alert('Idiom successfully deleted.');
    })
    .catch(err => {
        console.error(err);
        alert('Failed to delete idiom from the database.');
    });
}

submitCreate.addEventListener('click', onSubmitCreate);
submitUpdate.addEventListener('click', onSubmitUpdate);
submitDelete.addEventListener('click', onSubmitDelete);
