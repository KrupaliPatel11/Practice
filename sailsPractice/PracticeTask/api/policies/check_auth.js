// const jwt = require('jsonwebtoken');

// module.exports = async (req, res, next) => {
//     try {
//         const token = await req.cookies.authorization.split(" ")[1];
//         console.log(token);
//         const decoded = await jwt.verify(token, process.env.JWT_KEY);
//         req.userData = decoded;
//         // console.log(decoded)
//         next();
//     } catch (error) {
//         return await res.status(401).json({
//             FAILED: "Auth failed"
//         })
//     }
// };
/**
 *  Get the token, checks it in database and verify it.
 */

// const rescode = sails.config.constants.httpStatusCode;
// const msg = sails.config.messages.Authorization;
// const msg1 = sails.config.getMessages;
const jwt = require('jsonwebtoken');

module.exports = async (req, res, proceed) => {
//   const lang = req.getLocale();
  try {
    //get token from headers with 1st part that splitted with whitespace
    //eg. Bearer 'TOKEN'
    // const token = req.headers.authorization.split(' ')[1];
    const token = req.cookies.token;
    console.log("token");
    let tokendb;
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;

    //finds user by id got from token
      let result = await User.findOne({ id: req.userData.userId });
      //stores token from user's database
      tokendb = result.token;
    //matching both token
    if (token !== tokendb) {
      //if token mismatches
    //   req.addFlash('error', msg1('TokenMismatched', lang));
        alert("TokenMismatched")
    //   res.status(rescode.BAD_REQUEST);
      return res.redirect('/login');
      // .json({
      //   message: msg1('TokenMismatched', lang),
      // });
    } else {
      return proceed();
    }
  } catch (err) {
    //if token expired
    if (err instanceof jwt.TokenExpiredError) {
      // return res.send(msg1('TokenExpired', lang));
    //   req.addFlash('error', msg1('TokenExpired', lang));
    alert("Token expired")
      await User.updateOne({ id: req.userData.userId}).set({
        token:null,
        isActive:false
      });
      return res.redirect('/login');
    } else {
      res.redirect('/login');
    }
  }
};
