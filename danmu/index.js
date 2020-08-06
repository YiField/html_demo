let data = [
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 0, color: 'red', speed: 2, fontSize: 22},
    {value: '想快快长大，才能保护她', time: 10, color: '#00a1f5', speed: 3, fontSize: 30},
    {value: '听妈妈的话吧，晚点再恋爱吧！爱呢？', time: 15},
];

let doc = document;
let canvas = doc.getElementById("canvas");
let video = doc.getElementById("video");
let $txt = doc.getElementById("text");
let $color = doc.getElementById('color')
let $range = doc.getElementById('range');


class CanvasBarrage {
	constructor(canvas, video, opts = {}){
		if(!canvas || !video) return;
		
		// 挂载到this
		this.video = video;
		this.canvas = canvas;

		// 设置canvas宽高和video一致
		this.canvas.width = video.width;
		this.canvas.height = video.height;

		// 获取画布，操作画布
		this.ctx = canvas.getContext('2d');

		// 默认参数
		let defOpts = {
			color: '#e91e63',
			speed: 1.5,
			opacity: 0.5,
			fontSize: 20,
			data: []
		};

		// 合并对象并全挂到this
		Object.assign(this, defOpts, opts);

		// 播放状态属性
		this.isPaused = true;

		// 创建弹幕类，返回数组
		this.barrages = this.data.map(item => new Barrage(item, this))

		// 渲染
		this.render();
	}

	render() {
		// 清除原来的画布，
		this.clear();
		// 渲染弹幕
		this.renderBarrage();
		if(!this.isPaused) {
			// raf渲染动画，递归进行渲染
			requestAnimationFrame(this.render.bind(this))
		}
	}

	clear() {
		// 清楚整个画布
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	renderBarrage() {

		let time = this.video.currentTime;
		this.barrages.forEach(barrage => {
			if(!barrage.flag && time >= barrage.time) {
				if(!barrage.isInit) {
					barrage.init();
					barrage.isInit = true;
				}
				barrage.x -= barrage.speed;
				barrage.render();
				if(barrage.x < -barrage.width) {
					barrage.flag = true;
				}
			}
		})
	}
}

class Barrage {
	constructor(obj, ctx){
		this.value = obj.value;//弹幕内容
		this.time = obj.time;//弹幕出现时间
		// 将obj和ctx都挂载到this上方便获取
		this.obj = obj;
		this.context = ctx;
	}

	// 初始化弹幕
	init() {
		// 初始化参数，若无则获取默认参数
		this.color = this.obj.color || this.context.color;
		this.speed = this.obj.speed || this.context.speed;
		this.opacity = this.obj.opacity || this.context.opacity;
		this.fontSize = this.obj.fontSize || this.context.fontSize;

		// 通过创建p获得文字的宽度
		let p = document.createElement('p');
		p.style.fontSize = this.fontSize +'px';
		p.innerHTML = this.value;
		document.body.appendChild(p);

		//获得p文字的宽度，并移除p
		this.width = p.clientWidth;
		document.body.removeChild(p);

		// 弹幕出现的位置
		this.x = this.context.canvas.width;
		this.y = this.context.canvas.height * Math.random();

		// 临界值处理
		if(this.y < this.fontSize){
			this.y = this.fontSize;
		}else if(this.y > this.context.canvas.height - this.fontSize) {
			this.y = this.context.canvas.height - this.fontSize;
		}
	}

	// 渲染弹幕
	render() {
		this.context.ctx.font = `${this.fontSize}px Arial`;
		this.context.ctx.fillStyle = this.color;
		this.context.ctx.fillText(this.value, this.x, this.y)
	}
}
let canvasBarrage = new CanvasBarrage(canvas, video, {data})
video.addEventListener('play',()=>{
	canvasBarrage.isPaused = false;
	canvasBarrage.render();
})

