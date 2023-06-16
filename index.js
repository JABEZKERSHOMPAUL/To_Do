const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const routes=require('./routes/list_routes');
const router_user = require('./routes/user_routes');

const PORT=process.env.PORT || 8081;

const app=express()
app.use(express.json())

app.use(cors())    

app.use('/',routes)
app.use('/',router_user)

const URI="mongodb+srv://Jabez:jabezkershom@cluster0.djujjbx.mongodb.net/"
mongoose.connect(URI).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running ${PORT}`)
    })
}).catch((error)=>{console.log(error)})