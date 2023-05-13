const path = require('path');
const express = require('express');
const morgan = require('morgan');
const hanadlebars = require('express-handlebars');
const app = express();
const port = 3000;
;
console.log(path.join(__dirname,'resources/views'));
 // logger GET
app.use(morgan('combined'));

// hanadlebars (template engine)
app.engine('hbs',hanadlebars.engine({extname: '.hbs'}))
app.set('view engine','hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.use(express.static(path.join(__dirname,'public')))
app.get('/', (req, res) => {
  res.render('home');
})
app.get('/news', (req,res)=>{
  res.render('new')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})