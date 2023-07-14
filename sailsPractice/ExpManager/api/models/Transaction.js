module.exports = {
  attributes: {
    userId : {
      model : "User"
    },
    transactionDate : {
      type : "ref",
      columnType : "datetime",
      defaultsTo : new Date()
    },
    status : {
      type: "string",
      enum : ['income', 'expense'],
      required : true
    },
    amount : {
      type: "number",
      required : true
    },
    description : {
      type: "string",
      required : true
    },
    updatedBy : {
      model : "User",
      model : "AccountMember"
    },
    isDeleted : {
      type : "boolean",
      defaultsTo : false
    },
    deletedBy : {
      model : "User",
      model : "AccountMember"
    },
    deletedAt : {
      type : "ref",
      columnType : "datetime",
      defaultsTo : null
    }
  },

};