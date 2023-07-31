import express from 'express';

const router = express.Router()

const usersController = require('../controllers/user.js')


router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);


module.exports = router;