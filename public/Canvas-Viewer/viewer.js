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

for (let i = 1; i <= 4; i++) {
    var icv = new p5(function(p5) {
        p5.setup = function() {
            canvas = p5.createCanvas(400, 400);
            canvas.parent("canvas-grid");
            canvas.id("Canvas-" + i);
            canvas.addClass("Canvas-" + i);
        };

        p5.draw = function() {
            p5.background(255, 255, 255);
            p5.strokeWeight(20 * i);
            p5.line(50, 0, 50, 100);
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

// function to put borders for each canvases to separate them (css: grid gap)