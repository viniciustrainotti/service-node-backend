const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

class oUser{
    userSignup(req, res, next){
        res.status(200).json({ 'hello': 'userSignup'});
    }
    userLogin(req, res, next){
        res.status(200).json({ 'hello': 'userLogin'});
    }
    userDelete(req, res, next){
        res.status(200).json({ 'hello': 'userDelete'});
    }

}

module.exports = new oUser;