
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const verifyUser = (req, res, next)=>{
   // console.log(req.body)                                                     //jb hm log update aur delelte la use krege tb hm log isse  comment kr dege
    console.log(req.header("auth-token"))
    const isVerify = jwt.verify(req.header("auth-token"),secretKey)               // payload reture krega
    console.log(isVerify)
    if(!isVerify){
        return res.status(401).send({
            success:false,
            message:"unauthorized user"
        })
    }
    req.user = isVerify.id
    next();                                 //agr next ko call nhi krege toh alga wala middleware kaam nhi krega
}

module.exports = verifyUser