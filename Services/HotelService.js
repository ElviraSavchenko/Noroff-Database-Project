const {sequelize} = require('../models');
const { QueryTypes } = require('sequelize'); //sequelize needs to know how to format returned query results,
//  hence the SELECT QueryType is specified.

class HotelService {
    constructor(db) {
        this.client = db.sequelize;
        this.Hotel = db.Hotel;
    }

    //Create a hotel using a Raw SQL:
    async create(name, location) {
        sequelize.query('INSERT INTO Hotels (Name, Location) VALUES (:Name, :Location)', {
            replacements: 
            {
                Name: name,
                Location: location
            }
        }).then(result => {
            return result
        }).catch(err => {
            return (err)
        })
    }

    //GET all hotels using raw SQL:
    async get() {
        const hotels = sequelize.query('SELECT * FROM Hotels', {
            type: QueryTypes.SELECT //for sequelize to know  how to format returned query results,
            //hence the SELECT QueryType is specified
        });
        return hotels
    }

    //DELETE a hotel using raw SQL:
    async deleteHotel(hotelId) {
        await sequelize.query('DELETE FROM Hotels WHERE id = :hotelId', {
            replacements: 
            {
                hotelId: hotelId
            }
        }).then(result => {
            return result
        }).catch(err => {
            return (err)
        })
    }
}

module.exports = HotelService;