
module.exports = {
  attributes: {
    accName: {
      type: "String",
      required: true,
      unique: true
    },
    userId: {
      model: "User",
    },
    user: {
      collection: "user"
    },
    balance: {
      type: "float",
      defaultsTo: 0
    },
    updatedBy: {
      model: "User"
    },
    isDeleted: {
      type: "Boolean",
      defaultsTo: false
    },
    deletedBy: {
      model: "User",
    },
    deletedAt: {
      type: "ref",
      columnType: "datetime",
      defaultsTo: null
    },
  },

};

