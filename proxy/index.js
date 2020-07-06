var obj = new Proxy({},{
    get: function(target,propKey,receiver){
        console.log(propKey);
        return Reflect.get(target,propKey,receiver);
    },
    set: function(target,propKey,value,receiver){
        console.log(propKey);
        return Reflect.set(target,propKey,value,receiver);
    }
})

// Proxy冲在了点运算符，自定义覆盖语言的原始定义
// var proxy = new Proxy(target, handler);
var target = {};
var handler = {};
var proxy =new Proxy(target, handler);
proxy.a = 'b';
console.log(target.a);

var proxy1 = new Proxy({},{
    get: function(target, propKey){
        return 35;
    }
});
let obj1 = Object.create(proxy1)

// get拦截读取
var person = {
    name: '张三'
}
var proxy2 = new Proxy(person, {
    get: function(target, propKey){
        if(propKey in target){
            return target[propKey]
        }else{
            throw new ReferenceError(`prop name ${propKey} does not exist.`);
        }
    }
})
//数组读取负数的索引
function createArray(...elements){
    let handler = {
        get(target, propKey, receiver){
            let index = Number(propKey);
            if(index < 0){
                propKey = String(target.length + index);
            }
            return Reflect.get(target, propKey, receiver);
        }
    }
    
    let target = [];
    target.push(...elements);
    return new Proxy(target, handler);
}
let arr = createArray('a', 'b', 'c');

//实现属性的链式操作
var pipe = function(value) {
    var funcStack = [];
    var oproxy = new Proxy({},{
        get: function(pipeObject, fnName) {
            if(fnName === 'get'){
                return funcStack.reduce(function (val, fn){
                    return fn(val);
                },value);
            }
            funcStack.push(window[fnName]);
            return oproxy;
        }
    });
    return oproxy;
}
var double = n => n*2;
var pow = n => n*n;
var reverseInt = n => n.toString().split("").reverse().join("")|0;
pipe(3).double.pow.reverseInt.get;

// 实现一个生成各种dom节点的通用函数
const dom = new Proxy({}, {
    get(target, property){
        return function(attrs ={}, ...children) {
            const el = document.createElement(property);
            for(let prop of Object.keys(attrs)) {
                el.setAttribute(prop, attrs[prop]);
            }
            for(let child of children) {
                if(typeof child === 'string'){
                    child = document.createTextNode(child);
                }
                el.appendChild(child);
            }
            return el;
        }
    }
})

const el = dom.div({},
    'Hello, my name is',
    dom.a({href: '//example.com'}, 'Mark'),
    '. I like:',
    dom.ul({},
        dom.li({},'The web'),
        dom.li({}, 'Food'),
        dom.li({}, '...actrully that\'s it')
    )
);
document.body.appendChild(el)

const proxy3 = new Proxy({}, {
    get: function(target, key, receiver){
        return receiver;
    }
});
proxy.getReceiver === proxy;


//set:方法用来拦截某个属性的复制操作  目标对象、属性名、属性之、Proxy实例本身
let validator = {
    set: function(obj, prop, value){
        if(prop === 'age') {
            if(!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if(value > 2000) {
                throw new RangeError('The age seems invalid');
            }
        }
        // 对于满足条件的age属性以及其他属性，直接保存
        obj[prop] = value;
    }
}
let person = new Proxy({}, validator);
person.age = 100;
person.age


