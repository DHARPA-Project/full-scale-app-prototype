# Topic Modelling Prototype

This is the prototype of the topic modelling workflow for the DHARPA project.

## Installation

The NPM package manager is required to install all the project dependencies.

1. First clone the repository by running the following CLI command:<br>

`git clone https://github.com/DHARPA-Project/topic-modelling-prototype.git`

... or:<br>
`git clone git@github.com:DHARPA-Project/topic-modelling-prototype.git`

2. Move into the directory of the repo:<br>

`cd ./topic-modelling-prototype`

3. Once inside the directory of the repository, install the project dependencies:<br>

`npm i`

4. When all dependencies have been installed, start the app on a local server in development mode by running:<br>

`npm start`

This should open the app in a new browser instance. If it isn't opened automatically, open the following link in a browser:<br>
`http://localhost:3000`
<br>

## To Do:

Change main color
Create header
Make entire toastie clickable
Create custom Container component to replace the SemanticUI one
Animate toastie on exit with framer motion

Add notifications for all possible server errors
Add error-notification pop-up / toastie

Add confirmation pop-ups, e.g. for file removal

Show warning sign next to "HTML tag removal" option if tags found in text but option disabled

Collapse (with animation) file upload area when files are uploaded / conditionally collapse when more than X (e.g. 5 or 10) files have been uploaded

Display filtered list of uploaded files and use select field in table header: all / valid / invalid

Make the table displaying the uploaded file list scrollable

Change drag-and-drop area icon (down-arrow?)

Change color of file-removal buttons on hover to red

When hovering over operations, wrap in a dark overlay and show a "more info" button

Extract time stamps from file names

File upload progress bar

Change the active step title color to the main index.scss color

Proper form validation (sign up, sign in)

Improve text processing operations (e.g. remove numbers/digits, remove punctuation)
