module.exports=function(express, mongoose){
    var route = express.Router();
    var jobRoute = {
        create:(req,res)=>{
            var job = require('../models/job');
            try{
                var jobdata = req.body;
                jobdata.posted_on = new Date();
                var newjob = new job(jobdata);
                newjob.save((err,savedjob)=>{
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
        },
        fetch:(req,res)=>{
            var job = require('../models/job');
            var moment = require('moment');
            var query = {};
            var options = {
                page:1,
                limit:5,
                populate:[
                    { path: 'category', select: 'name'}, 
                    { path: 'company', select: 'name'}, 
                    { path: 'designation', select: 'name'}, 
                    { path: 'emp_type', select: 'name'}, 
                    { path: 'exp_level', select: 'name'}, 
                    { path: 'location', select: 'name'},
                    { path: 'employment.type', select: 'name'},
                    { path: 'experience.level', select: 'name'}
                ]
            };

            try{
                if(req.query.page){
                    options.page = parseInt(req.query.page);
                }
    
                if(req.query.docsperpage){
                    options.limit = parseInt(req.query.docsperpage);
                }

                if(req.query.category){
                    query.category =  {$in: req.query.category.split(',').map((o)=>{return mongoose.Types.ObjectId(o)})}
                }

                if(req.query.company){
                    query.company =  {$in: req.query.company.split(',').map((o)=>{return mongoose.Types.ObjectId(o)})}
                }


                if(req.query.location){
                    query.location =  {
                        "$in": req.query.location.split(',').map((o)=>{return mongoose.Types.ObjectId(o)})
                    }
                }

                if(req.query.emp_type){
                    query["employment.type"] = {$in: req.query.emp_type.split(',').map((o)=>{return mongoose.Types.ObjectId(o)})};
                }

                if(req.query.exp_level){
                    query["experience.level"] = {$in: req.query.exp_level.split(',').map((o)=>{return mongoose.Types.ObjectId(o)})};
                }

                if(req.query.salary){
                   query["salary.max"] = {$gte:req.query.salary} ;
                }

                if(req.query.posteddate){
                    var today = moment().startOf('day')
                    var tomorrow = moment(today).add(1, 'days');
                    var seven_days_back =  moment(today).subtract(6,'days'); // Offset today include
                    var thirty_days_back =  moment(today).subtract(29,'days'); // Offset today include
                    

                    if(req.query.posteddate == '30days'){
                        query.posted_on = {
                            $gte:thirty_days_back.toDate(),
                            $lt:tomorrow.toDate()
                        }
                    }
                    else if(req.query.posteddate == '7days'){
                        query.posted_on = {
                            $gte:seven_days_back.toDate(),
                            $lt:tomorrow.toDate()
                        }
                    }
                    else if(req.query.posteddate == 'today'){
                        query.posted_on = {
                            $gte: today.toDate(),
                            $lt: tomorrow.toDate()
                        }
                    }   
                }

                console.log(JSON.stringify(query));

                job.paginate(query,options).then((jobs)=>{
                    res.send({"status":"success","jobs":jobs});
                },err=>{
                    console.log(err);
                    res.status(404).send({"status":"error","msg":"server unavailable"});
                });
            }
            catch(err){
                res.status(404).send({"status":"error","msg":"server unavailable"});
            }
        },
        fliter:(req,res)=>{
            var category = require('../models/category');
            var company = require('../models/company');
            var designation = require('../models/designation');
            var emptype = require('../models/emp_type');
            var explevel = require('../models/exp_level');
            var location = require('../models/location');

            var Q = require('q');

            try{
                var getcategory = category.find({}).exec();
                var getcompany = company.find({}).exec();
                var getdesignation = designation.find({}).exec();
                var getemptype = emptype.find({}).exec();
                var getexplevel = explevel.find({}).exec();
                var getlocation = location.find({}).exec();

                Q.all([getcategory,getcompany,getdesignation,getemptype,getexplevel,getlocation]).then((result)=>{
                    res.send({
                        "status":"success",
                        "category":result[0],
                        "company":result[1],
                        "designation":result[2],
                        "employment_type":result[3],
                        "experience_level":result[4],
                        "location":result[5],
                    })
                },err=>{
                    res.status(404).send({"status":"error","msg":"server unavailable"})
                });
            }
            catch(err){ 
                res.status(404).send({"status":"error","msg":"server unavailable"})
            }
        },
        createlocation:(req,res)=>{
            try{
                var location = require('../models/location');
                if(req.body.name){
                    location.update({name: req.body.name}, {
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
        fetchlocation:(req,res)=>{
            try{
                var location = require('../models/location');
                var options = {};
                location.find(options,'name').exec((err,locations)=>{
                    if(!err){
                        res.send({"status":"success","locations":locations});
                    }
                    else{
                        res.status(404).send({"status":"error"});
                    }
                }) 
            }catch(err){
                res.status(404).send({"status":"error"});
            }
        }
      
    };

    route.post('/create',jobRoute.create);
    route.get('/',jobRoute.fetch);
    route.get('/filter',jobRoute.fliter);
    route.post('/location/create',jobRoute.createlocation);
    route.get('/location',jobRoute.fetchlocation);
    return route;
}