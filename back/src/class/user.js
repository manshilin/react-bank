//напиши код для класу User, для банківського додатку 
//в якому є такі властивості і методи.
class User {
    list = [];
    constructor(name, surname, email, password, balance, active) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.balance = balance;
        this.active = active;
    }
    getFullName() {
        return `${this.name} ${this.surname}`;
    }
    getBalance() {
        return this.balance;
    }
    isActive() {
        return this.active;
    }
    setBalance(value) {
        this.balance = value;
    }
    setActive(value) {
        this.active = value;
    }
    // створи метод який створює користувача і додає його в масив list
    createUser() {
        this.list.push({
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
            balance: this.balance,
            active: this.active
        });
    }
    // створи метод який поповнює баланс користувача
    addBalance(value) {
        this.balance += value;
    }       
    // створи метод який переводе грощі іншому корситовачу
    transferMoney(user, value) {
        if (this.balance >= value) {
            this.balance -= value;
            user.balance += value;
        }
    }
    // створи метод який дозволяє забрати гроші з балансу
    withdraw(value) {
        if (this.balance >= value) {
            this.balance -= value;
        }
    }
    // створи метод який дозволяє деактивувати користувача
    blockUser() {
        this.active = false;
    }
    // створи метод який дозволяє активувати користувача
    unblockUser() {
        this.active = true;
    }
    // створи метод який дозволяє поповнити баланс  користувача
    addBalance(value) {
        this.balance += value;
    }
    // створи метод який перевіряє чи є такий користувач в масиві list
    checkUser() {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].email === this.email) {
                return true;
            }
        }
        return false;
    }
    // створи метод який дозволяє змінити пароль користувачу
    changePassword(value) {
        this.password = value;
    }   
    // створи метод який дозволяє видалити користувача з масиву list
    deleteUser() {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].email === this.email) {
                this.list.splice(i, 1);
            }
        }
    }
    // створи метод який дозволяє вивести всіх користувачів в форматі
    // Name: ${name} Surname: ${surname} Email: ${email} Password: ${password} Balance: ${balance} Active: ${active}
    showUsers() {
        for (let i = 0; i < this.list.length; i++) {
            console.log(`Name: ${this.list[i].name} Surname: ${this.list[i].surname} Email: ${this.list[i].email} Password: ${this.list[i].password} Balance: ${this.list[i].balance} Active: ${this.list[i].active}`);
        }
    }
    //створи метод переводу грошей з балансу користувача на баланс іншого користувача
    transferMoney(user, value) {
        if (this.balance >= value) {
            this.balance -= value;
            user.balance += value;
        }
    }
}
module.exports = User;
