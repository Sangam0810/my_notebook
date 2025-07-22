
const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination:function(req, file,cb){
        cb(null, 'public')
    },
      filename:function(req,file,cb){
        console.log(file)
        let ext = path.extname(file.originalname);
        let filen = file.fieldname + Date.now() + ext;
        cb(null, filen)
    }

})

const upload = multer({storage:storage});
module.exports = upload;
