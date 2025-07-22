const express = require('express')
require('dotenv').config()
const connectedToDB = require('./database')
const contactRouter = require('./routes/contactus.router')
const app = express();
const cors = require('cors')
const port = process.env.PORT;
const path = require('path')
connectedToDB()

app.use(cors())
app.use(express.json())                  //body mein data pass krne ke liye use krte h its is a middlerware issko phle use krege other then code
app.use(express.static(path.join(__dirname, "public")))
app.get('/', (req, res)=>{
    res.send("Home page page is home")
})

app.use('/api/auth', require('./routes/signup.router'))

app.use('/api/note', require('./routes/notes.router'))

app.use('/api/auth', contactRouter)

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
})