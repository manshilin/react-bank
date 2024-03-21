//back/src/class/session.js
const { User } = require('./user');
class Session {
  static #list = [];
  constructor(user) {
    this.token = Session.generateCode();
    this.user = {
      email: user.email,
      isConfirm: user.isConfirm,
      role: user.role,
      userId: user.userId,
      currentBalance: user.currentBalance, 
    };
  }
  static generateCode = () => {
    const length = 6;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(
        Math.random() * characters.length
      );
      result += characters[randomIndex];
    }  
    return result;
  };
  static create = (user) => {
    const session = new Session(user);
    this.#list.push(session);
    return session;
  };
  
  static getUserFromToken = (token) => { 
    const session = this.#list.find((item) => item.token === token);
    console.log('getUserFromToken session', session);

    return session ? User.getById(session.user.userId) : null; // Get the user by userId
  };

  static findSessionByEmail(email) {
    // Finding the session for the given email
    const session = this.#list.find(session => session.user.email === email);
    return session;
  }
  
  static delete = (token) => {
    this.#list = this.#list.filter((item) => item.token !== token);
  };
  static update(email, updates) {
    // Знаходження сесії за електронною поштою користувача
    const session = this.#list.find((session) => session.user.email === email);
    if (!session) return false;

    // Оновлення відповідних полів у сесії
    Object.keys(updates).forEach((key) => {
      if (session.user.hasOwnProperty(key)) {
        session.user[key] = updates[key];
      }
    });

    return true;
  }
}

module.exports = {
Session,
};

  