const express = require('express') ;
const route = express.Router() ;


const coursecontroller = require('../app/controller/Coursecontroller');

route.get('/:slug',coursecontroller.showCourse)



module.exports = route ; 
