// import { request } from "express";

const http =require('http');
http.createServer(function(request,reponse){
    console.log('request come',request.url);
    var header=request.headers;
    console.log(header);
    console.log(reponse.headers)
        reponse.writeHead(200,{
            "Access-Control-Allow-Origin":"*"
            // "myheader":"myvalue"
        });
        reponse.end('123');
    
}).listen(8888);
console.log('server listen on 8888')

// var events=require('events');
// var eventEmitter=new events.EventEmitter();

// var connectHandler= function connected(){
//     console.log('连接成功');
//     eventEmitter.emit('data_received');
// }
// eventEmitter.on('connection',connectHandler);
// eventEmitter.on('data_received',function(){
//     console.log('接收成功');
// })
// eventEmitter.emit('connection')
// console.log('程序执行完毕')
// const buf=Buffer.from('a','ascii');
// console.log(buf.toString())
// console.log(buf.toString('hex'));
// console.log(buf.toString('base64'))
// // const buf1=Buffer.alloc(10);
// const buf2=Buffer.alloc(10,1);
// const buf3=Buffer.allocUnsafe(10);
// const buf4=Buffer.from([1,2,3]);
// const buf5=Buffer.from('test');
// const buf6=Buffer.from('test','latin1');


// const buf1=Buffer.alloc(10);
// len=buf1.write("www.runoob.com");
// console.log("写入字节数："+len);

// const buf2=Buffer.alloc(26);
// for(var i=0;i<26;i++){
//     buf2[i]=i+97;
// }
// console.log(buf2.toString('ascii'));
// console.log(buf2.toString('ascii',0,5));
// console.log(buf2.toString('utf8',0,5));
// console.log(buf2.toString(undefined,0,5))
// console.log(buf2.toJSON())

// console.log('bufs-------------')
// const buf3=Buffer.from([0x1,0x2,0x3,0x4,0x5]);
// const json=JSON.stringify(buf);
// console.log(json);

// const copy=JSON.parse(json,(key,value)=>{
//     return value &&value.type ==='Buffer'?
//     Buffer.from(value.data):
//     value;
// })
// console.log(copy)

