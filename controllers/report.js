class reportController{
    index(req,res){
        res.render('report/report');
    }
}
module.exports = new reportController;