const express = require('express') ;
const route = express.Router() ;


const coursecontroller = require('../app/controller/Coursecontroller');
const {verifyAccessToken ,checkRole} = require('../config/jwt/jwt_services')



route.get('/create',verifyAccessToken,checkRole,coursecontroller.createCourse)
route.post('/store',coursecontroller.storeCourse)
route.get('/:id/edit',coursecontroller.editCourse)
route.put('/:id',coursecontroller.updateCourse)
route.delete('/:id',coursecontroller.destroyCourse)
route.get('/:slug',coursecontroller.showCourse)



module.exports = route ; 
