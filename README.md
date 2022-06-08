# Collaborative-Drawing-Canvas

Draw a beautiful canvas with other people through your web browser.

## Requirements
- Node.js
- A web browser

## Steps
1) Download the requirements and install them
2) Download this repository
3) At the root of the repository, run ```node server.js```
4) That's it ! You can access the software by typing ```http://127.0.0.1:3000/``` in your web browser (if the node server run on the same machine)

## How it works ?
The software is divided into three parts: the ChoiceMenu, the Viewer and the Editor.

---

The first page that you'll encountered is the ChoiceMenu. In this page, you can choose to go to the Viewer page (to see the advacements of the canvas) or you can choose to go to the Editor page (to make you own drawings).

---

#### Viewer Page

In this page, you can see what users are drawing. The canvas is divided into 4 canvases kept up to date by a websocket connection with the server that send drawing datas on initialization and when a user draws.

---

#### Editor Page

Here is where you can draw ! Before, you had to choose an index between 1 and 4 which is the canvas you're going to draw on. In the editor you can choose the color of your pen and the stroke width.
> When you draw the informations are sent to the server to be shared with the other users (on the viewer or editors with the same index)

## TODO
- borders choice entry in the viewer to separate or not the differnent canvases
- review the style of the different pages
- in this readme file, add the resources that I used as examples and list the different modules used in the program
