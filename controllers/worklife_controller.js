// Pull in required dependencies
var express = require('express');
var router = express.Router();
var cryptoRandomString = require('crypto-random-string');
var sequelize = require('sequelize');
var Op = sequelize.Op;

// Import the sequelize model
var db = require('../models');


//Route to index
router.get('/', function (req, res) {
    res.render("index");
});

//Route to registration
router.get('/register', function(req, res){
    res.render("register");
});

//Route to homepage. TO BE DONE: get the data for the specific user
//and then pass back user info to the page.
router.get('/home', function(req, res){
    //NOT DONE
    db.User.findOne({
        where: {
            username: {
                [Op.like]: req.body.username
            },
            password: {
                [Op.link]: req.body.password
            }
        }
    }).then(function (dbUser) {
        res.json(dbUser);
        res.render("home", dbUser);
    });
});

//Route to the survey.
router.get('/survey', function(req, res){
    res.render("survey");
});

//Route to the results. TO BE DONE: get the data for the specific user,
//calculate their values per category, then send it back to the client.
//Will also need to get data from the suggestions database.
router.get('/reports', function(req, res){
    //NOT DONE
    db.User.findOne({
        where: {
            username: {
                [Op.like]: req.body.username
            },
            password: {
                [Op.like]: req.body.password
            }
        }
    }).then(function (dbUser) {
        res.render("reports", dbUser);
    });
});

//Route to the input. TO BE DONE: get the data for the specific user.
router.get('/input', function(req, res){
    //NOT DONE
    db.User.findOne({
        where: {
            username: {
                [Op.like]: req.body.username
            },
            password: {
                [Op.link]: req.body.password
            }
        }
    }).then(function (dbUser) {
        res.render("input", dbUser);
    });
});

//Route to post the user data on registration. TO BE DONE:
//Determine whether we can just pass back the JSON or 
//whether we need to render the home page. Ensure
//the names for each field from the client corresponds to the names
//used in this file.
router.post('/api/users', function (req, res) {

    authToken = cryptoRandomString(10);
    //MIGHT NEED TO ADJUST DEPENDING ON HOW DATA IS PASSED IN.
    db.User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        auth: authToken,
        answers: req.body.answers,
        work_points: req.body.workPoints,
        life_points: req.body.lifePoints,
        exercise_points: req.body.exercisePoints,
    }).then(function (dbUser) {
        console.log("Item added: ", dbUser);
        db.Survey.create({
            age: req.body.age,
            married: req.body.married,
            children: req.body.children,
            parents: req.body.children,
            exercise: req.body.exercise,
            health: req.body.healthy,
            work: req.body.work,
            creative: req.body.creative,
            social: req.body.social,
            services: req.body.services
        }).then(function(dbSurvey){
            dbSurvey.belongsTo(User, {foreignKey: dbUser.id});
            res.render("home", dbUser);
        }).catch(function(err){
            res.json(err);
        });
    }).catch(function(err){
        res.json(err);
    });
});

//Route to update the user's info. TO BE DONE: Create
//the update function using sequelize.
router.put('/api/users', function(req, res){
    //Need to figure out what data is being sent on the update request.
    db.User.update({
        email: req.body.email,
        password: req.body.password,
        answers: req.body.answers
    },{
        where: {
            id: req.body.id
        }
    }).then(function(dbUser){
        res.json(dbUser);
        res.render("home", dbUser);
    }).catch(function(err){
        res.json(err);
    });
});


//Route to delete the user's acct.
router.delete('/api/users/:id', function(req, res){

    db.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(dbUser){
        res.json(dbUser);
        res.render("index");
    }).catch(function(err){
        res.json(err);
    });
});

//Route to login
router.post('/login', function(req, res){

    db.User.findOne({
        where: {
            username: {
                [Op.like]: req.body.username
            },
            password: {
                [Op.link]: req.body.password
            }
        }
    }).then(function(dbUser){
        res.json(dbUser);
        res.render("home", dbUser);
    }).catch(function(err){
        res.json(err);
    });

});

// Export routes for server.js to use.
module.exports = router;