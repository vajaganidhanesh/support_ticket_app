const express =  require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Routes
app.use('/users',require('./routes/UserRoute'))
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})
