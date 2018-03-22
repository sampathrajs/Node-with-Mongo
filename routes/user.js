module.exports=function(express, mongoose){
    var router = express.Router();
    var user = require('../models/user');
    var token = require("../services/token");

    var userRoute = {
        login:(req,res)=>{
            try{
                if(req.body.username && req.body.password){
                    user.find({"userName":req.body.username,"password":req.body.password},'userName emailID phone isactive isadmin')
                    .exec((err,list)=>{
                        if(list.length>0){
                            var loggeduser = list[0];
                            token.save(loggeduser)
                            .then((generatedtoken)=>{
                                res.send({"status":"authenticated","user":loggeduser,"token":generatedtoken.token});
                            },err=>{
                                res.status(500).send({"status":"error","msg":"server unavailable"});
                            })
                        }
                        else{
                            res.status(404).send({"status":"invalid","msg":"invalid username or password"})
                        }
                    })
                }
                else{
                    res.status(404).send({"status":"invalid","msg":"invalid parameters"})
                }
            }catch(err){
                res.status(500).send({"status":"error","msg":"server unavailable"});
            }
            
        }
    };

    router.post('/login',userRoute.login);
    return router;
}