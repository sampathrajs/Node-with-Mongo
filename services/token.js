module.exports = {
    save:(user)=>{
        var oauth = require('../models/oauth');
        const uuidv4 = require('uuid/v4');
        return new Promise((resolve,reject)=>{
            try{
                var newoauth = new oauth({
                    user_id:user._id,
                    token:uuidv4(),
                    created_at:new Date()
                });
                newoauth.save((err,newtoken)=>{
                    if(!err){
                        resolve(newtoken);
                    }
                    else{
                        reject({"status":"error","msg":"error in generate token"});
                    }
                })
            }catch(err){
                reject({"status":"error","msg":"error in generate token"});
            }
            
        })
    },
    validate:(token)=>{
        var oauth = require('../models/oauth');
        return new Promise((resolve,reject)=>{
            try{
                oauth.find({
                    token:token
                }).exec((err,validtoken)=>{
                    if(validtoken.length>0){
                        resolve({"status":"valid","user":validtoken[0]});
                    }
                    else{
                        reject({"status":"invalid"});
                    }
                })
            }catch(err){
                reject({"status":"invalid"});
            }
            
        })
    }
}