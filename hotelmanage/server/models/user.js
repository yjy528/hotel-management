var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hoteladmin');
var crypto=require("crypto");

var kittySchema = mongoose.Schema({
    uname: String,
    psword: String
});
var user = mongoose.model('user', kittySchema);

exports.findUname=function(name,callback){
    user.findOne({"uname":name},function(err,obj){
        callback(err,obj);
    })
};

exports.changepw = function(uname,pw,callback){
    user.find({"uname" : uname},function(err,results){
        if(err){
            callback("服务器错误！请检查输入的内容！");
            return;
        }
        if(results.length == 0){
            //-1表示你要更改的学生学号，我没有找到
            callback("没有找到这个人");
        }else{
            thestudent  = results[0];
            var sha256 = crypto.createHash("sha256").update(pw).digest("hex");
            //加密字符串，digest表示进一步处理为hex十六进制
            thestudent.psword = sha256;
            thestudent.save();
            callback("成功修改！");
        }
    });
};


// module.exports = user;
