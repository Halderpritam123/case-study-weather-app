const City = require('../models/City');

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get city by name
exports.getCityByName = async (req, res) => {
  const cityName = req.params.name;
  try {
    const city = await City.findOne({ name: cityName });
    if (city) {
      res.json(city);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Err' });
  }
};

// Create a new city
exports.createCity = async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
};

// Update city by ID
exports.updateCityById = async (req, res) => {
  const cityId = req.params.id;
  try {
    const updatedCity = await City.findByIdAndUpdate(
      cityId,
      req.body,
      { new: true }
    );
    if (updatedCity) {
      res.json(updatedCity);
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete city by ID
exports.deleteCityById = async (req, res) => {
  const cityId = req.params.id;
  try {
    const deletedCity = await City.findByIdAndRemove(cityId);
    if (deletedCity) {
      res.json({ message: 'City deleted successfully' });
    } else {
      res.status(404).json({ error: 'City not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//get by id
exports.getCityById = async (req, res) => {
    const cityId = req.params.id;
    try {
      const city = await City.findById(cityId);
      if (city) {
        res.json(city);
      } else {
        res.status(404).json({ error: 'City not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
