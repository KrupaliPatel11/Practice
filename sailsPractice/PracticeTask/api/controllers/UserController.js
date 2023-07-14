/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const alert = require('alert')
const bcrypt = require('bcrypt')
module.exports = {

    // signup: (req, res) => {
    //     res.view()
    // },
    create: async (req, res) => {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            alert("Please fill in required field")
            return res.redirect('/signup')
        }
        const alreadyUser = await User.findOne({ email: email })
        if (alreadyUser) {
            alert("Email is already exists...Please try with another email")
            return res.redirect('/signup')
        } else {
            bcrypt.hash(req.body.password, 8, async (err, hash) => {
                if (err) {
                    return res.serverError(err)
                } else {
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }
                  await  User.create(user).fetch()
                    alert("You signup to sails app sucessfully...! Now you can login")
                    return res.redirect('/login')

                }
            })
        }
    },

    login: (req, res) => {
        const login = User.find({ email: req.body.email })
            .exec((err, result) => {
                console.log(result);
                if (result.length < 1) {
                    alert("Email or Password is invalid")
                    return res.redirect('/login')
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
                               " process.env.JWT_KEY"
                                , {
                                    expiresIn: "4h"
                                });
                            User.update({ email: req.body.email }, { token: token }).exec(() => { })
                            alert("You have successfully logged in to sailsApp")
                            return res.redirect('/login')
                        }
                        alert("User not found")
                        res.redirect('/login')
                    })
                }
            }
            );

    },

};

