
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {mongooesToObject} = require('../../util/sovlehbs')


//CHECK username have exist ?
const checkExUserName =  async (req, res, next) => {
    
    try {
        
        const { name, password } = req.body;
        // Check valid of account
        const user = await User.findOne({name})
        if(user){
            res.send(`username ${name} has already !!!`)

        }else {
            next()
        }
    }
    catch (error) {
        next(error)
    }
}

//CHECK re-password 
const checkRePassWord = function(req,res,next){
    console.log(req.body)
    // console.log(name,password)
    if(req.body.re_password === req.body.password){
        next()
    }else{
        res.redirect('./signup')
    }

    
}

module.exports = {
    checkRePassWord,
    checkExUserName
}