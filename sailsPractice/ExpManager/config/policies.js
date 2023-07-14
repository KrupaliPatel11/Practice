/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  UserController: {
    logout: 'check_auth',

  },

  AccountController : {
    create : 'check_auth',
    list : 'check_auth',
    update : 'check_auth',
    "*" : 'check_auth'
  },

  TransactionController : {
    "*"  : "check_auth",
    // update  : "check_auth",
  }
};
