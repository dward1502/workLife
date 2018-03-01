module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        auth: DataTypes.STRING,
        answers: DataTypes.ARRAY(DataTypes.STRING),
        work_points: DataTypes.INTEGER,
        life_points: DataTypes.INTEGER,
        exercise_points: DataTypes.INTEGER,
        previous_exercise: DataTypes.INTEGER,
        previous_work: DataTypes.INTEGER,
        previous_life: DataTypes.INTEGER
    });
    return User;
};