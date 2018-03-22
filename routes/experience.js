module.exports = function(express, mongoose){
    var route = express.Router();
    var experienceRoute = {
        createlevel:(req,res)=>{
            try{
                var exp_level = require('../models/exp_level');
                if(req.body.name){
                    exp_level.update({name: req.body.name}, {
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
        fetchlevel:(req,res)=>{
            try{
                var exp_level = require('../models/exp_level');
                var options = {};
                exp_level.find(options,'name').exec((err,exp_levels)=>{
                    if(!err){
                        res.send({"status":"success","exp_levels":exp_levels});
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

    route.post('/level/create',experienceRoute.createlevel);
    route.get('/level',experienceRoute.fetchlevel);
    return route;
}