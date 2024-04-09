//back/src/class/user.js
const bcrypt = require('bcrypt');
class User {
  static USER_ROLE = {
    USER: 1,
    ADMIN: 2,
    DEVELOPER: 3,
  }
  static #list = []
  static #count = 1
  constructor({ email, password, role }) {
    this.userId = User.#count++
    this.email = String(email).toLowerCase()
    console.log(`Input password for user ${this.email}: ${String(password)}`);
    this.password = bcrypt.hashSync((password), 10); // Hash the password
    console.log(`Hashed password for user ${this.email}: ${this.password}`);

    this.role = User.#convertRole(role)
    this.isConfirm = false
    this.currentBalance = Math.floor(Math.random() * (100000 - 100 + 1)) + 100;
  }
  static #convertRole = (role) => {
    role = Number(role)
    if (isNaN(role)) {
      role = this.USER_ROLE.USER
    }
    role = Object.values(this.USER_ROLE).includes(role)
      ? role
      : this.USER_ROLE.USER

    return role
  }
  static create(data) {
    const user = new User(data)
    console.log('New hash password:', user.password); // Додано лог
    this.#list.push(user)
    return user
  }

  static changeEmail(user, newEmail) {
    user.email = newEmail;
  }

  // Метод для отримання користувача за email

  static getByEmail(email) {
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLowerCase(),
      ) || null
    )
  }
  static getById(userId) {
    return (
      this.#list.find((user) => user.userId === Number(userId)) ||
      null
    )
  }
  static getList = () => this.#list

  // Debit the user's account
  debit(amount) {
    if (this.currentBalance < amount) {
      throw new Error('Недостатньо коштів');
    }
    this.currentBalance -= amount;
  }

  static confirmUser(email) {
    const user = this.getByEmail(email);
    if (user) {
      user.isConfirm = true;
      return true;
    }
    return false;
  }
  static async changePassword(user, oldPassword, newPassword) {
    console.log('oldPassword', oldPassword); // Додано лог
    console.log('user.password (before compare)', user.password); // Додано лог

    // Check if the old password matches the current password
    const isMatch = await bcrypt.compare((oldPassword), user.password);
    console.log('isMatch', isMatch); // Додано лог

    if (!isMatch) {
      throw new Error('Incorrect old password');
    }
  
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('hashedPassword', hashedPassword); // Додано лог
  
    // Change the password
    user.password = hashedPassword;
    console.log('user.password (after change)', user.password); // Додано лог
}

  // Credit the user's account
  credit(amount) {
    this.currentBalance += amount;
  }
}
module.exports = {
  User,
}
