module.exports = function (sequelize, DataTypes) {
    var Suggestions = sequelize.define("Suggestions", {
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: [['exercise', 'life', 'work']]
            }
        }
    });
    return Suggestions;
};