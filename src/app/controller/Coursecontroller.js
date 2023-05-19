const Course = require('../models/Course');
const {mongooesToObject} = require('../../util/sovlehbs')



class Coursecontroller {
    
    //[GET] /Course/:slug
    showCourse(req,res,next){
        // res.send('Course Detail !!!' + req.params.slug);
        

        Course.findOne({slug: req.params.slug})
            .then(course =>{
                res.render('courses/show',{course: mongooesToObject(course)})
            })
            .catch(next);
    
    
    
    }
}

module.exports = new Coursecontroller();