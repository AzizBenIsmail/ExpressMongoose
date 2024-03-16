const carModel = require("../models/carModel");
const User = require('../models/userSchema');
const getAllCars = async (req, res, next) => {
    try {
      const carList = await carModel.find().populate('owner');
      if (!carList) {
        throw new Error("Car not found");
      }
      res.status(200).json(carList);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getCarById = async (req, res, next) => {
    try {
        const { id } = req.params;
      const carList = await carModel.findById(id);
      if (!carList) {
        throw new Error("Car not found");
      }
      res.status(200).json(carList);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


const createCar = async (req, res, next) => {
    try {
      const { brand, model, year, owner } = req.body;
      const car = new carModel({
        brand,
        model,
        year,
        owner,
      });
      const caradded = await car.save();

      await User.findByIdAndUpdate(owner, { $push: { cars: car._id } });

      res.status(200).json(caradded);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Mettre à jour une voiture
const updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { brand, model, year, ownerId } = req.body;
        const car = await carModel.findByIdAndUpdate(id, { brand, model, year, owner: ownerId }, { new: true });
        if (!car) {
            return res.status(404).json({ message: "Voiture introuvable" });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await carModel.findByIdAndDelete(id);
        if (!car) {
            return res.status(404).json({ message: "Voiture introuvable" });
        }

        await User.updateMany({}, { $pull: { cars: car._id } });

        res.status(200).json({ message: "Voiture supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCar, getAllCars, getCarById, updateCar, deleteCar };
