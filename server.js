require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
})
const db = mongoose.connection
db.on("errpr", (error)=>console.log(error))
db.on("open", ()=> console.log("Connected to Database"))

app.use(express.json())

const subscribersRouter = require("./routes/subscribers")
app.use("/subscribers", subscribersRouter)
app.listen(4000, ()=>{
    console.log("server started")
})