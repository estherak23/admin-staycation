const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    //validasi required berarti gak boleh kosong
    required: true
  }
})

module.exports = mongoose.model('Image', imageSchema)