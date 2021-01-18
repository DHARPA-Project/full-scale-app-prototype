# Topic Modelling Prototype

This is the prototype of the topic modelling workflow for the DHARPA project.

## Installation

The NPM package manager is required to install all the project dependencies. NPM is typically installed along with Node.js. Therefore, you need to have the latter installed on your machine to run this project.

This project requires a locally running MongoDB database. Therefore, you need to have MongoDB installed and running to enable the back-end services of this project.

1. First clone the repository by running the following CLI command:<br>

`git clone https://github.com/DHARPA-Project/topic-modelling-prototype.git`

... or:<br>
`git clone git@github.com:DHARPA-Project/topic-modelling-prototype.git`

2. Move into the directory of the repo:<br>

`cd ./topic-modelling-prototype`

3. Once inside the directory of the repository, run the following command to install the back-end dependencies:<br>

`npm i`

4. Then move into the 'client' directory and install all the front-end dependencies, by executing the following commands consecutively:<br>

`cd ./client`
`npm i`

4. When all front-end and back-end dependencies have been installed, start the app on a local server in development mode by running:<br>

`npm run dev`

This will start a local Express/Node server as well as a client server for the React-based front-end. A new browser instance is usually opened. If it isn't opened automatically, then open the following URL in a browser:<br>
`http://localhost:3000`
<br>

You can also run the client-side or the server-side apps independently with the following commands:<br>
`npm run client`
`npm run server`

## To Do:

When loading app, check if token in local storage is valid

Change main color
Create header
Make entire toastie clickable
Create custom Container component to replace the SemanticUI one
Animate toastie on exit with framer motion

Add notifications for all possible server errors

Add confirmation pop-ups, e.g. for file removal

Show warning sign next to "HTML tag removal" option if tags found in text but option disabled

Collapse (with animation) file upload area when files are uploaded / conditionally collapse when more than X (e.g. 5 or 10) files have been uploaded

Display filtered list of uploaded files and use select field in table header: all / valid / invalid

Make the table displaying the uploaded file list scrollable

Change color of file-removal buttons on hover to red

When hovering over operations, wrap in a dark overlay and show a "more info" button

Extract time stamps from file names

File upload progress bar

Change the active step title color to the main index.scss color

Proper form validation (sign up, sign in)

Improve text processing operations (e.g. remove numbers/digits, remove punctuation)
