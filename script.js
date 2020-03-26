for (i = 0; i < 60; i++) {
    var NS = "http://www.w3.org/2000/svg";
    if (i % 5 == 0) {
        var line = document.createElementNS(NS, "line");
        line.setAttribute("x1", 50);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", 50);
        line.setAttribute("y2", 3);
        line.setAttribute("stroke", "black");
        line.setAttribute("stroke-width", 1);
        line.setAttribute("transform", "rotate(" + (i * 6) + ",50,50)");
        document.querySelector("svg").appendChild(line);
    } else {
        var circle = document.createElementNS(NS, "circle");
        circle.setAttribute("cx", 50);
        circle.setAttribute("cy", 2);
        circle.setAttribute("r", 0.5);
        circle.setAttribute("fill", "black");
        circle.setAttribute("transform", "rotate(" + (i * 6) + ",50,50)");
        document.querySelector("svg").appendChild(circle);
    }
}

var h_hand = document.getElementById("hour");
var m_hand = document.getElementById("minute");
var s_hand = document.getElementById("second");

function setTime() {
    //get the current time
    var time = new Date();
    var hr = time.getHours(),
        min = time.getMinutes(),
        sec = time.getSeconds();
    if (hr > 12) {
        hr -= 12;
    }

    //convert the values into angles
    var h_angle = hr * 30 + min * 0.5 + sec / 120;
    var m_angle = min * 6 + 0.1 * sec;
    var s_angle = sec * 6;

    //rotate the hands
    h_hand.setAttribute("transform", "rotate(" + h_angle + ",50,50)");
    m_hand.setAttribute("transform", "rotate(" + m_angle + ",50,50)");
    s_hand.setAttribute("transform", "rotate(" + s_angle + ",50,50)");
}
setTime();
setInterval(setTime, 1000);
