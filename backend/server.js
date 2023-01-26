const express =  require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000

// connect to db
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Routes
app.use('/api/users',require('./routes/UserRoute'))
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
})
