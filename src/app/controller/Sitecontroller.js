const Course = require('../models/Course');
const {mutipleMongooesToObject} = require('../../util/sovlehbs')
// const a = require('../../util/sovlehbs')
const User = require('../models/User')
const {mongooesToObject} = require('../../util/sovlehbs')



// [GET] /
class Sitecontroller {
    // [GET] /(home)
    index(req, res , next) {
        Course.find({})
            .then(Course=>{
                // Course = Course.map(e => e.toObject())
                res.render('home',{Course : mutipleMongooesToObject(Course)});

            } )
            // .then(courses => res.json(courses))
            .catch(next);

        // res.render('home');
    }
    //[GET] /search
    showSearch(req,res){
        res.render('search');
    }
    //[GET] /signin
    showSignIn(req,res){
        res.render('signin');
    }
    //[POST] /login
    Login(req,res,next){
        // req.headers['authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDc0NTZmNzk1NTM4ODdiOTkyYjY4YmQiLCJpYXQiOjE2ODUzNTY4NDcsImV4cCI6MTcxNjkxNDQ0N30.7hMtpzgkjWWRrrsV-jIRl6mtgbAvxLZ_UeYDa6S4E8w'
        res.redirect('/')
    }
    


    //[POST] /create-user
    create_User(req,res,next){

        const user = new User(req.body);
        user.save()
            .then(()=>{ res.redirect('/') })
            .catch((err)=> res.send('error'))

        // res.json({user})

    }
    


    //[GET] /signup
    showSignUp(req,res,next){
        res.render('signup')
    }

    
}

module.exports = new Sitecontroller();