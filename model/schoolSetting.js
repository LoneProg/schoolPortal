const mongoose = require('mongoose');

const schoolSettingsSchema = new mongoose.Schema({
    settingName: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    updatedAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('SchoolSettings', schoolSettingsSchema);