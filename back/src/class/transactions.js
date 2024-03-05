//back/src/class/transaction.js
class Transaction {
    constructor(icon, name, time, type, amount) {
        this.icon = icon; // іконка платіжної системи
        this.name = name; // назва платіжної системи
        this.time = time; // час транзакції
        this.type = type; // тип транзакції (отримано чи відправлено)
        this.amount = amount; // сума транзакції у доларах
    }
}
class TransactionManager {
    constructor() {
        this.transactions = []; // масив для зберігання транзакцій
    }
    addTransaction(transaction) {
        this.transactions.push(transaction); // додавання нової транзакції до масиву
    }
    getTransactions() {
        return this.transactions; // отримання всіх збережених транзакцій
    }
}
module.exports = { Transaction, TransactionManager };
