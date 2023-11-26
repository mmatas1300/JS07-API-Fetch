import {User} from "./user-class.js";

const urlUsersDelay = "https://reqres.in/api/users?delay=3";
const buttonRef = document.getElementById("get-users");
const infoParagraphRef = document.getElementById("info-paragraph");
const tableBodyRef = document.getElementById("users-table-body");
const usersTableContainerRef = document.getElementById("users-table-container");
const infoComingFromRef = document.getElementById("info-coming-from");

const displayElement = (reference,value) => {
    reference.style.display = value ? "block" : "none";
};

const printDOM = (message,reference) =>{
    reference.innerHTML = message;
}

displayElement(usersTableContainerRef,false);

buttonRef.addEventListener("click", ()=>{
    displayElement(usersTableContainerRef,false);
    const localStorageUsersData = localStorage.getItem("Users");
    if(localStorageUsersData !== null){
        const lastGetTime = JSON.parse(localStorageUsersData).shift();
        const elapsedTime = new Date().getTime() - lastGetTime;
        if(elapsedTime>60000){
            getUsers(urlUsersDelay);
        } else{
            showUsersTableFromLocalStorage();
            printDOM(`Infromación actualizada desde LocalStorage`,infoComingFromRef);
        }

    } else{
        getUsers(urlUsersDelay);
    }

})

const getUsers = (url) =>{
    buttonRef.disabled = true;
    printDOM("Obteniendo usuarios desde REQRES, por favor espere...",infoParagraphRef);
    printDOM(``,infoComingFromRef);
    fetch(url)
    .then(response => response.json())
    .then(users => {
        saveUsersInLocalStorage(users.data);
        buttonRef.disabled = false;
        showUsersTableFromLocalStorage();
        printDOM(`Infromación actualizada desde REQRES`,infoComingFromRef);
    })
    .catch(error => printDOM(error,infoParagraphRef));
};

const saveUsersInLocalStorage = (usersData) => {
    const users = usersData.map( (user) => new User(user["id"],user["email"],user["first_name"],user["last_name"],user["avatar"]));
    users.unshift(new Date().getTime());//Almacena la fecha de copia
    localStorage.setItem("Users",JSON.stringify(users));
}

const showUsersTableFromLocalStorage= () => {
    const users = JSON.parse(localStorage.getItem("Users"));
    const lastGetTime = (new Date().getTime() - users.shift())/1000;
    const tableRows = users.map((user)=>{
        const row = `<tr>
        <th scope="row">${user.id}</th>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
        <td><img src="${user.avatar}" alt="Fotografía del usuario llamado ${user.firstName} ${user.lastName}."></td>
        </tr>`;
        return row;
    });
     printDOM(tableRows.join(""),tableBodyRef);
     printDOM(`La última consulta a REQRES se realizó hace ${parseInt(lastGetTime)} segundos`,infoParagraphRef);
     displayElement(usersTableContainerRef,true);
};