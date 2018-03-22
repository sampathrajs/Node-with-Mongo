module.exports = function(express, mongoose){
    var route = express.Router();
    var categoryRoute = {
        create:(req,res)=>{
            try{
                var category = require('../models/category');
                if(req.body.name){
                    category.update({name: req.body.name}, {
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
                res.status(404).send({"status":"error","msg":"server unavailable"});
            }
            

        },
        fetch:(req,res)=>{
            try{
                var category = require('../models/category');
                var options = {};
                category.find(options,'name').exec((err,categories)=>{
                    if(!err){
                        res.send({"status":"success","categories":categories});
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

    route.post('/create',categoryRoute.create);
    route.get('/',categoryRoute.fetch);
    return route;
}