var Plane = function() {
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
}
var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;
console.log(plane)
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请打开浏览器控制台以查看运行结果。）
var clonePlane = Object.create(plane);
console.log(clonePlane)


var obj = {
    a: 1,
    getA: function(){
        console.log(this === obj);
        console.log(this.a);
    }

}
obj.getA()