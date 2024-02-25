//back/src/class/confirm.js
class Confirm {
  static #list = [];
  
  constructor(data) {
    this.code = Confirm.generateCode();
    this.data = data;
  }
  
  static generateCode() {
    return (Math.floor(Math.random() * 9000) + 1000).toString();
  }
  
  static create(data) {
    const newConfirmation = new Confirm(data);
    this.#list.push(newConfirmation);
  
    setTimeout(() => {
      this.delete(newConfirmation.code);
    }, 24 * 60 * 60 * 1000); // 24 години у мілісекундах
  
    console.log(this.#list);
  }
  
  static delete(code) {
    const initialLength = this.#list.length;
    this.#list = this.#list.filter((item) => item.code !== code);
    return initialLength > this.#list.length;
  }
  
  static getData(code) {
    const obj = this.#list.find((item) => item.code === String(code));
    return obj ? obj.data : null;
  }
}
  

module.exports = {
  Confirm,
};
