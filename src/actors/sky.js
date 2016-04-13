var Sky = (function() {
    
    function Sky(stageSize) {
        this.shape = new createjs.Shape();  
        this._stageSize = stageSize;  
    }
    
    Sky.prototype.init = function() {        
        var skyImg = loader.getResult("sky");
        
        this.shape
            .graphics
            .beginBitmapFill(skyImg)
            .drawRect(0, 0, this._stageSize.width, this._stageSize.height);
        
        this.shape.tileW = skyImg.width;
    };
    
    return Sky;
    
})();