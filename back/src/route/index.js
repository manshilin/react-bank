// back/src/route/index.js
const express = require('express')
const router = express.Router()

const path = require('path');


const auth = require('./auth')
const user = require('./user')
const transaction = require('./transaction')    
// Підключіть інші файли роутів, якщо є

// Об'єднайте файли роутів за потреби
router.use('/', auth)
router.use('/', user)
router.use('/', transaction)


// Експортуємо глобальний роутер
module.exports = router
