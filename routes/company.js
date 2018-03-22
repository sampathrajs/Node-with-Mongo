module.exports = function(express, mongoose){
    var route = express.Router();
    var companyRoute = {
        create:(req,res)=>{
            try{
                var company = require('../models/company');
                if(req.body.name){
                    company.update({name: req.body.name}, {
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
                var company = require('../models/company');
                var options = {};
                company.find(options,'name').exec((err,companies)=>{
                    if(!err){
                        res.send({"status":"success","companies":companies});
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

    route.post('/create',companyRoute.create);
    route.get('/',companyRoute.fetch);
    return route;
}