const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    // User Signup
    // signup: (req, res) => {
    //    const user =  User.find({ email: req.body.email })

    //             if(!user) {
    //                  res.send({
    //                     FAILED : "Email is required"
    //                 })
    //             } 
    //             if (user.length >= 1) {
    //                 return res.send({
    //                     FAILED: "Email is already exits...Please try again with another email" 
    //                     })
    //             }
    //             else {
    //                 bcrypt.hash(req.body.password, 8, async (err, hash) => {
    //                     if (err) {
    //                         return res.serverError(err)
    //                     } else {
    //                         const user = {
    //                             name: req.body.name,
    //                             email: req.body.email,
    //                             password: hash
    //                         }
    //                         const newUser = await User.create(user).fetch()
    //                         await sails.helpers.defaultaccount(newUser.name, newUser.id)
    //                         await sails.helpers.nodemailer(newUser.email)
    //                         // console.log(newUser);
    //                         res.send(newUser);
    //                     }
    //                 })
    //             }

    // },
    signup: async (req, res) => {
        const { email, password } = req.body
        if (!email) {
            return res.send({ FAILED: "Email is required" })
        }
        if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(req.body.email))) {
            return res.send({ FAILED: 'Email is not valid.' });
        }
        if (!password || password.length < 8) {
            return res.send({ FAILED: "Password is required and min length should be EIGHT character" })
        }
        await User.find({ email: req.body.email })
            .exec((err, result) => {
                if (result.length >= 1) {
                    return res.send({ FAILED: "Email is already exits...Please try again with another email" })
                }
                else {
                    bcrypt.hash(req.body.password, 8, async (err, hash) => {
                        if (err) {
                            return res.serverError(err)
                        } else {
                            const user = {
                                name: req.body.name,
                                email: req.body.email,
                                password: hash
                            }
                            const newUser = await User.create(user).fetch()
                            await sails.helpers.defaultaccount(newUser.name, newUser.id)
                            await sails.helpers.nodemailer(newUser.email)
                            // console.log(newUser);
                            res.send(newUser);
                        }
                    })
                }
            })
    },

    // User Login
    login: (req, res) => {
        const login = User.find({ email: req.body.email })
            .exec((err, result) => {
                console.log(result);
                if (result.length < 1) {
                    return res.send({ Error: "Email or Password is invalid" })
                }
                if (result) {
                    bcrypt.compare(req.body.password, result[0].password, (err, results) => {
                        if (err) {
                            return res.send({ FAILED: "Auth Failed" })
                        }
                        if (results) {
                            const token = jwt.sign({
                                email: result[0].email,
                                userId: result[0].id
                            },
                                process.env.JWT_KEY
                                , {
                                    expiresIn: "4h"
                                });
                            User.update({ email: req.body.email }, { token: token }).exec(() => { })
                            return res.send({ SUCCESS: "Auth Successful", token: token })
                        }
                        res.send({ FAILED: "User Not Found " })
                    })
                }
            }
            );
    },

    // User Logout
    logout: (req, res) => {
        let user = req.userData.userId;
        User.update(user, { token: "" }).exec(() => { })
        res.send({ SUCCESS: "User Logout" })
    },
}
