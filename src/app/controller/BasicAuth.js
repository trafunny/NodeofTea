
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {mongooesToObject} = require('../../util/sovlehbs')
const {signAccessToken , signRefreshToken} = require('../../config/jwt/jwt_services')

//CHECK username have exist ?
const checkExUserName =  async (req, res, next) => {
    try {
        const { name, password } = req.body;
        // Check valid of account
        const user = await User.findOne({name})
        if(user){
            res.send(`username ${name} has already !!! Click <a href = "/signup"> here</a> to signup again`)

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
        res.send('Re-password no match to password ! Please <a href ="/signup"> enter again </a> ')
    }

    
}

// CHECK valid of Account and create accessToken
const checkValidAcc = async (req, res, next) => {
    
    try {
        console.log(req.body)
        const {name, password } = req.body;
        const user = await User.findOne({name})
        if(!user){
            res.send('Let is sign up !! <a href = "/signup">here</a> to register .')
        }
        
        
        const isValid =await user.isCheckPassword(password)
        if(!isValid){
            res.send(' Wrong Password !!! <a href="/signin"> here </a> to log in again . ')

        }
        // create AccessToken
        const accessToken = await signAccessToken(user._id)
        res.cookie('token',accessToken)
        // const refeshToken = await signRefreshToken(user._id)
        // req.headers['authorization'] = `Bearer ${accessToken}`
        // req.headers['authorization'] = 'Bearer' + accessToken
        // res.json({accessToken})
        // localStorage.setItem('foo',accessToken2)
        return next()
        

        }  
    catch (error) {
        next(error)
    }

} 



module.exports = {
    checkRePassWord,
    checkExUserName,
    checkValidAcc
}