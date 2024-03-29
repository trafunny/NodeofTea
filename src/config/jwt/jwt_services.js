const JWT = require('jsonwebtoken')
require('dotenv').config()
User = require('../../app/models/User') 
const createErr = require('http-errors')
const {mongooesToObject} = require('../../util/sovlehbs')

const signAccessToken = async (userID) =>{
    return new Promise ((resovle, reject)=>{
         const payload = {
            userID ,
            name : 'tra'  
         }
         const secret = 'e32fe50230ee618a2b8c4fd19d9d0093efbe69b5bf171a720836ede592690a5b' 
         const options ={
            expiresIn : '30m'  // 10m 10s  
         }
         JWT.sign(payload,secret,options,(err, token)=>{
            if(err) reject(err) ;
            resovle(token) 

         })
    })
}

const verifyAccessToken = (req,res, next) =>{
    // res.send(req.cookies.token)
    if(!req.cookies.token){
        // return next(createErr.Unauthorized())
        res.send('You need <a href="/signin">login</a> to access !    ')
    }
    // const authHeader = req.headers['authorization']
    // const bearerToken = authHeader.split(' ')
    const token = req.cookies.token
    // console.log(token)
    //start authen Token 
    JWT.verify(token, 'e32fe50230ee618a2b8c4fd19d9d0093efbe69b5bf171a720836ede592690a5b' , (err,payload )=>{
        if(err) {
            if(err.name === 'JsonWebTokenError'){
                res.send('Sai Mk')
                return next(createErr.Unauthorized())
            }
            // return next(createErr.Unauthorized(err.message))
            res.clearCookie('token')
            res.send('JWT expired ! <a href = "/signin"> Login again </a> , pls !!!!')

        } 
        req.payload = payload 
        
        next()
    })
}

const signRefreshToken = async (userID) =>{
    return new Promise ((resovle, reject)=>{
         const payload = {
            userID  
         }
         const secret = process.env.REFRESH_TOKEN_SECRET  
         const options ={
            expiresIn : '1y'  // 10m 10s  
         }
         JWT.sign(payload,secret,options,(err, token)=>{
            if(err) reject(err) ;
            resovle(token) 

         })
    })
}

const checkRole = (req,res,next)=>{
    // console.log(req.payload)
    userID = req.payload.userID
    console.log(userID)

    User.findOne({_id: userID})
        .then((user)=>{
            req.data = user
        })
        .then(()=>{
            if(req.data.role === 'admin'){
                
            }else{
                res.send('You do not permisson ! Go <a href = "javascript:history.back()">back </a>')
            }
        })
        .catch(next())

    // next()

    
}
module.exports =  {signAccessToken, verifyAccessToken , signRefreshToken,checkRole} 