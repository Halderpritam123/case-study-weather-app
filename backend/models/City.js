const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  current_weather: {
    cloud_pct: Number,
    temp: Number,
    feels_like: Number,
    humidity: Number,
    min_temp: Number,
    max_temp: Number,
    wind_speed: Number,
    wind_degrees: Number,
    sunrise: Number,
    sunset: Number,
  },
},{
    versionKey:false
});

module.exports = mongoose.model('City', citySchema);
