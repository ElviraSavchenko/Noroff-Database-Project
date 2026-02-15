const {sequelize} = require('../models');
const { QueryTypes } = require('sequelize'); //sequelize needs to know how to format returned query results,
//  hence the SELECT QueryType is specified.

class HotelService {
    constructor(db) {
        this.client = db.sequelize;
        this.Hotel = db.Hotel;
        this.Rate = db.Rate;
        this.User = db.User;
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

    // //Get hotel details using raw SQL
    // async getHotelDetails(hotelId) {
    //     const hotel = await sequelize.query('SELECT * FROM hotels WHERE id = :hotelId LIMIT 1;', {
    //         replacements:
    //         {
    //             hotelId: hotelId
    //         },
    //         type: QueryTypes.SELECT,
    //     });
    //     return hotel[0]; //The hotelDetails.ejs page will only display the details of a single hotel,
    //     //  however Sequelize’s query method returns results in an array of objects (even if the SQL query only returns a single record). Therefore, the index [0] should be used to access the first element of the results. 
    //     // Hence, the getHotelDetails() function returns the following:
    // }

    //Get hotel details using raw SQL (with new Avarage rating fiels -ejs)
    async getHotelDetails(hotelId) {
        //Retrive hotel data
        const hotel = await sequelize.query('SELECT h.id, h.Name, h.Location, ROUND(AVG(r.Value), 1) AS AvgRate FROM hotels h LEFT JOIN rates r ON h.id = r.HotelId WHERE h.id = :hotelId', {
            replacements:
            {
                hotelId: hotelId
            },
            type: QueryTypes.SELECT,
        });

        //Retrive user rating count
        const userRateCount = await sequelize.query('SELECT COUNT(*) as Rated FROM rates WHERE HotelId = :hotelId AND UserId = :userId;', {
            replacements:
            {
                hotelId: hotelId,
                userId: 1
            },
            type: QueryTypes.SELECT,
        });
        //Check if user has rated this hotel.
        if (userRateCount[0].Rated > 0) {
            hotel[0].Rated = true;
        } else {
            hotel[0].Rated = false;
        }

        return hotel[0]; //The hotelDetails.ejs page will only display the details of a single hotel,
        //     //  however Sequelize’s query method returns results in an array of objects (even if the SQL query only returns a single record). Therefore, the index [0] should be used to access the first element of the results. 
        //     // Hence, the getHotelDetails() function returns the following:
    }

    //Function to rate a hotel using raw SQL:
    async makeARate(userId, hotelId, value) {
        sequelize.query('INSERT INTO rates (Value, HotelId, UserId) VALUES (:value, :hotelId, UserId', {
            replacements: {
                value: value,
                userId: userId,
                hotelId: hotelId
            }
        }). then(result => {
            return result
        }).catch(err => {
            return (err)
        })
    }
}

module.exports = HotelService;