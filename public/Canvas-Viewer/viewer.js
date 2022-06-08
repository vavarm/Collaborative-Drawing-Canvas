// create class named IndexedCanva which contains two arguments: int index and Canva cv
// on receiving mouse event from ws connection: draw on the targeted canvas
// on init, get the array of the datas registered by the server and draw all previous lines

class IndexedCanvas {
    static indexedCanvases = [];
    index;
    canvas;

    constructor(index, canvas) {
        this.index = index;
        this.canvas = canvas;
    }
}

// Start the socket connection
var socket = io.connect("http://localhost:3000", { transports: ["websocket"] });

// Callback function (called by the server on client connection)
socket.on("mouse-init", (dataArray) => {
    IndexedCanvas.indexedCanvases.forEach((icv) => {
        var dataList = dataArray[icv.index - 1]; // get the correct indexed array (by the canvas id)
        dataList.forEach((data) => {
            // draw lines for each data in the timeline
            icv.canvas.stroke(data.color);
            icv.canvas.strokeWeight(data.strokeWidth);
            icv.canvas.line(data.x, data.y, data.px, data.py);
        });
    });
});

// Callback function (called by the server when another client draws)
socket.on("mouse", (data) => {
    console.log("event: mouse, id: " + data.id);
    IndexedCanvas.indexedCanvases.forEach((icv) => {
        if (data.id == icv.index) {
            icv.canvas.stroke(data.color);
            icv.canvas.strokeWeight(data.strokeWidth);
            icv.canvas.line(data.x, data.y, data.px, data.py);
        }
    });
});

for (let i = 1; i <= 4; i++) {
    var icv = new p5(function(p5) {
        p5.setup = function() {
            canvas = p5.createCanvas(400, 400);
            p5.background(255, 255, 255);
            canvas.parent("canvas-grid");
            canvas.id("Canvas-" + i);
            canvas.addClass("Canvas-" + i);
        };
    });

    IndexedCanvas.indexedCanvases.push(new IndexedCanvas(i, icv));
}

function DownloadImage() {
    domtoimage
        .toJpeg(document.getElementById("canvas-grid"))
        .then(function(dataUrl) {
            var link = document.createElement("a");
            link.download = "Canvas.jpeg";
            link.href = dataUrl;
            link.click();
        });
}

// TODO function to put borders for each canvases to separate them (css: grid gap)