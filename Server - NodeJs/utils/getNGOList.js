// Including different models
const NGO = require("../models/NGOs.js");

// Save Form
const getNGO = async (query, limit) => {
  let ngolist = await NGO.find(query, {
    img_url: 1,
    email_address: 1,
    name: 1,
    registration_date: 1,
    foreign_fund: 1,
    address: 1,
    isClaimed: 1
  })
    .limit(parseInt(limit))
    .then(ngolist => {
      console.log("got NGOlist");
      return ngolist;
    });
  console.log("returning NGOlist");
  return ngolist;
};

exports.getNGO = getNGO;
