module.exports=function(express, mongoose){
    var route = express.Router();
    var multiparty = require('connect-multiparty')();
    
    var file = {
        upload:(req,res)=>{
            var fs = require('fs');
            var Gridfs = require('gridfs-stream');
            var db = mongoose.connection.db;
            var mongoDriver = mongoose.mongo;
            var gfs = new Gridfs(db, mongoDriver);

            var writestream = gfs.createWriteStream({
                filename: req.files.file.name,
                mode: 'w',
                content_type: req.files.file.mimetype,
                metadata: req.body
            });

            fs.createReadStream(req.files.file.path).pipe(writestream);

            writestream.on('close', function(file) {
                res.send({"status":"success","file":file});
                fs.unlink(req.files.file.path, function(err) {
                    // handle error
                    console.log('success!')
                });
            });
            
            
        },
        get:(req,res)=>{
            var fs = require('fs');
            var Gridfs = require('gridfs-stream');
            var db = mongoose.connection.db;
            var mongoDriver = mongoose.mongo;
            var gfs = new Gridfs(db, mongoDriver);
            
            var readstream = gfs.createReadStream({
                _id: req.params.id
            });
            readstream.pipe(res);
        }
    };

    route.post('/upload',multiparty,file.upload);
    route.get('/:id',file.get);
    return route;
}