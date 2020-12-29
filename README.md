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

On the Data Preparation page, allow the user to select the desired batch of files from the previously uploaded batches

Should the user be shown warnings / tips such as "Your sources contain X HTML tags. Would you like them removed before proceeding further?"

Show warning sign next to "HTML tag removal" option if tags found in text but option disabled

Add confirmation pop-ups, e.g. for file removal

Collapse (with animation) file upload area when files are uploaded / conditionally collapse when more than X (e.g. 5 or 10) files have been uploaded

Display filtered list of uploaded files and use select field in table header: all / valid / invalid

Make the table displaying the uploaded file list scrollable

Change drag-and-drop area icon (down-arrow?)

Change color of file-removal buttons on hover to red
