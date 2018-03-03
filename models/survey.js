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
               allowEmpty: false
           }
       },
       children: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isAlpha: true,
               allowEmpty: false
           }
       },
       parents: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isAlpha: true,
               allowEmpty: false
           }
       },
       exercise: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isAlpha: true,
               allowEmpty: false
           }
       },
       healthy: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isAlpha: true,
               allowEmpty: false
           }
       },
       work: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               isAlpha: true,
               allowEmpty: false
           }
       },
       creative: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               allowEmpty: true
           }
       },
       social: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               allowEmpty: true
           }
       },
       services: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               allowEmpty: true
           }
       }
    });
    return Survey;
}