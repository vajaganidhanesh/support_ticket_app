const express = require('express');
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/userController')

router.get('/fetch',(req,res)=>{
    res.json({message:"Welcome to Express json data"})
})
 
router.post('/register_user',registerUser)

router.post('/login_user',loginUser)

module.exports = router