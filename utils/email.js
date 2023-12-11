const nodemailer = require('nodemailer')

const sendEmail = async(email,subject,text) => {
    try{
        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            service:process.env.SERVICE,
            port:587,
            secure:true,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })
        await transporter.sendMail({
            from:process.env.USER,
            to:email,
            subject,
            text
        })
        console.log("Email sent sucessfully");
    }catch(err){
        console.log('Email not sent');
        console.log(err);
    }
} 

module.exports = sendEmail