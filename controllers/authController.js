const userModel = require("../models/userSchema");

module.exports.getUsers = async (req, res, next) => {
  try {
    const userList = await userModel.find().populate('cars');
    if (!userList) {
      throw new Error("User not found");
    }
    console.log(userList);
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