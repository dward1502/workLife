// Pull in required dependencies
var express = require('express');
var router = express.Router();
var cryptoRandomString = require('crypto-random-string');
var sequelize = require('sequelize');
var Op = sequelize.Op;

// Import the sequelize model
var db = require('../models');

function createString(arr){
    newString = '';
    arr.forEach(element => {
        newString += element;
        newString += ",";
    });

    return newString;
}
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
router.get('/home/:authToken', function(req, res){
    //NOT DONE
    db.User.findOne({
        where: {
            auth: {
                [Op.like]: req.params.authToken
            }
        }
    }).then(function (dbUser) {

        var hbsObject = {
            user: dbUser
        }

        res.render("home", hbsObject);
    });
});

//Route to the survey.
router.get('/survey', function(req, res){
    res.render("survey");
});

//Route to the results. TO BE DONE: get the data for the specific user,
//calculate their values per category, then send it back to the client.
//Will also need to get data from the suggestions database.


router.get('/reports/:authToken', function(req, res){
    //NOT DONE
    db.User.findOne({
        where: {
            auth: req.params.authToken
        }
    }).then(function (dbUser) {
        var hbsObject = {
            user: dbUser
        }
        res.render("reports", hbsObject);
    });
});



//Route to the input. TO BE DONE: get the data for the specific user.
router.get('/input/:authToken', function(req, res){
    //NOT DONE
    db.User.findOne({
        where: {
            auth: req.params.authToken
        }
    }).then(function (dbUser) {

        var hbsObject = {
            user: dbUser
        }
        console.log(hbsObject);
        
        res.render("input", hbsObject);
    });
});


//Route to post the user data on registration. TO BE DONE:
//Determine whether we can just pass back the JSON or 
//whether we need to render the home page. Ensure
//the names for each field from the client corresponds to the names
//used in this file. Survey has knowledge of user.
router.post('/api/users', function (req, res) {

    authToken = cryptoRandomString(10);
    //MIGHT NEED TO ADJUST DEPENDING ON HOW DATA IS PASSED IN.
    db.User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        auth: authToken,
        work_points: 0,//req.body.workPoints,
        life_points: 0,//req.body.lifePoints,
        exercise_points: 0,//req.body.exercisePoints,
    }).then(function (dbUser) {   
        db.Survey.create({
            age: req.body.age,
            married: req.body.married,
            children: req.body.children,
            parents: req.body.children,
            exercise: req.body.exercise,
            healthy: req.body.healthy,
            work: req.body.work,
            physical: createString(req.body.physical),
            social: createString(req.body.social),
            services: createString(req.body.services),
            userId: dbUser.id
        }).then(function(dbSurvey){
            res.json(dbUser);
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
    }).catch(function(err){
        res.json(err);
    });
});


function calcPoint(survey){

    var currExercise = parseInt(survey.currExercise);
    var currWork = parseInt(survey.currWork);
    var currLife = parseInt(survey.currLife);
    var counter = 0
    for(question in survey){
        if(survey[question] === "yes"){
           if(counter < 9){
            //do something
            currExercise += 1;
           } else if (counter >= 9 && counter < 19){
            currWork += 1;
           } else if(counter >= 19){
            currLife += 1;
           }
        }
        counter++;
    }

    return current = {currExercise: currExercise, currWork: currWork, currLife: currLife};
}

router.put('/api/users/:authToken', function(req, res){
    console.log(req.body);

    var weekPoints = calcPoint(req.body);

    db.User.update({
        work_points: weekPoints.currWork,
        life_points: weekPoints.currLife,
        exercise_points: weekPoints.currExercise,
        previous_exercise: req.body.currExercise,
        previous_work: req.body.currWork,
        previous_life: req.body.currLife
    }, {
            where: {
                auth: req.params.authToken
            }
        }).then(function (dbUser) {
            res.json(dbUser);
        }).catch(function (err) {
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
                [Op.like]: req.body.password
            }
        }
    }).then(function(dbUser){
        res.json(dbUser);
    }).catch(function(err){
        res.json(err);
    });

});

// Export routes for server.js to use.
module.exports = {
    router: router
};