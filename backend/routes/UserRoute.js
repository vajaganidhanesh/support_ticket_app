const express = require('express');
const router = express.Router()

router.get('/fetch',(req,res)=>{
    res.json({message:"Welcome to Express json data"})
})
 
router.post('/post_data',(req,res)=>{
    res.status(200).json({message:'data uploaded successfully'})
})

module.exports = router