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
module.exports = router;