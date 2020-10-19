const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Review = sequelize.define('review', {
        rating:{
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Review;
};