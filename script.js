const NS = "http://www.w3.org/2000/svg";
const marksHolder = clock_area.querySelector(".marks"),
    ticksHolder = clock_area.querySelector(".ticks");
// Render ticks
for (let i = 0; i < 60; i++) {
    var obj;
    if (i % 5 == 0) {
        obj = document.createElementNS(NS, "line");
        obj.setAttribute("x1", 50);
        obj.setAttribute("y1", 4);
        obj.setAttribute("x2", 50);
        obj.setAttribute("y2", 7.5);
        obj.setAttribute("stroke", "black");
        obj.setAttribute("stroke-width", 0.5);
    } else {
        obj = document.createElementNS(NS, "circle");
        obj.setAttribute("cx", 50);
        obj.setAttribute("cy", 5.5);
        obj.setAttribute("r", 0.4);
        obj.setAttribute("fill", "black");
    }
    obj.setAttribute("transform", `rotate(${i * 6},50,50)`);
    ticksHolder.appendChild(obj);
}
// Render marks
const textY = 12;
for (let i = 1; i <= 12; i++) {
    const angle = i * 30;
    var text = document.createElementNS(NS, "text");
    text.setAttribute("x", 50);
    text.setAttribute("y", textY);
    text.setAttribute("transform", `rotate(${angle},50,50) rotate(${-angle},50,${textY})`);
    text.setAttribute("font-size", 7);
    text.innerHTML = i;
    marksHolder.appendChild(text);
}

const prevAngle = { h: 0, m: 0, s: 0 };
function setTime() {
    // Get the current time
    var time = new Date();
    var hr = time.getHours(),
        min = time.getMinutes(),
        sec = time.getSeconds();
    if (hr > 12) hr -= 12;

    // Convert the time into angles
    var angle = hr * 30 + min / 2; // Ignoring angle due to seconds
    rotate(hour_hand, prevAngle.h, angle);
    prevAngle.h = angle;
    angle = min * 6 + sec / 10;
    rotate(minute_hand, prevAngle.m, angle);
    prevAngle.m = angle;
    angle = sec * 6;
    rotate(second_hand, prevAngle.s, angle);
    prevAngle.s = angle;
}
function rotate(hand, prev, current) {
    if (current < prev) current = 360 + current; //To handle transition in circle restart
    const duration = current - prev > 30 ? 0 : 200; // Do not animate in case of large angle gap
    hand.animate({ transform: [`rotate(${prev}deg)`, `rotate(${current}deg)`] }, { fill: "forwards", duration });
}
setTime();
setInterval(setTime, 1000);
