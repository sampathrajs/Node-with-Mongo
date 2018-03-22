module.exports = function(config){
    var mongo = require('mongoose');
    try{
        if(config.db.username && config.db.password){
            var connectionURI = `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`;
        }
        else{
            var connectionURI = `mongodb://${config.db.host}:${config.db.port}/${config.db.database}`;
        }
        
        mongo.connect(connectionURI,{}).then(() => 
        { 
            console.log(`Connection URI: ${connectionURI} -  Mongodb connection established`);
        },
        err => 
        { 
            console.error(`Connection URI: ${connectionURI} - Error in mongodb connection`);
            console.error(err);
            /** handle initial connection error */ 
        });
        
        //Mongoose Models
        require('../models/category');
        require('../models/company');
        require('../models/designation');
        require('../models/emp_type');
        require('../models/exp_level');
        require('../models/job');
        require('../models/location');
        require('../models/oauth');
        require('../models/user');
        require('../models/resume');


        return mongo;
    }
    catch(err){
        console.error("Error in mongoose connection");
        return ;
    }
    
}