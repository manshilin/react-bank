//back/src/class/user.js
class User {
  static USER_ROLE = {
    USER: 1,
    ADMIN: 2,
    DEVELOPER: 3,
  }
  static #list = []
  static #count = 1
  constructor({ email, password, role }) { // Додали параметр балансу
    this.userId = User.#count++
    this.email = String(email).toLowerCase()
    this.password = String(password)
    this.role = User.#convertRole(role)
    this.isConfirm = false
    this.currentBalance = Math.floor(Math.random() * (100000 - 100 + 1)) + 100;; // Встановлюємо баланс користувача
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

  // Credit the user's account
  credit(amount) {
    this.currentBalance += amount;
  }
}
module.exports = {
  User,
}
