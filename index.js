// var server=require("./server3");
// var router= require("./router");
// server.start(router.route);
// process.on('exit', function(code) {

//     // 以下代码永远不会执行
//     setTimeout(function() {
//       console.log("该代码不会执行");
//     }, 0);

//     console.log('退出码为:', code);
//   });
//   console.log("程序执行结束");

// var fs=require("fs");
// fs.readFile("input.txt",function(err,data){//异步
//   if(err){
//       return console.err(err);
//   }  
//   console.log("异步读取："+data.toString())
// })
// var data=fs.readFileSync("input.txt");//同步
// console.log("同步读取："+data.toString());
// console.log("程度执行完毕")

// const util = require("util");
// async function fn(){
//     return "hello world";
// }
// const callbackFunction = util.callbackify(fn);

// callbackFunction((err,ret)=>{
//     if(err)throw err;
//     console.log(ret);
// })
// console.log(fn())


// var util = require('util'); 
// function Base() { 
//     this.name = 'base'; 
//     this.base = 1991; 
//     this.sayHello = function() { 
//     console.log('Hello ' + this.name); 
//     }; 
// } 
// Base.prototype.showName = function() { 
//     console.log(this.name);
// }; 
// function Sub() { 
//     this.name = 'sub'; 
// } 
// util.inherits(Sub, Base); 
// var objBase = new Base(); 
// objBase.showName(); 
// objBase.sayHello(); 
// console.log(objBase); 
// var objSub = new Sub(); 
// objSub.showName(); 
// //objSub.sayHello(); 
// console.log(objSub); 

//获取get请求的内容
// var http = require('http');
// var url = require('url');
// var util = require('util');

// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
//     // res.end(util.inspect(url.parse(req.url, true)));

//     var params =url.parse(req.url,true).query;
//     res.write("网站名："+params.name);
//     res.write("\n");
//     res.write("网站url:"+params.url);
//     res.end();
// }).listen(3000);

//获取post请求内容
// var http =require("http");
// var querystring=require("querystring");
// var util= require("util");

// http.createServer(function(req,res){

//     var post ="";
//     req.on("data",function(chunk){
//         post+=chunk;
//     });
//     req.on("end",function(){
//         post=querystring.parse(post);
//         res.end(util.inspect(post))
//     })
// }).listen(3000)

// var http = require('http');
// var querystring = require('querystring');

// var postHTML = 
//   '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
//   '<body>' +
//   '<form method="post">' +
//   '网站名： <input name="name"><br>' +
//   '网站 URL： <input name="url"><br>' +
//   '<input type="submit">' +
//   '</form>' +
//   '</body></html>';

// http.createServer(function (req, res) {
//   var body = "";
//   req.on('data', function (chunk) {
//     body += chunk;
//   });
//   req.on('end', function () {
//     // 解析参数
//     body = querystring.parse(body);
//     // 设置响应头部信息及编码
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

//     if(body.name && body.url) { // 输出提交的数据
//         res.write("网站名：" + body.name);
//         res.write("<br>");
//         res.write("网站 URL：" + body.url);
//     } else {  // 输出表单
//         res.write(postHTML);
//     }
//     res.end();
//   });
// }).listen(3000);


// //os模块：
// var os=require("os");
// //cpu字节序
// console.log("endianness:"+os.endianness());

// //操作系统名
// console.log("type:"+os.type());

// //操作系统名
// console.log("platform:"+os.platform());

// //系统内存总量
// console.log("total memory:"+os.totalmem()+"bytes")

// //操作系统空闲内存量
// console.log("free memory:"+os.freemem()+"bytes");

// //path模块：
// var path=require("path");
// // 格式化路径
// console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));

// // 连接路径
// console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));

// // 转换为绝对路径
// console.log('resolve : ' + path.resolve('main.js'));

// // 路径中文件的后缀名
// console.log('ext name : ' + path.extname('main.fs'));


var http = require("http");
var fs = require("fs");
var url = require("url");
http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("request for" + pathname + "received.");
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404,{"Content-Type":"text/html"});
        }else{
            res.writeHead(200,{"Content-Type":"text/html"});
            res.write(data.toString());
        }
        res.end();
    })
}).listen(8080);
console.log("server running at http://localhost:8080")