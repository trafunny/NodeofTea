const express = require('express') ;
const route = express.Router() ;


const coursecontroller = require('../app/controller/Coursecontroller');

route.get('/create',coursecontroller.createCourse)
route.post('/store',coursecontroller.storeCourse)
route.get('/edit',coursecontroller.editCourse)
route.get('/:slug',coursecontroller.showCourse)



module.exports = route ; 
