module.exports = (req,res,next)=>{
    var route = req.url;
    var token = require('../services/token');
    var userToken = req.headers.authorization;

    if(route.indexOf('/api/user/login')>-1){
        next();
    }
    else{
        if(userToken){
            token.validate(userToken)
            .then((status)=>{
                req.headers.user = status.user;
                next();
            },err=>{
                res.status(404).send({"status":"invalid_token","msg":"invalid access token"});
            })
        }
        else{
            res.status(404).send({"status":"invalid_token","msg":"invalid access token"});
        }    
    }
    
}