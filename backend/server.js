const express =  require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/users',require('./routes/UserRoute'))

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})
