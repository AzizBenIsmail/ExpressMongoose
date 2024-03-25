const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const maxAge = 2 * 60 * 60 //7200 seconds  // 2 * 60 = 2 minutes

const creatToken = (id) => {
  return jwt.sign({id},'net Formation secret',{expiresIn: maxAge});
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODg5OWI0ZDViODAzM2UxY2M
//1MTNiMyIsImlhdCI6MTY4Njc1MzQ4NCwiZXhwIjoxNjg2NzYwNjg0fQ
//.KPnsNPjL0PS3oyZ5l3mMC9GUc0ymgheVr-FYt_31pN0

// const creatTokenMdp = (id) => {
//   return jwt.sign({id, exp: Math.floor(Date.now() / 1000) + 120 },'net Formation secret');
// }

module.exports.signupclient = async (req,res) => {
  const {email ,password,name}=req.body;
  const role ='client'
  try{
    const user = await userModel.create({ email,password,role,nom : name })
    const token =creatToken(user._id);
    res.cookie('jwt_token', token , {httpOnly : true ,maxAge : maxAge * 1000} )
    res.status(201).json({user})
  }catch(err){
   res.status(500).json({message: err.message})
  }
}

module.exports.logout = async (req,res) => {
  try {
    res.cookie('jwt_token', '', { httpOnly: false, maxAge: 1 });
    req.session.destroy();
    res.status(200).json({
      message: 'User successfully logged out',
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  } 
}
module.exports.login = async (req,res) => {
  const {email ,password}=req.body;
  //console.log(req.body)
  try{
    if(!email) {
      return res.status(200).json({message : 'Email not found'})
    }
    const user = await userModel.login( email,password)
    
    const token =creatToken(user._id);
    res.cookie('jwt_token', token , {httpOnly : true ,maxAge : maxAge * 1000} )
    res.status(201).json({
      message: 'User successfully authenticated', user: user,
    })
  }catch(err){
   res.status(500).json({message: err.message})
  }
}
module.exports.getUsers = async (req, res, next) => {
  try {
    //console.log(req.session.user);
    const userList = await userModel.find().populate('cars');
    // if (!userList) {
    //   throw new Error("User not found");
    // }
    //console.log(userList);
    res.status(200).json(userList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports.addUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { nom, prenom, age, address } = req.body;
    const user = new userModel({
      nom,
      prenom,
      age,
      address,
    });
    const usersadded = await user.save();
    res.status(200).json(usersadded);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUserByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    //console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("User not found");
    }
    await userModel.findByIdAndDelete(id);

    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nom, prenom, age, address } = req.body;
    const checkIfUserExists = await userModel.findById(id);
    if (!checkIfUserExists) {
      throw new Error("User not found");
    }

    updated = await userModel.findByIdAndUpdate(
      id,
      {
        $set: { nom, prenom, age, address },
      },
      { new: true }
    );

    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.searchUsersByName = async (req, res, next) => {
  try {
    const { nom } = req.query;
    if (!nom) {
      throw new Error("Veuillez fournir un nom pour la recherche.");
    }
    const userList = await userModel.find({
        nom:{$regex: nom, $options: "i"},
    });
    if (!userList) {
      throw new Error("User not found");
    }
    console.log(userList);
    res.status(200).json(userList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUsersSortByAge = async (req, res, next) => {
    try {
      const userList = await userModel.find().sort({ age : 1});
      if (!userList) {
        throw new Error("User not found");
      }
      console.log(userList);
      res.status(200).json(userList);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports.getUsersSortByAgeDesc = async (req, res, next) => {
    try {
      const userList = await userModel.find().sort({ age : -1});
      if (!userList) {
        throw new Error("User not found");
      }
      console.log(userList);
      res.status(200).json(userList);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports.addClient = async (req, res, next) => {
    try {
      const {filename}= req.file;
      const { email , password} = req.body;
      if (!email) {
        return res.status(500).json({ message: "Email required" });
      }
      if (!filename) {
        return res.status(500).json({ message: "filename required" });
      }
      if (!password) {
        return res.status(500).json({ message: "password required" });
      }
      const user = new userModel({
        email,
        password,
        image_user: filename      
      });
      const usersadded = await user.save();
      res.status(200).json(usersadded);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };