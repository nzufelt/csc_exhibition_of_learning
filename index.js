const express = require('express');
var app = express();

// import middleware for parsing excel files 
const middleware = require('./middleware');

// set path
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// import packages for parsing json POST requests
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ejs = require("ejs");
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

// import packages for authentication
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

// import packages for excel uploading
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage });

//ensuring that all sensitive information is not accessible in a non-proudction environment
if (process.env.NODE_ENV !== 'production'){
    //dotenv is a module that loads environment variables from an .env file
    require('dotenv').config()
}
const handler = require('./handler/handler');

// multer is the npm package responsible for taking files from the user
// const multer = require("multer");
// assigns the upload location for files to memory for the purposes of security
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

app.use(express.urlencoded({extended: false}))
//initializing passport and adding its middleware
app.use(passport.initialize())

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    //asking if we should resave our session variables if nothing has changed
    resave: false,
    //asking if we want to save an empty value in the session if there is no value
    saveUninitialized: false,
    cookie: { secure: false }
 }))

//manages session data
app.use(passport.session())

// include all routes from router_index file
const router = require("./routes/route_index.js");
app.use(router);

//the api call for uploading files ------------- remove?
app.post("/api/upload", upload.single('file'), async (req, res) => {
    //calls the handler function, which parses the uploaded file and returns a json or -99 as an error
    
    EoLs = await handler.parseData(req.file.buffer);
    

    //checks for an error in parsing the file 
    if (EoLs != -99) {
        await middleware.transferEoLsToDatabase(EoLs);

        // don't redirect but maybe display something like a "everything submitted" popup?
        res.send(EoLs);
    } else {
        console.log("uploading did not work");
    }
})

app.listen(process.env.PORT || 3000, () => console.log('server listening'));
