

// [GET] /
class Sitecontroller {
    // [GET] /(home)
    index(req, res) {

        res.render('home');
    }
    //[GET] /search
    showSearch(req,res){
        res.render('search');
    }
    //[GET] /signin
    showSignIn(req,res){
        res.render('signin');
    }
    
}

module.exports = new Sitecontroller();