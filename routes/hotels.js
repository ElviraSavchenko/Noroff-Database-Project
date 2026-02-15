var express = require('express');
var router = express.Router();
var HotelService = require("../services/HotelService");
var db = require('../models')
var hotelService = new HotelService(db);
// to create post and delete request - to parse json file:
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

//GET hotels listing: 

router.get('/', async function(req, res, next) {
    const hotels = await hotelService.get();
    res.render('hotels', {hotels: hotels})
});

// POST hotels request:

router.post('/',jsonParser, async function(req, res, next) {
    let Name= req.body.Name;
    let Location = req.body.Location;
    await hotelService.create(Name, Location);
    res.end()
})

// delete request:

router.delete('/', jsonParser, async function(req, res, next) {
    let id = req.body.id
    await hotelService.deleteHotel(id);
    res.end()
})

//to get hotels details
router.get('/:hotelId', async function(req, res, next) {
  const hotel = await hotelService.getHotelDetails(req.params.hotelId);
  res.render('hotelDetails', { hotel: hotel });
});

//Handler for ratings of the particular hotel:
router.post('/:hotelId/rate', jsonParser, async function(req, res, next) {
  let value = req.body.Value;
  await hotelService.makeARate(1, req.params.hotelId, value);
  res.end()
});

module.exports = router;