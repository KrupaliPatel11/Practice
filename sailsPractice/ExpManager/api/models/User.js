
module.exports = {
  attributes: {
    name : {
        type: "String",
        required : true
    },
    email : {
      type: "String",
      required: true,
      unique : true,
      
    }, 
    password : {
      type: "String",
      required: true
    },
    token : {
      type: "String"
    },
    account : {
      collection : 'account'
    },
    isDeleted : {
      type : "Boolean",
      defaultsTo : false
    },
    deletedBy : {
      model : "User",
    },
    deletedAt : {
      type : "ref",
      columnType : "datetime",
      defaultsTo : null
    }
  },

   
}







// module.exports = {
//   attributes: {
//     name : {
//         type: "String",
//         required : true
//     },
//     email : {
//       type: "String",
//       isEmail: true,
//       required: true,
//       unique : true
//     }, 
//     password : {
//       type: "String",
//       required: true
//     },
//     token : {
//       type: "String"
//     },
//     account : {
//       collection : 'account'
//     },
//     isDeleted : {
//       type : "Boolean",
//       defaultsTo : false
//     },
//     deletedBy : {
//       model : "User",
//     },
//     deletedAt : {
//       type : "ref",
//       columnType : "datetime",
//       defaultsTo : null
//     }
//   },
// };





