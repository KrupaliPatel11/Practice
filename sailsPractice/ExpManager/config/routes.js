/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const accountController = require("../api/controllers/accountController");

module.exports.routes = {

     
    "POST /user/signup": "UserController.signup",
    "POST /user/login" : "UserController.login",
    "POST /user/logout" : "UserController.logout",

    "POST /user/add" : "AccountController.createMember",
    "GET /user" : "AccountController.list",
    "PATCH /user" : "AccountController.update", 
    "POST /user/account" : "AccountController.createAccount",
    "DELETE /user" : "AccountController.delete",

    "POST /user/trans/list" : "TransactionController.list",
    "POST /user/trans/add" : "TransactionController.add",
    "PATCH /user/trans/update" : "TransactionController.update",
    "POST /user/trans/del" : "TransactionController.delete"
};
