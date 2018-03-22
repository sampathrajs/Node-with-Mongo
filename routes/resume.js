module.exports = function(express, mongoose){
    var route = express.Router();
    var resume = {
        post:(req,res)=>{
            var Resume = require('../models/resume');
            try{
                var resumedata = req.body;
                resumedata.created_at = new Date();
                var newresume = new Resume(resumedata);

                newresume.save((err,savedjob)=>{
                    if(!err){
                        res.send({"status":"success","msg":"saved successfully"})
                    }else{
                        if(err.name == "ValidationError"){
                            res.status(404).send({"status":"error","type":"ValidationError","msg":err.message})
                        }
                        else{
                            res.status(500).send({"status":"error","type":"unknown","msg":"server unavailable"})
                        }    
                    }
                })
            }catch(err){
                res.status(500).send({"status":"error","type":"unknown","msg":"server unavailable"})
            }
        }
    }
    route.post('/post',resume.post)
    return route;
}