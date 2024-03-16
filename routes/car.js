const express = require('express');
const router = express.Router();
const { createCar , getAllCars , deleteCar , getCarById ,updateCar } =  require('../controllers/carController');

// Créer une nouvelle voiture
router.post('/', createCar);

// Lire toutes les voitures
router.get('/', getAllCars);

// Lire une voiture par son ID
router.get('/:id', getCarById);

// Mettre à jour une voiture
router.put('/:id', updateCar);

// Supprimer une voiture
router.delete('/:id', deleteCar);

module.exports = router;
