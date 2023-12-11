const mongoose = require('mongoose')

const connection = async() => {
    try{
        await mongoose.connect(process.env.DB)
        console.log('Connected to Database');
    } catch(err){
        console.log(err)
    }
}
module.exports = connection