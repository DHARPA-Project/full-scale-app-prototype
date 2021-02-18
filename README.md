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

color ideas:
rgb(75, 108, 183)upload
rgb(24, 40, 72)

check for requiredPrecursor

REPL module
another workflow as input

Click on input and other module cards to open settings and details in a modal

handle exception when input type changes and no longer matches next workflow operation
handle exception when removing module and remaining adjacent modules not compatible

communicate estimated processing time

Ring the notification bell to inform the user about the completion
Transform the workflow bar into a small progress bar and move it to the top bar, where it will remain as an updating progress bar

Make help icon pulse on Upload page; add "got it" button to modal that will disable pulse animation
Replace old notofication colors with new accent colors
Scrollable table for uploaded files

Make data processing page notify the user if no file batches available for processing and prompt the user to go to the upload page first

Add NLP text pre-processing functionality
Retrieve preview & output if available on batch details page; use POST or PUT to update file batch info
Visualize file content (e.g. text, csv)
Make file batch or individual files as well as processing output downloadable
Add filter by type (text, csv, img) on file management page
Add search box on file management page to enable searching by batch title, file name, or tag
Add sorting to file batch table

Create Intro page with info cards about various workflows

Prompt for confirmation (modal) when deleting file batch
Prevent modal from closing on body click; keep closing functionality only on overlay click
Add artificial delay in server response when submitting processing options, and show spinner on submit button

convert notification container to portal
animate file list items when entering and exiting

Improve form styling & validation
Proper form validation (sign up, sign in)
Custom input element
Custom select element

When loading app, check if token in local storage is valid

add search bar

remove Semantic UI imports
remove outdated Topic Modelling components based on Semantic UI
remove HelpIcon.jsx & HelpIcon.css

Pause notification timeout while notification hovered
Make component style reusable by giving each one its own independent variables

Change main color
Create header
Make entire toastie clickable
Animate toastie on exit with framer motion

Add notifications for all possible server errors

Add confirmation pop-ups, e.g. for file removal

Show warning sign next to "HTML tag removal" option if tags found in text but option disabled

Display filtered list of uploaded files and use select field in table header: all / valid / invalid

Make the table displaying the uploaded file list scrollable

When hovering over operations, wrap in a dark overlay and show a "more info" button

Extract time stamps from file names

File upload progress bar

Improve text processing operations (e.g. remove numbers/digits, remove punctuation)
