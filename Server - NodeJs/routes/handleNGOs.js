var express = require("express");

// Including different models
const NGO = require("../models/NGOs.js");
const default_NGOlist = require("../utils/default_NGOlist.js").NGOS;
const getNGOListData = require("../utils/getNGOList.js");

var router = express.Router();
var mongoose = require("mongoose");

// Get NGOlist based on query Data Route.
router.get("/filter", async function(req, res) {
  // -----------------------**************---------------------------------
  // Logic to filter dummy with name or get ngo.
  // -----------------------**************---------------------------------

  let limit = 100; // Setting default limit for now

  if ("startsWith" in req.query) {
    let regex = new RegExp(`^${req.query.startsWith}.*`, "i");
    query = { name: regex };
    let list = await getNGOListData.getNGO(query, limit);
    res.status(200).json({
      status: "200",
      list: list
    });
  } else if ("ngo_id" in req.query) {
    query = { _id: req.query.ngo_id };
    let list = await getNGOListData.getNGO(query, limit);
    res.status(200).json({
      status: "200",
      list: list
    });
  } else {
    let list = await getNGOListData.getNGO({}, limit);
    res.status(200).json({
      status: "200",
      list: list
    });
  }
});

// Update Claming / Unclaiming Of NGO Route.
router.put("/claim", async function(req, res) {
  // -----------------------**************---------------------------------
  // Logic to claim / unclaim NGO.
  // -----------------------**************---------------------------------

  let query = { _id: req.body.ngo_id };
  //console.log(typeof req.body.claim);
  let details = NGO.findOneAndUpdate(query, {
    $set: { isClaimed: req.body.claim }
  }).then(
    data => {
      //console.log(data);
      res.status(200).json({
        status: "200",
        message: "Updated Successfully",
        details: data
      });
    },
    err => {
      console.log(err);
      res.status(500).json({
        status: "500",
        message: "Error Updating"
      });
    }
  );
});

// NGOlist Feed Dummy Data Route.
router.get("/feedDummyData", async function(req, res) {
  // -----------------------**************---------------------------------
  // Logic to feed dummy data.
  // -----------------------**************---------------------------------

  // Using Default NGOlist for now
  default_NGOlist.ngolist.forEach(async item => {
    let new_item = new NGO({
      img_url: item.img_url,
      email_address: item.email_address,
      name: item.name,
      registration_date: new Date(item.registration_date),
      foreign_fund: item.foreign_fund,
      address: {
        line1: item.address.line1,
        line2: item.address.line2,
        city: item.address.city,
        distict: item.address.distict,
        state: item.address.state,
        pincode: item.address.pincode
      },
      isClaimed: item.isClaimed
    });
    try {
      await new_item.save();
      console.log("updated NGOlist");
    } catch (err) {
      console.log(err);
      console.log("error updating NGOlist");
    }
  });
  res.status(200).json({
    status: "200",
    message: "NGOlist Will Be Updated Soon !!"
  });
});

module.exports = router;
