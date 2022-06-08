// on init, get the array of the datas registered by the server and draw all previous lines
var id = null;
let socket;
let color = "#000";
let strokeWidth = 4;
let cv;

function getId() {
    const queryString = window.location.search.slice(1);
    if (!isNaN(queryString) && queryString > 0) {
        id = queryString;
    }
}

// Sending data to the socket
function sendmouse(x, y, pX, pY) {
    const data = {
        id: id,
        x: x,
        y: y,
        px: pX,
        py: pY,
        color: color,
        strokeWidth: strokeWidth,
    };

    socket.emit("mouse", data);
}

function mouseDragged() {
    // Draw
    stroke(color);
    strokeWeight(strokeWidth);
    line(mouseX, mouseY, pmouseX, pmouseY);

    // Send the mouse coordinates
    sendmouse(mouseX, mouseY, pmouseX, pmouseY);
}

function centerCanvas() {
    const x = (windowWidth - width) / 2;
    const y = (windowHeight - height) / 2;
    cv.position(x, y);
}

function setup() {
    getId();

    // Creating canvas
    cv = createCanvas(400, 400); //create canvas with a fixed size
    centerCanvas(); // refer to the function
    cv.background(255, 255, 255); //add a color background in rgb

    // Start the socket connection
    socket = io.connect("http://localhost:3000", { transports: ["websocket"] });

    // Callback function (called by the server on client connection)
    socket.on("mouse-init", (dataArray) => {
        var dataList = dataArray[id - 1]; // get the correct indexed array (by the canvas id)
        dataList.forEach((data) => {
            // draw lines for each data in the timeline
            stroke(data.color);
            strokeWeight(data.strokeWidth);
            line(data.x, data.y, data.px, data.py);
        });
    });

    // Callback function (called by the server when another client draws)
    socket.on("mouse", (data) => {
        if (data.id == id) {
            stroke(data.color);
            strokeWeight(data.strokeWidth);
            line(data.x, data.y, data.px, data.py);
        }
    });

    // Getting our buttons and the holder through the p5.js dom
    const color_picker = select("#pickcolor");
    const color_btn = select("#color-btn");
    const color_holder = select("#color-holder");

    const stroke_width_picker = select("#stroke-width-picker");
    const stroke_btn = select("#stroke-btn");

    // Adding a mousePressed listener to the button
    color_btn.mousePressed(() => {
        // Checking if the input is a valid hex color
        if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color_picker.value())) {
            color = color_picker.value();
            color_holder.style("background-color", color);
        } else {
            console.log("Enter a valid hex value");
        }
    });

    // Adding a mousePressed listener to the button
    stroke_btn.mousePressed(() => {
        const width = parseInt(stroke_width_picker.value());
        if (width > 0) strokeWidth = width;
    });
}