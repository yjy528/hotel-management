var express=require("express");
var app=express();
var control=require("./control/control.js");
var session = require('express-session');

app.set("view engine","ejs");
app.use(express.static("static"));
app.use(session({
    secret: 'hotelmanage',
    resave: false,
    saveUninitialized: true,
}));

app.get("/",control.showIndex);
app.get("/category",control.showCategory);
app.get("/room",control.showRoom);
// 管理员登录验证
app.post("/checklogin",control.checklogin);
app.get("/modify",control.modify);
app.post("/changepw",control.changepw);
// 房间类别
app.post("/addRoom",control.addRoom);
app.delete("/removeRoom/:sid",control.deleteRoom);
app.get("/updataRoom/:sid",control.showUpdateRoom);
app.post('/toupdataRoom/:sid', control.updateRoom);
app.get('/allRoom',control.getAllRoom);
//房间信息的增删改查
app.post('/addRoomInfo',control.addRoomInfo);
app.get('/getAllRoomName',control.findAllRoomName);
app.get('/allRoomInfo',control.getAllRoomInfo);
app.delete('/removeRoomInfo/:sid', control.deleteRoomInfo);
app.get('/updataRoomInfo/:sid', control.showUpdateRoomInfo);
app.post('/toupdataRoomInfo/:sid', control.updateRoomInfor);
app.get('/updateCountTwo/:category/:state', control.updateCount);

//大堂入住办理
app.get("/datang",control.showDtang);
app.get("/getCategoryAndRoom",control.getCategory);
app.get("/getRoomNum/:category",control.getRoomNum);
app.get("/updateState/:num",control.updateState);
app.post("/addRecord",control.addRecord);
app.post("/addOrder",control.addOrder);

//记录
app.get("/record",control.showRecord);
app.get('/allOrder',control.getAllOrder);
app.get("/searchRecord/:info",control.searchRecord);

//用户页面
app.get('/getdata',control.getdata);
app.get('/getdata0',control.getdata0);
// app.get('/getdataCategory',control.getdataCategory);


//订单入住
app.get("/dingdan",control.showDingdan);
app.get("/searchOrder/:info",control.searchOrder);
// 客户查询订单
app.get("/search/:info",control.search);

app.get("/updateStatere/:num",control.updateStatere);
app.delete('/deleteOrder/:sid', control.deleteOrder);


app.get("/searchRecordNum/:num",control.searchRecordNum);
app.get('/unsubscribe',control.showTuifang);
//退房
app.post("/tuifang/:num",control.postTuifang);
app.get("/updateStatereturn/:num",control.updateStatereturn);

//房间状态图
app.get("/roomState",control.showRoomState);
app.get("/eachRoom",control.showEachRoom);

app.listen(3333);
