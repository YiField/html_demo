	/*
题目1：编写一个 People 类，使其的实例具有监听事件、触发事件、解除绑定功能。（实例可能监听多个不同的事件，也可以去除监听事件）
	*/
	function People(name){
		this.name=name;
		//this.evnets={'event1':[fn1,fn2]}
		this.events={};
		
	}
	People.prototype.sayHi=function(){
		console.log(`hi,i am${this.name}`);
	}
	People.prototype.on=function(event,fn){
		if(this.events[event]){
			this.events[event].push(fn)
		}else{
			this.events[event]=[];
			this.events[event].push(fn);
		}
	}
	People.prototype.off=function(event,fn){
		if(this.events[event]){
			console.log('存在');
			// this.events[event]=null;
			let len=this.events[event].length;
			for(let i=0;i<len;i++){
				let fn2=this.events[event][i];
				if(fn==fn2){
					this.events[event].splice(i,1);
					i--;
				}
			}
		}else{
			console.log(`不存在${envent,fn}`);
		}
	}
	People.prototype.emit=function(event){
		if(this.events[event]&&this.events[event].length!=0){
			//存在
			let len=this.events[event].length;
			for(let i=0;i<len;i++){
				let fn=this.events[event][i];
				fn();
			}
		}else{
			console.log(`不存在${event}事件`)
		}
	}
	// function sayHi(){
	// 	console.log(`hi,i am${this.name}`);
	// }
	// function sayHi2(){
	// 	console.log(`hi2,i am${this.name}`);
	// }
	// function sayHi3(){
	// 	console.log(`hi3,i am${this.name}`);
	// }
	// let people=new People('sybil');

/*
题目2：完成 sleep 函数，可以达到下面的效果：*/
	function sleep(dur,fn){
		let timer=setTimeout(()=>{
			fn();
			clearTimeout(timer)
		},dur);
	}
	function f1(){
		console.log('dfaf')
	}

	/*
	题目3：找出下面代码的规律并且编写一个函数，转换特定的整数到对应的字符串。
	1=a,2=b,26=z,27=26*1+1=aa,52=26*1+26=az
*/
	function convert(num){
		num=parseInt(num);
		if(num<=0){
			console.log('err')
			return;
		}
		let shang=Math.floor(num/26);
		let yushu=num-26*shang;
		if(yushu==0&&shang>=1){
			shang--;
			yushu=26;
		}
		console.log(shang,yushu)
		if(shang==0){
			return String.fromCharCode(65-1+yushu);
		}else{
			return String.fromCharCode(65-1+shang)+String.fromCharCode(65-1+yushu);

		}
	}

	/*
题目4：完成 combo 函数。它接受任意多个单参函数（只接受一个参数的函数）作为参数，并且返回一个函数。它的作为用：使得类似 f(g(h(a))) 这样的函数调用可以简写为 combo(f, g, h)(a)。
	*/
	function combo(){
		console.log(arguments);
		let functions=Array.prototype.slice.call(arguments);
		return function(value){
			for(let i=functions.length-1;i>=0;i--){
				value=functions[i](value);
				
			}
			return value;
		}
		
	}
	const addOne = (a) => a + 1
	const multiTwo = (a) => a * 2
	const divThree = (a) => a / 3
	const toString = (a) => a + ''
	const split = (a) => a.split('')
	const testForCombo = combo(split, toString, addOne, multiTwo, divThree)


	/*
	题目5：有两个盘子分别放有 5 个和 7 个小球，两个朋友玩游戏：每个人轮流从两个盘子中拿小球，每人每次只能从其中一个盘子中拿，每次可以拿 1 个或者多个（不能一个都不拿），拿到最后一个小球的人算输。问开局先手和后手是否有必胜策略？如果有，请描述必胜策略。*/

	/*
	不能必胜，当一个盘子为1，另一个盘子不为空时，拿走另一个盘子所有可赢
	当两个盘子数量为2时，下一步若a拿，a获胜几率小于b,应该在两个盘子数量都为2前避免

	*/