//NEED TO DISCUSS HOW WE ARE SAVING THE ANSWERS TO THE SURVEY. I RECOMMEND A SEPARATE MODEL FOR THE ANSWERS
//WITH A FOREIGN KEY TO THEIR USER.
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [6-25]
            }
        },
        auth: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        work_points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        life_points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        exercise_points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        },
        previous_exercise: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            },
            defaultValue: 0
        },
        previous_work: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            },
            defaultValue: 0
        },
        previous_life: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true
            },
            defaultValue: 0
        }
    });
    return User;
};