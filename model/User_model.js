const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}

})

const User=mongoose.model("Todo_user",userSchema)

module.exports=User