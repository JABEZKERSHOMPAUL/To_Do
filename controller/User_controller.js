const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../model/User_model')



const signUp = (req, res) => {
    bcrypt.hash(req.body.password,10, async (err, hashedpass) => {
        if (err) {
            res.json({ message: err })
        }

        let checkemail =await User.findOne({ email: req.body.email })
       
        if (checkemail) {
            res.json({ message: 'Email already exist' })
        }
        else {
            signUpData = new User({
                email: req.body.email,
                username: req.body.username,
                password: hashedpass
            })
            await signUpData.save().then((login)=>{
                res.json({
                    status:1,
                    message:'SignUp successfull'
                })
            }).catch((error)=>{
                res.json({message:`an error${error}`})
            })
        }
    })
}

const signIn=async(req,res)=>{
await User.findOne({email:req.body.email}).then((login)=>{
    if(login){
    
        bcrypt.compare(req.body.password,login.password,(err,result)=>{
            if(err){
                res.json({message:err})
            }
            if(result){
                let token=jwt.sign({name: login.username,id:login._id},'key8088')
               
                res.json({status:1,message:"Login sucessfull",token})
                
            }else{
                res.json({status:1,message:'check email & password'})
            }
        })
    }else{
        res.json({message:'User not found'})
    }
})    
}

module.exports={signUp,signIn}
