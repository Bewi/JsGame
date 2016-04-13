var Ground = (function() {
    
    var _groundHeight = 30;
    
    function Ground(stageSize) {
        this.shape = new createjs.Shape();  
        this._stageSize = stageSize;  
    }
    
    Ground.prototype.init = function() {        
        var groundImg = loader.getResult("ground");
        
        this.shape
            .graphics
            .beginBitmapFill(groundImg)
            .drawRect(0, 0, this._stageSize.width, _groundHeight);
        
        this.shape.tileW = groundImg.width;
        this.shape.y = this._stageSize.height - _groundHeight;
    };
    
    return Ground;
    
})();