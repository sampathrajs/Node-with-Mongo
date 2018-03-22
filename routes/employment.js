module.exports = function(express, mongoose){
    var route = express.Router();
    var employmentRoute = {
        createtype:(req,res)=>{
            try{
                var emp_type = require('../models/emp_type');
                if(req.body.name){
                    emp_type.update({name: req.body.name}, {
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
        fetchtype:(req,res)=>{
            try{
                var emp_type = require('../models/emp_type');
                var options = {};
                emp_type.find(options,'name').exec((err,emp_types)=>{
                    if(!err){
                        res.send({"status":"success","emp_types":emp_types});
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

    route.post('/type/create',employmentRoute.createtype);
    route.get('/type',employmentRoute.fetchtype);
    return route;
}