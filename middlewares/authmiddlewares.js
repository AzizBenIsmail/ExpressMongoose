const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");

const requireAuthUser = async (req, res, next) => {
  const token = req.cookies.jwt_token;  //partie 1
  console.log("token", token); //token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODg5OWI0ZDViODAzM2UxY2M1MTNiMyIsImlhdCI6MTY4Njc1MzQ4NCwiZXhwIjoxNjg2NzYwNjg0fQ.KPnsNPjL0PS3oyZ5l3mMC9GUc0ymgheVr-FYt_31pN0
  // const authHeader = req.headers.authorization;
  // const token = authHeader && authHeader.split(" ")[1]; //Partie2
  // console.log("token", token);
  if (token) {
    jwt.verify(token, "net Formation secret", async (err, decodedToken) => {
      if (err) {
        console.log("il ya une erreur au niveau du token", err.message);
        res.json("/Problem_token");
      } else {  //nsina configuration ta3 session fil appp.js ba3ed pause nchoufouha 
        //console.log(decodedToken.id);
        user = await userModel.findById(decodedToken.id);
        console.log(user);
        //req.session.user = user
        next();
      }
    });
  } else {
    res.json("/pas_de_token");
  }
};
module.exports = { requireAuthUser };
