const express = require('express');
const exhibitionController = require("./controller/exhibition_table_queries");

var app = express();

const path = require("path")
app.use(express.static(path.join(__dirname, "public")))

const ejs = require("ejs");
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')) 

// add paths from the router file
const router = require("./routes/route_index.js");
app.use(router);

// respond to requests for the main page
app.get('/', async function(req, res){
  // get JSON data, send that data to home page
   exhibitions = await exhibitionController.getExhibitionsHomePageJSON();
   //console.log(exhibitions)
   res.render("home", 
      {exhibitions
      })
});

app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //Handles JSON requests
app.use(bodyParser.urlencoded({ extended: false })); //Handles normal post requests


// ACTUALLY redirect directly through ejs file 
// ------------
// app.post('/searchResults', async (req, res)=>{
//   console.log("POST HAPPENED!");
// 	console.log(req.body);
// 	res.send(req.body);

//     // turn body into usable url string

//   // res.status(301).redirect("HERE GOES THE URL STRING");
// });
//

// EXAMPLE URL FOR TESTING: /search?students=[101,102]&teachers=[103,104]&skills=[1,2]&courses=[10001,10002]&year=[2022,2023]&term=[1,2,3]&level=["Advanced"]
app.get('/search', async (req, res)=>{
  var course_level = "[]"
  if (typeof req.query.level !== 'undefined') {
    course_level = req.query.level.replaceAll("%22", '"')
  }

  var search_parameters = {
    user_id : JSON.parse(req.query.students || "[]"),
    admin_id : JSON.parse(req.query.teachers || "[]"),
    skill_id : JSON.parse(req.query.skills || "[]"),
    course_id : JSON.parse(req.query.courses || "[]"),
    academic_year : JSON.parse(req.query.year || "[]"),
    term : JSON.parse(req.query.term || "[]"),
    course_level : JSON.parse(course_level), // MAY HAVE TO REPLACE THIS IN THE FUTURE
  };

  exhibitions = await exhibitionController.getExhibitionsSearchResults(search_parameters);

  //res.send(search_parameters)
  //res.send(exhibitions)
  res.render("search-results", 
       {exhibitions
       }) // also send: is this a student is sending this to colleges page or not? --> in which case send bio
  //     // if not user page, send all other bios (for skills, courses, etc)
  //     // THIS IS ASSUMING NO PRESENTABLE MODE, SEARCH RESULTS JUST IS PRESENTABLE MODE
});

// app.get("/search", function (req, res) {
//    res.render("search");
//  });
 
app.get("/cs_at_andover", function (req, res) {
   res.render("csAtAndover");
 });
 
 app.get("/about_us", function (req, res) {
   res.render("about");
 });
 
 app.get("/admin-login", function (req, res) {
   res.render("admin-login");
 });
 
 app.get("/admin-home", function (req, res) {
   res.render("admin-home");
 });

// IN PROGRESS: Uploading, parsing, and saving excel files -----------

// a lot of this will go into middleware!

//const multer = require('multer');
//const xlsx = require('xlsx');
//const upload = multer({ dest: 'uploads/' });

// // uploading excel files template code
// app.post('/upload', upload.single('file'), async (req, res) => {
//     const workbook = xlsx.readFile(req.file.path);
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

//     try {
//         for (const item of data) {
//             await connection.query(
//                 // logic goes here!

//                 // EXAMPLE CODE -----
//                 // `INSERT INTO excel_data (task, subtask, uom_labour, labour_quantity, labour_total, uom_material, material_quantity, material_total, complete, value)
//                 // VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//                 // [
//                 //     item.Task,
//                 //     item.Subtask,
//                 //     item['UoM Labour'],
//                 //     item['Labour Quantity'],
//                 //     item['Labour Total'],
//                 //     item['UoM Material'],
//                 //     item['Material Quantity'],
//                 //     item['Material Total'],
//                 //     item.Complete,
//                 //     item.Value,
//                 // ]
//                 // -------------
//             );
//         }
//     } catch (err) {
//         console.error('Error inserting data:', err);
//         res.status(500).json({ error: 'Error inserting data into the database.' });
//     } 
// });
// ------------------------

app.listen(process.env.PORT || 3000, () => console.log('server listening'));
