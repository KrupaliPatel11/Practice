const user = require("../models/User")
module.exports = {
  friendlyName: 'Defaultaccount',
  description: 'Defaultaccount something.',
  inputs: {
    accName: {
      type: "string"
    },
    userId: {
      type: "string"
    }
  },
  exits: {

    success: {
      description: 'All done.',
    },

  },
  fn: async function (inputs) {
    // console.log(JSON.stringify(inputs));
    let accName = inputs.accName;
    let userId = inputs.userId
    const defaultAccount = await Account.create({
      accName: accName,
      userId: userId
    }).fetch();
    await User.update({ accName: accName }, { userId: userId }).set({
      defaultAccount: defaultAccount.accName,
      defaultAccount: defaultAccount.userId
    })
  }
}




