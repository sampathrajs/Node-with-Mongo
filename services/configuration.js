module.exports = function(){
    if(process.env.ENVIRONMENT){
        var config = require(`../config/config.${process.env.ENVIRONMENT}.js`)
        return config;
    }
    else{
        console.log("SET ENVIRONMENT= dev,prod");
    }   
}