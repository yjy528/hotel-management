var formidable=require("formidable");
var crypto=require("crypto");
var url=require("url");
var user=require("../models/user.js");
var room=require("../models/room.js");
var roomInfo=require("../models/roomInfo.js");
var record=require("../models/record.js");
var order=require("../models/order.js");
// var crypto=require("crypto");

// 显示登录页面
exports.showIndex=function(req,res){
    res.render("index");
}
// 登录检测
exports.checklogin=function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files) {
        var uname=fields.uname;
        var psword=fields.psword;
        // var jiami=crypto.createHmac('sha256',psword).digest('hex');
        var sha256 = crypto.createHash("sha256").update(psword).digest("hex");
        user.findUname(uname, function (err, obj) {
            if (!obj) {
                res.json({"result": -1});
                return;
            }
            console.log(sha256,1111);
            console.log(obj.psword,222)
            if (sha256 === obj.psword) {
                req.session.login=1;
                req.session.uname=uname;
                res.json({"result": 1});
                return;
            }else{
                res.json({"result":-2});
                return;
            }
        })
    })
}
exports.modify=function(req,res){
    if(req.session.login){
        //登录成功要做的业务
        res.render("modify",{
            "uname" : req.session.uname
        });
    }else{
        res.redirect('/');
    }

};
exports.changepw=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields) {
        user.changepw(fields.uname, fields.psword,function(info){
            //将回调函数显示的信息，原封不动呈递给Ajax接口，会被jQuery alert出来。
            res.end(info);
        });
    });
};

