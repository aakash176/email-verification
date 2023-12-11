const mongoose = require('mongoose')
const joi = require('joi')

const userSchema = new mongoose.Schema({
    name:{type:String, required:true, min:3,max:255},
    email:{type:String, required:true},
    verified:{type:Boolean, default:false}
})

const User = mongoose.model('User', userSchema)

const validate = (user) => {
    const schema = joi.object({
        name:joi.string().min(3).max(255).required(),
        email: joi.string().email().required()
    })
    return schema.validate(user)
}

module.exports = {User, validate}