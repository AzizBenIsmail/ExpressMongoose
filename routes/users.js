var express = require('express');
var router = express.Router();
const userModel = require('../models/userSchema');

router.get('/', async function(req, res, next) {
  try {
       const userList = await userModel.find();
      if(!userList)
      {
        throw new Error('User not found');
      }
      console.log(userList);
      res.status(200).json(userList);
  }catch(err) {
    res.status(500).json({message: err.message});
  }
});

router.post('/', async function(req, res, next) {
  try {    
    console.log(req.body);
    const {nom , prenom , age , address} = req.body;
    const user= new userModel({
      nom , prenom , age , address
    })
    const usersadded = await user.save();
      res.status(200).json(usersadded);
  }catch(err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;
