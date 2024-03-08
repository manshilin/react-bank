//back/src/class/transaction.js
class Transaction {
    constructor(time, amount) {
        this.time = time; // час транзакції
        this.amount = amount; // сума транзакції у доларах
    }
}

class SendTransaction extends Transaction {
    constructor(time, amount, recipientEmail) {
        super(time, amount);
        this.recipientEmail = recipientEmail; // електронна адреса отримувача
    }
}

class ReceiveTransaction extends Transaction {
    constructor(time, amount, paymentSystemIcon, paymentSystemName) {
        super(time, amount);
        this.paymentSystemIcon = paymentSystemIcon; // іконка платіжної системи
        this.paymentSystemName = paymentSystemName; // назва платіжної системи
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
    getTransactionsForUser(userId) {
        return this.transactions.filter(transaction => transaction.userId === userId); // отримання транзакцій для конкретного користувача
    }
}

module.exports = { Transaction, SendTransaction, ReceiveTransaction, TransactionManager };
