const http = require('http')
const fs = require('fs')

http.createServer((request, response)=> {
    console.log('request come', request.url)

    const html = fs.readFileSync('index.html', 'utf8')
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })

    response.end(html)
}).listen(8888)

console.log('listen at localhost:8888')

// var fs = require("fs");
// var data = '';

// // 创建可读流
// var readerStream = fs.createReadStream('input.txt');

// // 设置编码为 utf8。
// readerStream.setEncoding('UTF8');

// // 处理流事件 --> data, end, and error
// readerStream.on('data', function(chunk) {
//    data += chunk;
// });

// readerStream.on('end',function(){
//    console.log(data);
// });

// readerStream.on('error', function(err){
//    console.log(err.stack);
// });

// console.log("程序执行完毕");

// var writeStream=fs.createWriteStream('output.txt');
// // writeStream.setEncoding('utf8');
// // writeStream.write(data,'utf8');
// // writeStream.end();
// writeStream.on('end',function(){
//     console.log('没有数据可以了')
// })
// writeStream.on('finish',function(){
// console.log('写入完成')
// });
// writeStream.on('error',function(err){
//     console.log(err.stack);
// })
// console.log("程序执行完毕")

// // readerStream.pipe(writeStream);

// var zlib=require('zlib');
// fs.createReadStream('input.txt')
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream('output2.txt.gz'));


// fs.createReadStream('output2.txt.gz')
//     .pipe(zlib.createGunzip())
//     .pipe(fs.createWriteStream('output3.txt'));