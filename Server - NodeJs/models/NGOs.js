const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NGOSchema = new Schema({
  img_url: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  name: {
    type: String,
    required: true
  },
  registration_date: {
    type: Date,
    required: true
  },
  foreign_fund: {
    type: Boolean,
    required: true,
    default: false
  },
  address: {
    type: Object,
    required: true
  },
  isClaimed: {
    type: Boolean,
    required: true
  }
});
module.exports = NGO = mongoose.model("NGO", NGOSchema);
