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
    this.password = bcrypt.hashSync(String(password), 10) // Hash the password
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

  static async changePassword(userId, oldPassword, newPassword) {
    const user = this.getById(userId);
    if (!user) {
      throw new Error('User not found');
    }
  
    // Check if the old password matches the current password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error('Incorrect old password');
    }
  
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    // Change the password
    user.password = hashedPassword;
  }
  

  // Credit the user's account
  credit(amount) {
    this.currentBalance += amount;
  }
}
module.exports = {
  User,
}
