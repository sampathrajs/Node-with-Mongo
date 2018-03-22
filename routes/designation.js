module.exports = function(express, mongoose){
    var route = express.Router();
    var designationRoute = {
        create:(req,res)=>{
            try{
                var designation = require('../models/designation');
                if(req.body.name){
                    designation.update({name: req.body.name}, {
                        name:req.body.name,
                        created_at: new Date()
                    }, {upsert: true}, (err)=> {
                        if(!err){
                            res.send({"status":"success"});
                        }
                        else if(err.name == "ValidationError"){
                            res.status(404).send({"status":"error","msg":err.message});
                        }
                        else{
                            res.status(404).send({"status":"error","msg":"server unavailable"});
                        }
                    });
                }
                else{
                    res.status(404).send({"status":"error","msg":"required field is missing"});
                }
            }
            catch(err){
                res.status(404).send({"status":"error"});
            }
        },
        fetch:(req,res)=>{
            try{
                var designation = require('../models/designation');
                var options = {};
                designation.find(options,'name').exec((err,designations)=>{
                    if(!err){
                        res.send({"status":"success","designations":designations});
                    }
                    else{
                        res.status(404).send({"status":"error"});
                    }
                }) 
            }catch(err){
                res.status(404).send({"status":"error"});
            }
        }
    }

    route.post('/create',designationRoute.create);
    route.get('/',designationRoute.fetch);
    return route;
}