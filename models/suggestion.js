module.exports = function (sequelize, DataTypes) {
    var Suggestions = sequelize.define("Suggestions", {
        text: DataTypes.STRING,
        type: DataTypes.STRING
    });
    return Suggestions;
};