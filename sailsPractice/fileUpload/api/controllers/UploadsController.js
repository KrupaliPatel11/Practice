// /**
//  * UploadsController
//  *
//  * @description :: Server-side actions for handling incoming requests.
//  * @help        :: See https://sailsjs.com/docs/concepts/actions
//  */

// module.exports = {
  
// upload : (req, res) => {
//     req.file('profile').upload(function(err, file) {
//         if(err) console.log(err);
//         res.json({
//             Message :"successfully uploaded",
//             file : file
//         })
//     })
// }
// };

const multer = require('multer')
const upload = multer({dest : "uploads/"})

module.exports = {
upload : async(req, res) =>{
    const file = req.file
    const imageurl = `$(file.filename)`

    const image = await Uploads.create({
        profile : file
    })
    res.send({
        profile : image
    })
    console.log(image);
}
}



