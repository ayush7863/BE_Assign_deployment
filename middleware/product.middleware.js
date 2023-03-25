const jwt = require("jsonwebtoken");

const validator = (req, res, next) => {
  const  token  = req.headers.authorization;
//   console.log(token)
  if (token) {
    const decoded=jwt.verify(token, "masai") 
      if (decoded) {
        req.body.userID=decoded.userID
        next();        
      } else {
        res.status(400).send({ err: "Please Login first" });
      }
    
  } else {
    res.status(400).send({ err: "Please Login first" });
  }
};
module.exports = {
  validator,
};
