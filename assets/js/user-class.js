class User {
    #id
    constructor(id,email,firstName,lastName,avatar){
        this.#id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
    }

    get id(){
        return this.#id;
    }

}

export {User};