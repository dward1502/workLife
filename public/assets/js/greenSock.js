TweenLite.set("#logo", {
    xPercent: -50,
    yPercent: -50
});

TweenMax.to("#logo", 4, {
    bezier: getBezier(125, 125, 125, 125, true),
    repeat: -1,
    ease: Linear.easeNone
});

function getBezier(cx, cy, rx, ry, autoRotate) {

    ry = ry || rx;

    var k = 0.551915024494;
    var x = k * rx;
    var y = k * ry;

    return {
        autoRotate: autoRotate || false,
        type: "cubic",
        values: [{
                x: cx + rx,
                y: cy
            },
            {
                x: cx + rx,
                y: cy + y
            }, {
                x: cx + x,
                y: cy + ry
            }, {
                x: cx,
                y: cy + ry
            },
            {
                x: cx - x,
                y: cy + ry
            }, {
                x: cx - rx,
                y: cy + y
            }, {
                x: cx - rx,
                y: cy
            },
            {
                x: cx - rx,
                y: cy - y
            }, {
                x: cx - x,
                y: cy - ry
            }, {
                x: cx,
                y: cy - ry
            },
            {
                x: cx + x,
                y: cy - ry
            }, {
                x: cx + rx,
                y: cy - y
            }, {
                x: cx + rx,
                y: cy
            }
        ]
    };
}
