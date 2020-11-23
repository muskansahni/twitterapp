var express = require('express');
var app=express();
var bodyparser=require('body-parser');
var userList= require('./user.js');
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({ extended: false }));
app.get('/',function (req,res) {
    res.render('index');
});
app.post('/get_users',function(req,res) {
    var screen_name=req.body.handle;
   var users=userList(res,screen_name);
});
var server=app.listen(3000,function (req,res) {
    console.log('server running');
});