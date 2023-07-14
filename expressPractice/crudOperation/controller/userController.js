var db = require('../models');
const Users = db.users;
const {Sequelize, OP, queryType} = require('sequelize');
const { request } = require('express');
 

var addUser = async (req, res) => {
    // 1st method
    // let data  = await Users.build({name: 'kirti', email:'kirti@gmail.com'});
    // await data.save();

    // 2nd method for inserting data 
    // let data = await Users.create({ name: 'yyy', email: 'yyy@gmail.com' });

    // // update
    // data.name = 'xxxxxxxx';
    //  data.save();

    // delete
    // data.destroy();


    let response = {
        data: 'ok'
    }

    res.status(200).json(response);
}

var crudOp = async (req, res) => {

    // // insert 
    // let data = await Users.create({name: 'yyy', email: 'yyy@gmail.com'});

    // update
    // let data = await Users.update({ name: 'krupali', email:'krupali@zignuts.com' },
    //  {  where:{
    //     id:1
    //  }
    // });

    // delete 
    // let data = await Users.destroy ({where: {id:2}})

    // // truncate
    // let data = await Users.destroy({truncate: true})

    // select
    res.status(200).json(reponse);
}
 var queryData = async (req, res)=> {

    // select
    let data = await Users.findAll({
        attributes: [
            ['name', 'nameOf'],
            'email',
            'gender',
            [Sequelize.fn('CONCAT' , Sequelize.col('email'), 'ID'), 'emailCount']
        ]
        });

        // include-Exclude
        // let data = await Users.findAll({
        //     attribute:{exclude:['gender']}
        // })

        // Condition 
        // let data = await Users.findAll({
        //     where: {id: {[OP.eq]:2}}
        //     });

    let response = {
        data: data
    }
    res.status(200).json(response);

 }

 var getSet = async(req,res) => {
    let data = await Users.findAll({});
    let response = {
        data: data
    }
 }

 var validation = async(req,res) => {
    // try {
    //     let data = await Users.create({name: 'kirti', email:'krti@zignuts.com', gender: 'other'});
    // } catch(e) {
    //     const message = {};
    //     e.erros.forEach((error) => {
    //         let message;
    //         switch(error.validatorKey){
    //             case 'not_unique':
    //                 message = 'Unique Error';
    //                 break;
    //         }
    //         message[error.path] = message;
    //         console.log(message);
    //     }
            
    //     );
    // }
    let find = await Users.findAll({});
    // let data = await Users.fetchAll({});
    let response = {
        // data : data,
        data : find
    }
    res.status(200).json(response);
}
    var rawQuery = async (res, req) => {
        let response = {
            data :'ok'
        }
        res.status(200).json(response);
    }

     var getUsers = async(req, res) =>  {
        const data = await Users.findAll({});
        res.status(200).json({data:data});
     }
     var postUsers = async(req, res) =>  {
        var postData = req.body;
         if(postData.length>1) {
            const data = await Users.bulkCreate(postData);
         }else {
            const data = await Users.create(postData);
        }
        res.status(200).json({data:postData});
     }

     var deleteUsers = async(req, res) =>  {
        const data = await Users.destroy({
            where :{
                id:req.params.id
            }
        });
        res.status(200).json({data:data});
     }
     var patchUsers = async(req, res) =>  {
        var updatedData = req.body;
        const data = await Users.update({updatedData},{
            where: {
                id:req.params.id
            }
        });
        res.status(200).json({data:data});
     }
     
module.exports = {
    addUser,
    crudOp,
    queryData,
    getSet,
    validation,
    rawQuery,
    postUsers,
    getUsers,
    deleteUsers,
    patchUsers
} 