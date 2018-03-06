$(document).ready(function () {
    $("#loginModal").hide();
});


$('#login').leanModal({
    top: 100,
    overlay: 0.6,
    closeButton: ".close"
});

$("#loginBtn").on("click", function (event) {
    console.log("login btn works");

    var userLogin = {
        username: $("#username").val().trim(),
        password: $("#password").val().trim()
    };
    console.log(userLogin);


    $.ajax("/login", {
        type: "POST",
        data: userLogin
    }).then(function () {
        console.log("username has been sent to server");
    });

    event.preventDefault();
});

$("#submit").on("click", function (event) {
    event.preventDefault();

    console.log("register btn works");
    var creative = [];
    var social = [];
    var service = [];

    $.each($("input[name='service']:checked"), function () {
        creative.push($(this).val());
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
        creative: creative,
        social: social,
        services: service
    };
    console.log('children:'+$('.kid').val() + 'parents:'+$('.par').val() + 'exercise:'+$('.ex').val() + 'healthy:'+$('.health').val() + 'work:'+$('.wrk').val());
    
    console.log(newRegUser);

    $.ajax("/api/users", {
        type: "POST",
        data: newRegUser
    }).then(res =>{
        console.log("reg information has been sent to server");
        console.log(res);        
    });
});

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
        lifQ9: $(".work9:checked").val()
    }
    console.log(wkInput);
    $.ajax("/api/input", {
        type: "POST",
        data: wkInput
    }).then(res => {
        console.log("weekly input sent to server");

        console.log(res);
    })
});


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