var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hoteladmin');

var roomSchema = new mongoose.Schema({
    comedate : String,
    godate : String,
    cometime : String,
    gotime : String,
    category : String,
    n : Number,
    name : String,
    contname : String,
    tel : Number,
    words:String
});

roomSchema.statics.addRecord = function(json,callback){
    order.checkSid(json._id,function(torf){
        if(torf){
            var s = new order(json);
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

var order = mongoose.model("order",roomSchema);


module.exports = order;