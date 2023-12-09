
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const { url } = require('inspector');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT
const route = require('./routes')
const db = require('./config/db')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')

app.use(cookieParser())

const Handlebars = require('handlebars');

// To render specific data when use database that return array include objs => {{with ...}}
Handlebars.registerHelper('index', function (array, index) {
  return array[index];
});

console.log(path.join(__dirname,'resources/views'));

// override with POST having ?_method=DELETE or PUT
app.use(methodOverride('_method'))

//Connect to DB
db.connect();



// logger GET
// app.use(morgan('combined'));

//use middleware to get bodytable of POST via XMLHttpRequest , fetch ,axios
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//MiddleWare
// app.use(Guard)
// function Guard(req,res,next){
//   if(['user','admin'].includes(req.query.ve)){
//     req.face = 'Yes'
//     return next();
//   }
//   res.status(403).json({
//     message : ' Access Denied ' ,
//   })

// }

// handlebars (template engine)
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a,b) => a+b ,
    checkSale : value => value ? value + '$' : 'free', 
  }
}))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Run API public folder
app.use(express.static(path.join(__dirname, 'public')))


//Route innit
route(app);
// app.get('/', (req, res) => {
//   res.render('home');
// })

app.listen(PORT, () => {
  console.log(` App listening on port http://localhost:${PORT}`);
})

