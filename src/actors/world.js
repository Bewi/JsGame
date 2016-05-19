var World = (function() {
    
    var _groundHeight = 30;
    
    function World(stageSize) {
        this.shapes = [];
        
        this._sky = new createjs.Shape();
        this.shapes.push(this._sky);
        
        this._ground = new createjs.Shape();
        this.shapes.push(this._ground);
        
        this._platform = new createjs.Shape();
        this.shapes.push(this._platform);
        
        this._stageSize = stageSize;  
    }
    
    World.prototype.init = function() {        
        initGround(this._ground, this._stageSize);
        initSky(this._sky, this._stageSize);
        initPlatform(this._platform, this._stageSize);        
    };
    
    function initGround(shape, stageSize) {
        var groundImg = loader.getResult("ground");
        
        shape.graphics
            .beginBitmapFill(groundImg)
            .drawRect(0, 0, stageSize.width, _groundHeight);
        
        shape.tileW = groundImg.width;
        shape.y = stageSize.height - _groundHeight;
        groundHeight = _groundHeight/2;
    }
    
    function initSky(shape, stageSize) {
        var skyImg = loader.getResult("sky");
        
        shape
            .graphics
            .beginBitmapFill(skyImg)
            .drawRect(0, 0, stageSize.width, stageSize.height);
        
        shape.tileW = skyImg.width;
    }
    
    function initPlatform(shape, stageSize) {
        var platformImg = loader.getResult('platform');
        
        shape
            .graphics
            .beginBitmapFill(platformImg)
            .drawRect(0, 0, 150, 25);
        
        shape.tileW = platformImg.width;
        shape.y = 250;
        shape.x = 50;
    }
        
    return World;
    
})();