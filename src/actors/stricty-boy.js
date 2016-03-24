var StrictyBoy = (function() {
    // Constants
    var defaultSize = {
        width: 20,
        height: 30
    };
    var defaultGunSize = {
        width: 6,
        height: 40
    };
    
    // Global variables
    var velocity;
    var goUp;
    var goDown;
    var goRight;
    var goLeft;
    var gun;
    
    var p = createjs.extend(StrictyBoy, createjs.Container);
    
    // Constructor
    function StrictyBoy(stageSize, size) {
        this.shape = new createjs.Shape();
        this.gun = new createjs.Shape();
        this.size = size || { width: defaultSize.width, height: defaultSize.height };
        this._stageSize = stageSize;
        this.goUp = this.goDown = this.goRight = this.goLeft = false;
        velocity = 100; // Pixels per second
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
            .drawRect(0, 0, defaultGunSize.width, defaultGunSize.height); 
        
        this.gun.x = this.shape.x + (this.size.width / 2);
        this.gun.y = this.shape.y + (this.size.height / 2);  
        //Rotation point 
        this.gun.regX = defaultGunSize.width/2;
        this.gun.regY = defaultGunSize.height;
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
    
    // Event fires on mouse movement
    p.handleMouseMove = function handleMouseMove(event){
        updateGun(this);
    }
    
    // Event fires on each tick
    p.tickEvent = function tickEvent(event){
        
        // Move velocity pixels per second
        // (elapsed time MS / 1 second * amount of pixel per second)
        var movement = event.delta/1000*velocity;
        
        // Vertical movement
        if(goUp){
            if (this.shape.y > movement){
                this.shape.y -= movement;
                this.gun.y -= movement;
            } else {
                this.shape.y = 0; 
                this.gun.y = (this.size.height / 2); 
            }                
        }else if(goDown){
            if (this.shape.y + this.size.height < this._stageSize.height){
                 this.shape.y += movement;
                 this.gun.y += movement;
            } else {
                this.shape.y = this._stageSize.height - this.size.height;
                this.gun.y = this._stageSize.height - (this.size.height / 2) ;
            }                
        }
        
        // Horizontal movement
        if(goRight){
            if (this.shape.x + this.size.width < this._stageSize.width)
            {
                this.shape.x += movement;
                this.gun.x += movement;
            } else {
                this.shape.x = this._stageSize.width - this.size.width;
                this.gun.x = this._stageSize.width - (this.size.width / 2);
            }
        }else if(goLeft){
            if (this.shape.x > movement){
                this.shape.x -= movement;
                this.gun.x -= movement;
            } else {
                this.shape.x = 0; 
                this.gun.x = (this.size.width / 2); 
            }                
        }     
        
        // Update gun angle
        updateGun(this);           
    }
    
    // Update gun rotation
    function updateGun(currentStrictyBoy){
        var coteX = stage.mouseX - currentStrictyBoy.gun.x;
        var coteY = currentStrictyBoy.gun.y - stage.mouseY;
        var angle = Math.atan(coteX/coteY) * (180 / Math.PI);
        if (coteY < 0){
            angle = 180 + angle;
        }
        currentStrictyBoy.gun.rotation = angle;
    }
    
    return StrictyBoy;
})();