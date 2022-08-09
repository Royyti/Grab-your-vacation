
/**
 * Class represents user
 */
class UserModel {
    id;
    firstName;
    lastName;
    username;
    password;
    isAdmin;

    /**
     * 
     * @param {number} id 
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} username 
     * @param {string} password 
     * @param {string} isAdmin 
     */
    constructor(id, firstName, lastName, username, password, isAdmin) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin
    }
}

export { UserModel }