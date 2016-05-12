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
    var STRICTYBOY_SPEED = 200;
    var PROJECTILE_SPEED = 800;
    var goUp;
    var goDown;
    var goRight;
    var goLeft;
    var jump;
    var gun;
    var shapeYInitialValue;
    var shapeCanJump = true;
    var gravityValue = 0;
    
    var p = createjs.extend(StrictyBoy, createjs.Container);

    // Event fires on mouse movement
    p.handleMouseMove = function handleMouseMove(event){
        this.updateGun();
    };
    
    p.handleMouseDown = function (event) {
        this.shoot();
    };
    
    // Event fires on each tick
    p.tickEvent = function tickEvent(event){    
        // Handle keys and move the boy
        this.handleMoves(event);
        
        // Update gun rotation
        this.updateGun();    
        
        // Update projectiles
        this.updateProjectiles(event);
    };
    
    // Constructor
    function StrictyBoy(stageSize, size) {
        this.shape = new createjs.Shape();
        this.gun = new createjs.Shape();
        this.projectiles = [];
        this.size = size || { width: defaultSize.width, height: defaultSize.height };
        this._stageSize = stageSize;
        this.goUp = this.goDown = this.goRight = this.goLeft = false;
    }
    
    // Initialisation
    StrictyBoy.prototype.init = function() {
        // StrictyBoy
        this.shape.graphics
            .beginFill("Yellow")
            .drawRect(0, 0, this.size.width, this.size.height);
                
        this.shape.x = (this._stageSize.width / 2) - (this.size.width / 2);
        this.shape.y =  this._stageSize.height - this.size.height - groundHeight;    
        shapeYInitialValue = this.shape.y;
            
        // Gun         
        this.gun.graphics
            .beginFill("Yellow")
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
    StrictyBoy.prototype.jump = function() { jump = true; }
    
    // Stopping to move on a direction
    StrictyBoy.prototype.moveRightStop = function() { goRight = false; }    
    StrictyBoy.prototype.moveLeftStop = function() { goLeft = false; }    
    StrictyBoy.prototype.moveUpStop = function() { goUp = false;  shapeCanJump = false;}    
    StrictyBoy.prototype.moveDownStop = function() { goDown = false; }
        
    StrictyBoy.prototype.handleMoves = function(event) {
        var movement = getActualVelocity(event.delta, STRICTYBOY_SPEED);
        
        // Vertical movement
        if((goUp || jump) && shapeCanJump){
            if (this.shape.y > movement){
                this.shape.y -= movement * 2.5;
            } else {
                this.shape.y = 0; 
            }               
        }else if(goDown){
            if (this.shape.y + this.size.height < this._stageSize.height - groundHeight){
                 this.shape.y += movement;
            } else {
                this.shape.y = this._stageSize.height - this.size.height - groundHeight;
            }                
        }
        
        // Horizontal movement
        if(goRight){
            if (this.shape.x + this.size.width < this._stageSize.width){
                this.shape.x += movement;
            } else {
                this.shape.x = this._stageSize.width - this.size.width;
            }
        }else if(goLeft){
            if (this.shape.x > movement){
                this.shape.x -= movement;
            } else {
                this.shape.x = 0; 
            }                
        }
        
        //Gravity
        if (this.shape.y + this.size.height < this._stageSize.height - groundHeight){
            this.shape.y = this.shape.y + gravityValue;
            gravityValue += gravityIncrement;
            if (this.shape.y > shapeYInitialValue){
                this.shape.y = shapeYInitialValue;
                gravityValue = 0;
                shapeCanJump = true;
                jump = false;
            }
        }else{
            this.shape.y = shapeYInitialValue;
            gravityValue = 0;
            shapeCanJump = true;
            jump = false;
        }
        
        // Update gun position
        this.gun.x = this.shape.x + (this.size.width / 2);
        this.gun.y = this.shape.y + (this.size.height / 2);   
    }
    
    // Update gun rotation
    StrictyBoy.prototype.updateGun = function() {
        var coteX = stage.mouseX - this.gun.x;
        var coteY = this.gun.y - stage.mouseY;
        var rotation = Math.atan(coteX/coteY) * (180 / Math.PI);
        
        if (coteY < 0){
            rotation = 180 + rotation;
        }
        
        this.gun.rotation = rotation;
    }
    
    // update projectiles
    StrictyBoy.prototype.updateProjectiles = function(event) {    
        var actualVelocity = getActualVelocity(event.delta, PROJECTILE_SPEED); 
        var projectilesToBeDeleted = [];   
        for(var i = 0; i < this.projectiles.length; i++){
            var projectile = this.projectiles[i];
            
            // Note: convert to radian as Math.sin expect radian and not degrees...
            var radianAngle = trigo.angleToRadian(projectile.rotation);
            projectile.x += Math.sin(radianAngle) * actualVelocity;
            projectile.y -= Math.cos(radianAngle) * actualVelocity;
            
            // Every projectile out of bounds can be deleted
            if ((projectile.y < 0 || projectile.y > stageSize.height) || (projectile.x < 0 || projectile.x > stageSize.width)){
                projectilesToBeDeleted.push(i);
            }            
        }
        
        // Every projectile out of bounds is deleted and remove from the stage
        for(var i = projectilesToBeDeleted.length - 1; i >= 0; i--){
            var aDeletedProjectile = this.projectiles.splice(projectilesToBeDeleted[i],1);
            stage.removeChild(aDeletedProjectile[0]);
        }
    }
    
    // KILL THEM ALL
    StrictyBoy.prototype.shoot = function() {        
        var shape = new createjs.Shape();
        shape.graphics
            .beginFill("#FF0000")
            .drawRect(0, 0, 5, 9);
            
        shape.x = this.gun.x;
        shape.y = this.gun.y;
        // x & y at end of gun
        var radianAngle = trigo.angleToRadian(this.gun.rotation);
        var height = this.gun.graphics.command.h;
        shape.x += (Math.sin(radianAngle) * height);
        shape.y -= (Math.cos(radianAngle) * height);
        
        shape.rotation = this.gun.rotation;
        
        this.projectiles.push(shape);
        stage.addChild(shape);
    };
    
    function getActualVelocity(delta, speed) {
        // Move velocity pixels per second
        // (elapsed time MS / 1 second * amount of pixel per second)
        return delta/1000*speed;
    }
    
    return StrictyBoy;
})();