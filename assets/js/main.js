console.log("JS07");

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
        printDOM(users.data);
    })
    .catch(error => console.log(error));
};




const printDOM = (usersData) =>{
    console.log("PrintDom");
}



