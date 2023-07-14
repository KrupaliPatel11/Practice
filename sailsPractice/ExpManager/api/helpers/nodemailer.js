const nodemailer = require('nodemailer')
module.exports = {
  friendlyName: 'Nodemailer',
  description: 'Nodemailer something.',
  inputs: {
     email : {
      type:"string"
     },
     name : {
      type : "string"
     }
  },
  exits: {
    success: {
      description: 'All done.',
    },

  },
  fn : async function(inputs) {
    let transporter = await nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4f1119289a0534",
        pass: "dc0d4ae5748002"
      }
    });
    let info = await transporter.sendMail({
      from : "ExpenseManager@gmail.com",
      to: inputs.email ,
      subject: "Welcome to expense Manager",
      text: "Hello thanks for signup" 
    })
    console.log("message sent : %s", info.messageId);         
  }
};
