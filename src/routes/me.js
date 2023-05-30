const express = require('express') ;
const route = express.Router() ;
const {verifyAccessToken} = require('../config/jwt/jwt_services')


const mecontroller = require('../app/controller/Mecontroller');

route.get('/stored-courses',verifyAccessToken,mecontroller.storedCourses)
// route.post('/store',coursecontroller.storeCourse)
// route.get('/edit',coursecontroller.editCourse)
// route.get('/:slug',coursecontroller.showCourse)



module.exports = route ; 
