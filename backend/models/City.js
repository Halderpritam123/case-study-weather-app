const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
    cloud_pct: String,
    temp: String,
    humidity: String,
    min_temp: String,
    max_temp: String,
    wind_speed: String,
    wind_degrees: String,
    sunrise: String,
    sunset: String,
},{
    versionKey:false
});

module.exports = mongoose.model('City', citySchema);
