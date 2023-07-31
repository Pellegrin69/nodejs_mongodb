const express = require('express')

const router = express.Router()

const usersController = require('../controllers/users')


router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUsers);


module.exports = router;