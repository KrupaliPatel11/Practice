const checkAuth = (req, res, next) => {
    console.log(req.headers);
    if (req.headers.token && req.headers.token != "") {
        next();
    } else {
        res.setHeader("Content-type", "Application/json");
        res.statusCode = 401;
        res.end(JSON.stringify({ status: 401, message: "Authentication Failed" }));
    }
}

module.exports = checkAuth;

