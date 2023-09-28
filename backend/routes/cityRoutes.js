const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

// Get all cities
router.get('/', cityController.getAllCities);

// Get city by ID
router.get('/:id', cityController.getCityById); // New route for getting a city by ID

// Get city by name
router.get('/search/:name', cityController.getCityByName);

// Create a new city
router.post('/', cityController.createCity);

// Update city by ID
router.patch('/:id', cityController.updateCityById);

// Delete city by ID
router.delete('/:id', cityController.deleteCityById);

module.exports = router;