// 房间种类及增删改查
exports.showCategory=function(req,res){
    res.render("roomCategory");
}
exports.addRoom=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        room.addRoom(fields,function(result){
            res.json({"result" : result});
        });
    });
};
exports.deleteRoom = function(req,res){
    var sid = req.params.sid;
    room.find({"_id" : sid},function(err,results){
        if(err || results.length == 0){
            res.json({"result" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"result" : -1});
                return;
            }
            res.json({"result" : 1});
        });
    });
};
exports.showUpdateRoom = function(req,res){
    var sid = req.params.sid;
    room.find({"_id" : sid},function(err,results){
        if(results.length == 0){
            res.json({"result":-1});
            return;
        }
        res.json({
            "updata" : results
        });
    });
};
exports.updateRoom = function(req,res){
    var sid = req.params.sid;
    if(!sid){
        return;
    }
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        room.find({"_id" : sid},function(err,results){
            if(results.length == 0){
                res.json({"result" : -1});
                return;
            }
            var thestaff = results[0];
            //更改属性
            // thestaff.sid = fields.sid;
            thestaff.category = fields.category;
            thestaff.area = fields.area;
            thestaff.bedcount = fields.bedcount;
            thestaff.breakfast = fields.breakfast;
            thestaff.network = fields.network;
            thestaff.television = fields.television;
            thestaff.price = fields.price;
            thestaff.count = fields.count;
            thestaff.rescount = fields.rescount;
            //持久化
            thestaff.save(function(err){
                if(err){
                    res.json({"result" : -1});
                }else{
                    res.json({"result" : 1});
                }
            });
        });
    });
};
exports.getAllRoom = function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 7;
    room.count({},function(err,count){
        room.find({}).sort({"sid":1}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });

};
// 房间信息及增删改查
exports.showRoom=function(req,res){
    res.render("room");
}
//信息的增删改查
exports.addRoomInfo=function (req,res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        roomInfo.addRoom(fields,function(result){
            res.json({"result" : result});
        });
    });
};
exports.deleteRoomInfo = function(req,res){
    var sid = req.params.sid;
    roomInfo.find({"_id" : sid},function(err,results){
        if(err || results.length == 0){
            res.json({"result" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"result" : -1});
                return;
            }
            res.json({"result" : 1});
        });
    });
};
exports.showUpdateRoomInfo = function(req,res){
    var sid = req.params.sid;
    roomInfo.find({"_id" : sid},function(err,results){

        if(results.length == 0){
            res.json({"result":-1});
            return;
        }
        res.json({
            "updata" : results
        });
    });
};
exports.updateRoomInfor = function(req,res){
    var sid = req.params.sid;
    if(!sid){
        return;
    }
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        roomInfo.find({"_id" : sid},function(err,results){
            if(results.length == 0){
                res.json({"result" : -1});
                return;
            }
            var thestaff = results[0];
            //更改属性
            thestaff.num  = fields.num;
            thestaff.category  = fields.category;
            thestaff.place  = fields.place;
            thestaff.description  = fields.description;
            thestaff.state  = fields.state;
            //持久化
            thestaff.save(function(err){
                if(err){
                    res.json({"result" : -1});
                }else{
                    res.json({"result" : 1});
                }
            });
        });
    });
};
exports.getAllRoomInfo = function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 9;
    roomInfo.count({},function(err,count){
        roomInfo.find({}).sort({"sid":1}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
};
exports.findAllRoomName=function(req,res){
    room.find({},function(err,obj){
        res.json({"results" : obj});
    })
}
exports.updateCount = function(req,res){
    var category = req.params.category;
    // console.log(category);
    var state = req.params.state;
    var arr=[];
    roomInfo.find({"category" : category},function(err,data){
        for(var i=0;i<data.length;i++){
            if(data[i].state==0){
                arr.push(data);
            }
        }
            room.find({"category" : category},function(err,results){
                if(results.length == 0){
                    res.json({"result" : -1});
                    return;
                }
                var thestaff = results[0];
                thestaff.count  = parseInt(thestaff.count) + 1;
                thestaff.rescount  = arr.length;
                //持久化
                thestaff.save(function(err){
                    if(err){
                        res.json({"result" : -1});
                    }else{
                        res.json({"result" : 1});
                    }
                });
            });
        });
};

//大堂入住部分
exports.showDtang=function(req,res){
    res.render("datang")
}

//获取还有剩余房间的房间种类
exports.getCategory=function(req,res){
    room.find({"rescount":{$gt:0}},function(err,obj){
        res.json({"results" : obj});
    })
}
//未入住的房间种类下的房间号 及 该类房间的价钱，剩余数量
exports.getRoomNum=function(req,res){
    var category = req.params.category;
    var arr=[];
    var p=0;
    var n=0;
    roomInfo.find({"category":category,"state":0},function(err,d){
        // console.log(d);
        for(var i=0;i<d.length;i++){
            arr.push(d[i].num);
        }
        // console.log(arr);
        room.findOne({"category":category},function(err,a){
            p=a.price;
            n=a.rescount;
            res.json({
                "nums":arr,
                "price":p,
                "rescount":n
            });
        })

    })
}
exports.updateState=function(req,res){
    var num = req.params.num;
    roomInfo.find({"num" : num},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }
        var thestaff = results[0];
        thestaff.state  = 2;
        //持久化
        thestaff.save(function(err){
            if(err){
                res.json({"result" : -1});
            }else{
                room.findOne({"category":results[0].category},function(err,re){
                    console.log(re);
                    var theroom=re;
                    theroom.rescount=theroom.rescount-1;
                    theroom.save(function(err){
                        if(err){
                            res.json({"result" : -1});
                        }else{
                            res.json({"result" : 1});
                        }
                    });
                })
            }
        });
    });
};
exports.addRecord=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        record.addRecord(fields,function(result){
            res.json({"result" : result});
        });
    });
}
exports.addOrder=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        order.addRecord(fields,function(result){
            res.jsonp(result);
        });
    });
}

//记录
exports.showRecord=function(req,res){
    res.render("record");
}

