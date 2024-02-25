// back/src/route/index.js
const express = require('express')
const router = express.Router()

const path = require('path');


const auth = require('./auth')
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
router.use('/', auth)
// Використовуйте інші файли роутів, якщо є


// router.get('/', (req, res) => {
//   res.render('/')
// }
// )


// Експортуємо глобальний роутер
module.exports = router
