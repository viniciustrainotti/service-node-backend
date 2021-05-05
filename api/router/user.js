const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup'   , userController.userSignup);
router.post('/login'    , userController.userLogin);
router.delete('/:userId', userController.userDelete);

module.exports = router;