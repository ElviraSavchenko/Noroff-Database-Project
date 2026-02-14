module.exports = function(sequelize, Sequelize) {
    const Reservation = sequelize.define('Reservation', {
        StartDate: Sequelize.DataTypes.DATE,
        EndDate: Sequelize.DataTypes.DATE
    }, {
        timestamps: false,
        hasTrigger: true //in the models/rooms.js we created a trigger on Reservation table thtough the sequelize - so here we specify about that trigger by setting 'hasTrigger' property
    });
    return Reservation
}

