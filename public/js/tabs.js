
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


