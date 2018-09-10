var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hoteladmin');

var roomSchema = new mongoose.Schema({
    card : String,
    cardnum : Number,
    name : String,
    sex : String,
    category : String,
    num : Number,
    unitprice : Number,
    allname : String,
    comedate : String,
    godate : String,
    allprice:String,
    rstate:String
});

roomSchema.statics.addRecord = function(json,callback){
    record.checkSid(json._id,function(torf){
        if(torf){
            var s = new record(json);
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
    this.find({"_id" : sid} , function(err,results){
        callback(results.length == 0);
    });
};

var record = mongoose.model("record",roomSchema);


module.exports = record;