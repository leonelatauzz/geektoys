const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Review = sequelize.define('review', {
        rating:{
            type: DataTypes.ENUM('0', '1', '2', '3', '4'),
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING
        },
        userId:{
            type: DataTypes.INTEGER
        }
        
    })
    return Review;
};