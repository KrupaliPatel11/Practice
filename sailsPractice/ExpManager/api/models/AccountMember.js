module.exports = {
  attributes: {
    accId : {
      model : "account"
    },
    memberId : {
      model : "user"
    },
    isDeleted : {
      type : "Boolean",
      defaultsTo : false
    }
  },
};

