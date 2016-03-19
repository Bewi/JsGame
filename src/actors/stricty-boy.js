var StrictyBoy = (function() {
    
    var defaultSize = {
        width: 20,
        height: 30
    };
        
    var velocity = 3;
    
    function StrictyBoy(stageSize, size) {
        this.shape = new createjs.Shape();
        this.size = size || { width: defaultSize.width, height: defaultSize.height };
        this._stageSize = stageSize;
    }
    
    StrictyBoy.prototype.init = function() {
        this.shape.graphics
            .beginFill("DeepSkyBlue")
            .drawRect(0, 0, this.size.width, this.size.height);
                
        this.shape.x = (this._stageSize.width / 2) - (this.size.width / 2);
        this.shape.y =  this._stageSize.height - this.size.height - 10;    
    } 
    
    StrictyBoy.prototype.moveRight = function() {
        if (this.shape.x + this.size.width < this._stageSize.width)
            this.shape.x += velocity;
        else 
            this.shape.x = this._stageSize.width - this.size.width;
    }
    
    StrictyBoy.prototype.moveLeft = function() {
        if (this.shape.x > velocity)
            this.shape.x -= velocity;
        else
            this.shape.x = 0; 
    }
    
    return StrictyBoy;
})();