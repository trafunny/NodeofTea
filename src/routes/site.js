const express = require('express');
const router = express.Router();

const sitecontroller = require('../app/controller/Sitecontroller');

router.use('/search', sitecontroller.showSearch);
router.use('/signin',sitecontroller.showSignIn);
router.use('/',sitecontroller.index);

module.exports = router;



