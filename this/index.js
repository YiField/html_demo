// 1111作为对象的方法调用
var obj = {
    a: 1,
    getA: function(){
        console.log(this === obj);
        console.log(this.a);
    }

}
obj.getA()

// 222作为普通函数调用
window.name = 'globalName';
var getName = function() {
    return this.name;
}
console.log(this.getName())//globalName

var myObject = {
    name: 'sybil',
    getName: function(){
        return this.name;
    }
}
var getName2 = myObject.getName;
console.log(getName2())//globalName  未保留this指向
console.log(myObject.getName())//sybil

// div节点的事件函数内部，调用局部方法，局部方法内部的this指向了window
window.id = 'window';
document.getElementById('div1').onclick = function() {
    console.log(this.id);//div1
    var callback = function() {
        console.log(this.id);//window
    }
    callback();
}
// 解决办法：保留div的引用
document.getElementById('div1').onclick = function() {
    var that = this;
    var callback = function(){
        console.log(this.id);
    }
    callback();
}

// 333构造器调用
// js函数当作构造器使用，通过new运算符调用函数，该函数返回一个对象，构造器里的this返回该对象
var MyClass = function() {
    this.name = 'sybil';
}
var obj = new MyClass();
console.log(obj.name);

