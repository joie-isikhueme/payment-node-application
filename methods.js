let jwt = require('jsonwebtoken')
module.exports.ensureToken = function(req, res, next) {
 var bearerHeader = req.headers["authorization"]
 if (typeof bearerHeader !== "undefined") {

    const bearerToken = bearerHeader.split(" ")[1];
    jwt.verify( bearerToken, "secretkey", (err, token) => {

        res.json({
    
          token
    
        });
    
      });
    req.token = bearerToken;

    next();

  } else {

    res.sendStatus(403);

  }
}
