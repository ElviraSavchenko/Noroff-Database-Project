module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define('User', {
        FirstName: Sequelize.DataTypes.STRING,
        LastName: Sequelize.DataTypes.STRING
    }, {
        timestamps: false //to not have default createdAt and updatedAt fields
    });
    //creating relationships between models using Sequelize Association method:

    User.associate = function(models) {
        User.belongsToMany(models.Hotel, {through: models.Rate})
        User.belongsToMany(models.Room, {through: models.Reservation})
    };
    return User
}