// 订单入住
exports.showDingdan=function(req,res){
    res.render("dingdan");
}
exports.searchOrder=function(req,res) {
    var info = req.params.info;
    console.log(info);
    order.find({"contname":info},function(err,a){
        console.log(a);
        res.json({"result":a[0]});
    })
};
exports.updateStatere=function(req,res){
    var num = req.params.num;
    roomInfo.find({"num" : num},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }
        var thestaff = results[0];
        thestaff.state  = 2;
        //持久化
        thestaff.save(function(err){
            if(err){
                res.json({"result" : -1});
            }else{
                room.findOne({"category":results[0].category},function(err,re){
                    console.log(re);
                    var theroom=re;
                    theroom.rescount=theroom.rescount-1;
                    theroom.save(function(err){
                        if(err){
                            res.json({"result" : -1});
                        }else{
                            res.json({"result" : 1});
                        }
                    });
                })
            }
        });
    });
};
exports.deleteOrder = function(req,res){
    var sid = req.params.sid;
    order.find({"_id" : sid},function(err,results){
        if(err || results.length == 0){
            res.json({"result" : -1});
            return;
        }
        results[0].remove(function(err){
            if(err){
                res.json({"result" : -1});
                return;
            }
            res.json({"result" : 1});
        });
    });
};
exports.getAllOrder = function(req,res){
    var page = url.parse(req.url,true).query.page - 1 || 0;
    var pagesize = 9;
    record.count({},function(err,count){
        record.find({}).sort({"sid":1}).limit(pagesize).skip(pagesize * page).exec(function(err,results){
            res.json({
                "pageAmount" : Math.ceil(count / pagesize),
                "results" : results
            });
        });
    });
};

// 退房
exports.showTuifang=function(req,res){
    res.render("unsubscribe");
}
exports.searchRecordNum=function(req,res) {
    var num = req.params.num;
    console.log(num);
    record.find({"num":num},function(err,a){
        console.log(a);
        res.json({"result":a[0]});
    })
};
exports.postTuifang=function(req,res){
    var num = req.params.num;
    if(!num){
        return;
    }
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        record.find({"num" : num},function(err,results){
            if(results.length == 0){
                res.json({"result" : -1});
                return;
            }
            var thestaff = results[0];
            //更改属性
            // thestaff.sid = fields.sid;
            thestaff.godate = fields.godate;
            thestaff.allprice = fields.allprice;
            thestaff.rstate = fields.rstate;
            //持久化
            thestaff.save(function(err){
                if(err){
                    res.json({"result" : -1});
                }else{
                    res.json({"result" : 1});
                }
            });
        });
    });
};
exports.updateStatereturn=function(req,res){
    var num = req.params.num;
    roomInfo.find({"num" : num},function(err,results){
        if(results.length == 0){
            res.json({"result" : -1});
            return;
        }
        var thestaff = results[0];
        thestaff.state  = 0;
        //持久化
        thestaff.save(function(err){
            if(err){
                res.json({"result" : -1});
            }else{
                room.findOne({"category":results[0].category},function(err,re){
                    console.log(re);
                    var theroom=re;
                    theroom.rescount=theroom.rescount+1;
                    theroom.save(function(err){
                        if(err){
                            res.json({"result" : -1});
                        }else{
                            res.json({"result" : 1});
                        }
                    });
                })
            }
        });
    });
};
//房间状态图
exports.showRoomState=function(req,res){
    res.render("states");
};
exports.showEachRoom=function(req,res){
    roomInfo.find({},function(err,result){
        if(err){
            return;
        }
        res.json(result);
    })
};

//记录的查询
exports.searchRecord=function(req,res) {
    var info = req.params.info;
    console.log(info);
    record.find({"name":info},function(err,a){
        console.log(a);
        res.json({"result":a[0]});
    })
};

//客户页面的首页渲染
exports.getdata = function (req, res) {
    room.find({"rescount":{$gt:0}},function(err,obj){
        res.jsonp(obj);
    })
}

exports.getdata0 = function (req, res) {
    var arr=[];
    room.find({"rescount":{$gt:0}},function(err,obj){
        for(var i=0;i<obj.length;i++){
            arr.push(obj[i].category);
        }
        res.jsonp(arr);
    })
};
// vue客户搜索订单
exports.search=function(req,res) {
    var info = req.params.info;
    console.log(info);
    order.find({"contname":info},function(err,a){
        // console.log(a);
        res.jsonp(a);
    })
};
// exports.getdataCategory=function(req,res){
//     var category = req.params.category;
//     var arr=[];
//     var p=0;
//     var n=0;
//     roomInfo.find({"category":category,"state":0},function(err,d){
//         // console.log(d);
//         for(var i=0;i<d.length;i++){
//             arr.push(d[i].num);
//         }
//         // console.log(arr);
//         room.findOne({"category":category},function(err,a){
//             var b={}
//             b.price=a.price;
//             b.rescount=a.rescount;
//             b.nums=arr;
//             console.log(b);
//             res.jsonp(b);
//         })
//
//     })
// }