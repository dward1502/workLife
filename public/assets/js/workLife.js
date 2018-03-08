// var calcPoints = require('./controllers/worklife_controller.js');

// var requirejs = require('requirejs');

// requirejs.config({
//     //Pass the top-level main.js/index.js require
//     //function to requirejs so that node modules
//     //are loaded relative to the top-level JS file.
//     nodeRequire: require
// });

// requirejs([]);


$(document).ready(function () {
    $("#loginModal").hide();
});

// var currLife = 0;
// var currWork = 0;
// var currExcercise = 0;

$('#login').leanModal({
    top: 100,
    overlay: 0.6,
    closeButton: ".close"
});

/**
 * LOGIN
 */
$("#loginBtn").on("click", function (event) {

    var userLogin = {
        username: $("#username").val().trim(),
        password: $("#password").val().trim()
    };


    $.ajax("/login", {
        type: "POST",
        data: userLogin
    }).then((res) => {
        console.log('res is: ', res.auth);
        localStorage.clear();
        localStorage.setItem("currAuth", res.auth);
        localStorage.setItem("currWork", res.work_points);
        localStorage.setItem("currExercise", res.exercise_points);
        localStorage.setItem("currLife", res.life_points);

        console.log(localStorage.getItem("currAuth"));
        window.location  = "/home/" + localStorage.getItem("currAuth");
    });

    event.preventDefault();
});

$('#logoutBtn').on('click', function (event) {
    
    var empty = {};

    $.ajax("/logout", {
        type: "POST",
        data: empty
    }).then(res => {
        localStorage.clear();
        window.location = '/';
    })
})

/**
 * REGISTER
 */
$("#submit").on("click", function (event) {
    event.preventDefault();

    var physical = [];
    var social = [];
    var service = [];

    $.each($("input[name='service']:checked"), function () {
        physical.push($(this).val());
    });
    $.each($("input[name='social']:checked"), function () {
        social.push($(this).val());
    });
    $.each($("input[name=service]:checked"), function () {
        service.push($(this).val());
    });    

    var newRegUser = {
        firstname: $("#firstName").val().trim(),
        email: $("#email").val().trim(),
        username: $("#userName").val().trim(),
        password: $("#password").val().trim(),
        age: $("#age").val(),
        married: $('.mar:checked').val(),
        children: $('.kid:checked').val(),
        parents: $('.par:checked').val(),
        exercise: $('.ex:checked').val(),
        healthy: $('.health:checked').val(),
        work: $('.wrk:checked').val(),
        physical: physical,
        social: social,
        services: service
    };
    
    
    console.log(newRegUser);

    $.ajax("/api/users", {
        type: "POST",
        data: newRegUser
    }).then((res) =>{
        
        localStorage.clear();
        localStorage.setItem("currAuth", res.auth);
        localStorage.setItem("currWork", res.work_points);
        localStorage.setItem("currExercise", res.exercise_points);
        localStorage.setItem("currLife", res.life_points);

        console.log(localStorage.getItem("currAuth"));
        window.location = "/home/" + localStorage.getItem("currAuth");
        
    });
});

/**
 * WEEKLY INPUT
 */
$("#subInput").on("click", function (event) {
    event.preventDefault();
    
    var wkInput = {
        exQ1: $(".work1:checked").val(), exQ1: $(".work2:checked").val(), exQ3: $(".work3:checked").val(), exQ4: $(".work4:checked").val(),
        exQ5: $(".work5:checked").val(), exQ6: $(".work6:checked").val(), exQ7: $(".work7:checked").val(), exQ8: $(".work8:checked").val(),
        exQ9: $(".work9:checked").val(),
        wrkQ1: $(".work1:checked").val(), wrkQ2: $(".work2:checked").val(), wrkQ3: $(".work3:checked").val(), wrkQ4: $(".work4:checked").val(),
        wrkQ5: $(".work5:checked").val(), wrkQ6: $(".work6:checked").val(), wrkQ7: $(".work7:checked").val(), wrkQ8: $(".work8:checked").val(),
        wrkQ9: $(".work9:checked").val(),
        lifQ1: $(".work1:checked").val(), lifQ2: $(".work2:checked").val(), lifQ3: $(".work3:checked").val(), lifQ4: $(".work4:checked").val(),
        lifQ5: $(".work5:checked").val(), lifQ6: $(".work6:checked").val(), lifQ7: $(".work7:checked").val(), lifQ8: $(".work8:checked").val(),
        lifQ9: $(".work9:checked").val(),
        currExercise: localStorage.getItem("currExercise"),
        currLife: localStorage.getItem("currLife"),
        currWork: localStorage.getItem("currWork")
    }

    
    //CREATE PUT METHOD TO UPDATE USER'S POINTS AT THIS URL 
    console.log(wkInput);
    console.log('currUser is: ', localStorage.getItem("currAuth"));
    var currAuth = localStorage.getItem("currAuth")
    $.ajax("/api/users/" + currAuth, {
        type: "PUT",
        data: wkInput
    }).then((res) => {
        console.log("weekly input sent to server");

        console.log(res);

        window.location = '/reports/' + currAuth;
    })
});

///grab data from user to display for user report page


var w = window.innerWidth;
var h = window.innerHeight;
//Javascript for cool animation on page
var container = document.getElementById('container');
var renderer = new FSS.SVGRenderer();
var scene = new FSS.Scene();
//             colors      secondary     main 
var light = new FSS.Light('#111122', '#7ddc1f');
//                         w     h   #of polygon  angle of polygon
var geometry = new FSS.Plane(1400, 1200, 10, 6);
var material = new FSS.Material('#FFFFFF', '#FFFFFF');
var mesh = new FSS.Mesh(geometry, material);
var now, start = Date.now();
function initialise() {
    scene.add(mesh);
    scene.add(light);
    container.appendChild(renderer.element);
    window.addEventListener('resize', resize);
}
function resize() {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
}
function animate() {
    now = Date.now() - start;
    light.setPosition(300 * Math.sin(now * 0.001), 200 * Math.cos(now * 0.0005), 60);
    renderer.render(scene);
    requestAnimationFrame(animate);
}
initialise();
resize();
animate();


//chart js javascript
var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Work", "Exercise", "Life"],
        datasets: [{
            label: '# of Votes',
            data: [calcPoints.calcWork, calcPoints.calcEx, calcPoints.calcLife,],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        legend: {
            labels: {
                fontColor: '#fff',
                fontSize: 16
            }
        }
    }
});