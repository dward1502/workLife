//Model to handle the survey data.
var User = require('./user');

module.exports = function(sequelize, DataTypes){
    var Survey = sequelize.define("Survey", {
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
       married: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isAlpha: true,
               notEmpty: false
           }
       },
       children: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isAlpha: true,
               notEmpty: false
           }
       },
       parents: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isAlpha: true,
               notEmpty: false
           }
       },
       exercise: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isAlpha: true,
               notEmpty: false
           }
       },
       healthy: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isAlpha: true,
               notEmpty: false
           }
       },
       work: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isAlpha: true,
               notEmpty: false
           }
       },
       creative: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               notEmpty: true
           }
       },
       social: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               notEmpty: true
           }
       },
       services: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               notEmpty: true
           }
       },
       userId: {
           type: DataTypes.INTEGER,
           allowNull: false
       }
    });
    return Survey;
}