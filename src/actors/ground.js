var Ground = (function() {
    
    var _groundHeight = 15;
    
    function Ground(stageSize) {
        this.shape = new createjs.Shape();  
        this._stageSize = stageSize;  
    }
    
    Ground.prototype.init = function() {
        var graphics = this.shape
            .graphics
            .beginFill("Green")
            .drawRect(0, 0, this._stageSize.width, _groundHeight);
        
        this.shape.y = this._stageSize.height - _groundHeight;
    };
    
    return Ground;
    
})();