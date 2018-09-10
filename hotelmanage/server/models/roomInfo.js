var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hoteladmin');

var roomSchema = new mongoose.Schema({
    num  : Number ,
    category : String,
    place : String,
    description : String,
    state : String
});

roomSchema.statics.addRoom = function(json,callback){
    roomInfo.checkSid(json.num,function(torf){
        if(torf){
            var s = new roomInfo(json);
            s.save(function(err){
                if(err){
                    callback(-2)
                    return;
                }
                callback(1);
            });

        }else{
            callback(-1);
        }
    });
};
roomSchema.statics.checkSid = function(sid,callback){
    this.find({"num" : sid} , function(err,results){
        callback(results.length == 0);
    });
};

var roomInfo = mongoose.model("room",roomSchema);


module.exports = roomInfo;