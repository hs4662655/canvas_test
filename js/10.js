/**
 * Created by Administrator on 2016/12/7 0007.
 */
//创建精灵图小人的构造方法
function Sprite(options) {
    //初始化小人的各种属性
    //options里面有：绘画的坐标x,y
    this._init(options);
}

//修改原型对象
Sprite.prototype = {
    //初始化
    _init: function (options) {
        //绘制的坐标
        this.x = options.x === 0 ? 0 : options.x || 10;
        this.y = options.y === 0 ? 0 : options.y || 10;
        //绘制到canvas的大小
        this.w = options.w || 40;
        this.h = options.h || 65;
        //绘制的图片
        this.imgsrc = options.imgsrc || '';
        //绘制的精灵图片大小
        this.originW = options.originX || 40;
        this.originH = options.originY || 65;
        //绘制的fps
        this.fps = options.fps || 10;
        //绘制的图片方向
        this._dirIndex = 0;

    },
    //绘制精灵图
    render: function (ctx) {
        var img = new Image();
        img.src = this.imgsrc;
        //图片的index
        var frameIndex = 0;
        //将this保存下来
        var that = this;
        //监听img的onload事件
        img.onload = function () {
            setInterval(function () {
                //清除画板
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.drawImage(img,
                    frameIndex * that.originW,
                    that._dirIndex * that.originH,
                    that.originW,
                    that.originH,
                    that.x,
                    that.y,
                    that.w,
                    that.h
                );
                frameIndex++;
                frameIndex %= 4;
            }, that.fps)
        }
    },
    //修改精灵小人的方向
    changeDir: function (dir) {
        switch (dir) {
            case 'left':
                this._dirIndex = 1;
                break;
            case 'right':
                this._dirIndex = 2;
                break;
            case 'outside':
                this._dirIndex = 0;
                break;
            case 'inside':
                this._dirIndex = 3;
                break;
        }

    }
};