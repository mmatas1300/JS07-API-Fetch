import {User} from "./user-class.js";

const urlUsersDelay = "https://reqres.in/api/users?delay=3";

const buttonRef = document.getElementById("get-users");

buttonRef.addEventListener("click", ()=>{
    buttonRef.disabled = true
    getUsers(urlUsersDelay);

})

const getUsers = (url) =>{
    fetch(url)
    .then(response => response.json())
    .then(users => {
        saveUsersInLocalStorage(users.data);
        printDOM();
    })
    .catch(error => console.log(error));
};

const saveUsersInLocalStorage = (usersData) => {
    const users = usersData.map( (user) => new User(user["id"],user["email"],user["first_name"],user["last_name"],user["avatar"]))
    users.unshift(new Date().getTime());//Almacena la fecha de copia
    localStorage.setItem("Users",JSON.stringify(users));
}

const printDOM = (usersData) =>{
    console.log("PrintDom");
}



