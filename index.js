const express = require('express');
var app = express();

const middleware = require('./middleware');

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ejs = require("ejs");
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const handler = require('./handler/handler');

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.urlencoded({extended: false}))
//initializing passport and adding its middleware
app.use(passport.initialize())

const router = require("./routes/route_index.js");
app.use(router);

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    //asking if we should resave our session variables if nothing has changed
    resave: false,
    //asking if we want to save an empty value in the session if there is no value
    saveUninitialized: false
 }))

//manages session data
app.use(passport.session())

// transfer this all to route_index later!!


app.post("/api/upload", upload.single('file'), async (req, res) => {
    EoLs = await handler.parseData(req.file.buffer);

    if (EoLs != -99) {
        await middleware.transferEoLsToDatabase(EoLs);

        // don't redirect but maybe display something like a "everything submitted" popup?
        res.send(EoLs);
    } else {
        console.log("uploading did not work");
    }
    console.log(EoLs);
})

app.listen(process.env.PORT || 3000, () => console.log('server listening'));
