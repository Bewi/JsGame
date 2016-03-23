var StrictyBoy = (function() {
    
    var p = createjs.extend(StrictyBoy, createjs.Container);
    
    var defaultSize = {
        width: 20,
        height: 30
    };
    
    var defaultGunSize = {
        width: 6,
        height: 40
    };
        
    var velocity = 10;
    var goUp;
    var goDown;
    var goRight;
    var goLeft;
    var gun;
    
    // Constructor
    function StrictyBoy(stageSize, size) {
        this.shape = new createjs.Shape();
        this.gun = new createjs.Shape();
        this.size = size || { width: defaultSize.width, height: defaultSize.height };
        this._stageSize = stageSize;
        this.goUp = this.goDown = this.goRight = this.goLeft = false;
    }
    
    // Initialisation
    StrictyBoy.prototype.init = function() {
        // StrictyBoy
        this.shape.graphics
            .beginFill("DeepSkyBlue")
            .drawRect(0, 0, this.size.width, this.size.height);
                
        this.shape.x = (this._stageSize.width / 2) - (this.size.width / 2);
        this.shape.y =  this._stageSize.height - this.size.height - 10;    
            
        // Gun         
        this.gun.graphics
            .beginFill("#123456")
            .drawRect(0, 0, -defaultGunSize.width, -defaultGunSize.height); // Negtives values to put the rotation point on bottom right instead of top left
        
        this.gun.x = this.shape.x + (this.size.width / 2) + (defaultGunSize.width/2);
        this.gun.y = this.shape.y + (this.size.height / 2) ;    
    } 
    
    // Starting to move on a direction
    StrictyBoy.prototype.moveRight = function() { goRight = true; }    
    StrictyBoy.prototype.moveLeft = function() { goLeft = true; }    
    StrictyBoy.prototype.moveUp = function() { goUp = true; }    
    StrictyBoy.prototype.moveDown = function() { goDown = true; }
    
    // Stopping to move on a direction
    StrictyBoy.prototype.moveRightStop = function() { goRight = false; }    
    StrictyBoy.prototype.moveLeftStop = function() { goLeft = false; }    
    StrictyBoy.prototype.moveUpStop = function() { goUp = false; }    
    StrictyBoy.prototype.moveDownStop = function() { goDown = false; }
    
    // Event fires on each tick
    p.tickEvent = function tickEvent(event){
        
        // Vertical movement
        if(goUp){
            if (this.shape.y > velocity){
                this.shape.y -= velocity;
                this.gun.y -= velocity;
            } else {
                this.shape.y = 0; 
                this.gun.y = (this.size.height / 2); 
            }                
        }else if(goDown){
            if (this.shape.y + this.size.height < this._stageSize.height){
                 this.shape.y += velocity;
                 this.gun.y += velocity;
            } else {
                this.shape.y = this._stageSize.height - this.size.height;
                this.gun.y = this._stageSize.height - (this.size.height / 2) ;
            }                
        }
        
        // Horizontal movement
        if(goRight){
            if (this.shape.x + this.size.width < this._stageSize.width)
            {
                this.shape.x += velocity;
                this.gun.x += velocity;
            } else {
                this.shape.x = this._stageSize.width - this.size.width;
                this.gun.x = this._stageSize.width - (this.size.width / 2) + (defaultGunSize.width/2);
            }
        }else if(goLeft){
            if (this.shape.x > velocity){
                this.shape.x -= velocity;
                this.gun.x -= velocity;
            } else {
                this.shape.x = 0; 
                this.gun.x = (this.size.width / 2) + (defaultGunSize.width/2); 
            }                
        }                
    }
    
    return StrictyBoy;
})();