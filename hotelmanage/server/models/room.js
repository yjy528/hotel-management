var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hoteladmin');

var roomSchema = new mongoose.Schema({
    sid  : Number ,
    category : String,
    area : Number,
    bedcount : Number,
    breakfast : String,
    network : String,
    television : String,
    price : Number,
    count : Number,
    rescount : Number
});

roomSchema.statics.addRoom = function(json,callback){
    room.checkSid(json.sid,function(torf){
        if(torf){
            var s = new room(json);
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
    this.find({"sid" : sid} , function(err,results){
        callback(results.length == 0);
    });
};

var room = mongoose.model("roomCategory",roomSchema);


module.exports = room;