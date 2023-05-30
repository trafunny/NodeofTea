const express = require('express');
const router = express.Router();
const {verifyAccessToken} = require('../config/jwt/jwt_services')
const sitecontroller = require('../app/controller/Sitecontroller');

const {checkRePassWord,checkExUserName,
    checkValidAcc } = require('../app/controller/BasicAuth')

router.get('/search', sitecontroller.showSearch);
router.get('/signin',sitecontroller.showSignIn);
router.post('/login',checkValidAcc,sitecontroller.Login)
router.get('/signup',sitecontroller.showSignUp)
router.post('/create-user',checkExUserName,checkRePassWord,sitecontroller.create_User);
router.get('/',verifyAccessToken, sitecontroller.index);

module.exports = router;



