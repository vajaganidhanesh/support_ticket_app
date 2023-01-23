const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.get('/users/me',protect,getMe)
 
router.post('/users/register_user',registerUser)

router.post('/users/login_user',loginUser)

module.exports = router