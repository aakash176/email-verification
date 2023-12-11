const express = require('express')
const router = express.Router()
const {Token} = require('../models/token')
const {User, validate} = require('../models/userSchema')
const sendEmail = require('../utils/email')
const crypto = require('crypto')

router.post('/', async(req,res)=>{
    try{
        const {error} = validate(req.body)
        if(error){return res.status(400).send("Validation failed! try again")}
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).send("User with given mail id already exists!")
        }
        user = await new User({name:req.body.name,email:req.body.email}).save()
        let token = await new Token({
            userId:user._id,
            token:crypto.randomBytes(32).toString("hex"),
        }).save()
        const message = `${process.env.BASE_URL}/user/verify/${user._id}/${token.token}`
        await sendEmail(user.email, 'Verify Email', message)
        res.send("An email is sent to your mail Id , please verify!")

    } catch(err){
        res.send("An error occured")
    }

})

router.get('/:id/:token', async(req,res) => {
    try{

        const user = await User.findOne({_id:req.params.id})
        if(!user){return res.status(400).send("Invalid link")}
        const token = await Token.findOne({
            userId:user._id,
            token:req.params.token
        })
        if(!token){return res.status(400).send("Invalid Link")}
        await User.updateOne({_id:user._id, verified:true})
        await Token.findByIdAndDelete(token._id)
        res.send("Email verified sucessfully")
    } catch(err){
        res.send("Email not verified")
    }
})

module.exports = router