const express = require('express');
const router = express.Router();

const userRoutes = require('./user');

// router.get('/', function(req, res) {
//     res.status(200).json({'hello': 'world'});
// });

router.use('/user', userRoutes);
 
module.exports = router;