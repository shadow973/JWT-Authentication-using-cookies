const {login, signup, getUser } = require('../controllers/userController.js')
const {auth} = require('../middleware/VerifyToken.js')
const express = require('express')
const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/user', auth, getUser)

module.exports = router
