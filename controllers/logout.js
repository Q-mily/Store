class LogoutController{
    //[GET] /login
    index(req,res,next){
        res.cookie('token','',{maxAge : 1});
        res.redirect('/login');
    };
}
module.exports = new LogoutController();