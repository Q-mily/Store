const multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, 'public/assets/uploads');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname)
    }
});
var upload=multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        console.log(file);
        if (file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpeg" ){
            cb(null, true);
        }
        else
        {
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("productImage");
module.exports = upload;