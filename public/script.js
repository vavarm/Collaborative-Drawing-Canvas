// get the parameter of the url and if the parameter match then redirect to Canva-Viewer or Canva-Editor else display the Error Modal

const queryString = window.location.search.slice(1); //the parameters passed in url minus the character "?" (first character of parameters)

switch (queryString) {
    case "":
        break;
    case "0":
        CanvasViewer();
        break;
    default:
        if (isNaN(queryString)) {
            // if the parameter is not a number
            document.getElementById("modal-background").style.display = "block";
        } else {
            // if the parameter is a number
            window.location.href =
                window.location.href.split("/")[0] +
                "/Canvas-Editor/" +
                "?" +
                queryString;
        }
}

function CanvasViewer() {
    window.location.href = window.location.href.split("/")[0] + "/Canvas-Viewer/";
}

function CanvasEditor() {
    var index = document.getElementById("index").value;
    window.location.href =
        window.location.href.split("/")[0] + "/Canvas-Editor/" + "?" + index;
}