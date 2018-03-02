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
    console.log("register btn works");

    var newRegUser = {
        firstname: $("#firstName").val().trim(),
        lastname: $("#lastName").val().trim(),
        username: $("#userName").val().trim(),
        password: $("#password").val().trim()
    }
    console.log(newRegUser);

    var radioCheck = $('.mar:checked').val();
    console.log("This is the radio button value if it is checked: " + radioCheck);



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