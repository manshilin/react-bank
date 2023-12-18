// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

const path = require('path');

// ... інші імпорти

// Роут для фронтенду
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../front/build/index.html'));
});



// Підключіть файли роутів
// const test = require('./test')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
// router.use('/', test)
// Використовуйте інші файли роутів, якщо є

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

// Експортуємо глобальний роутер
module.exports = router
