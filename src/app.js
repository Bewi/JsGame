
var KEYCODE_ENTER = 13;		//useful keycode
var KEYCODE_SPACE = 32;		//useful keycode
var KEYCODE_UP = 38;		//useful keycode
var KEYCODE_LEFT = 37;		//useful keycode
var KEYCODE_RIGHT = 39;		//useful keycode
var KEYCODE_DOWN = 40;		//useful keycode
var KEYCODE_W = 87;			//useful keycode
var KEYCODE_A = 65;			//useful keycode
var KEYCODE_D = 68;			//useful keycode


var stage;
var stageSize = {
    width: 500,
    height: 400
}

var gunScope;
var gunDirection;
var strictyBoy;
var actionsKeyMap;

function init() {
    document.onkeydown = handleKeysDown;
    document.onkeyup = handleKeysUp;
    
    stage = new createjs.Stage("demoCanvas");
    stage.canvas.width = stageSize.width;
    stage.canvas.height = stageSize.height;
    
    stage.addEventListener("stagemousedown", handleMouseDown);
	stage.addEventListener("stagemouseup", handleMouseUp);
	stage.addEventListener("stagemousemove", handleMouseMove);
    
    strictyBoy = new StrictyBoy(stageSize); // stageSize, size
    strictyBoy.init();
    stage.addChild(strictyBoy.shape);
    stage.addChild(strictyBoy.gun);
        
    // Gun scope    
	gunScope = new createjs.Shape(new createjs.Graphics().beginFill("#123456").drawCircle(0, 0, 10));
	gunScope.cursor = "pointer";
	stage.addChild(gunScope);
    
    stage.update();
    initActionsKeyMap();
    
    //createjs.Ticker.setFPS(60);
    //createjs.Ticker.addEventListener("tick", stage);
    //start game timer
	if (!createjs.Ticker.hasEventListener("tick")) {
		createjs.Ticker.addEventListener("tick", tickEvent);
	}
}

function tickEvent(event){
    strictyBoy.tickEvent(event);
    stage.update(event);
}

function handleMouseDown(event){
    
}

function handleMouseUp(event){
    
}

function handleMouseMove(event){
    gunScope.x = stage.mouseX;
	gunScope.y = stage.mouseY;

    stage.update();
}

// Note: moved initialisation here to be sure that actors are instantiated.
function initActionsKeyMap() {
    actionsKeyDownMap = {
        37: { //KEYCODE_LEFT
            actor: strictyBoy,
            action: strictyBoy.moveLeft
        },
        38: { //KEYCODE_UP
            actor: strictyBoy,
            action: strictyBoy.moveUp
        },
        39: { //KEYCODE_RIGHT
            actor: strictyBoy,
            action: strictyBoy.moveRight
        },
        40: { //KEYCODE_DOWN
            actor: strictyBoy,
            action: strictyBoy.moveDown
        }
    }
    actionsKeyUpMap = {
        37: { //KEYCODE_LEFT
            actor: strictyBoy,
            action: strictyBoy.moveLeftStop
        },
        38: { //KEYCODE_UP
            actor: strictyBoy,
            action: strictyBoy.moveUpStop
        },
        39: { //KEYCODE_RIGHT
            actor: strictyBoy,
            action: strictyBoy.moveRightStop
        },
        40: { //KEYCODE_DOWN
            actor: strictyBoy,
            action: strictyBoy.moveDownStop
        }
    }
}

function handleKeysDown(event) {
    //cross browser issues exist
	if (!event) {
		var event = window.event;
	}
    
    var actionKeyMap = actionsKeyDownMap[event.keyCode];
    if (!actionKeyMap)
        return;
        
    actionKeyMap.action.call(actionKeyMap.actor);
}

function handleKeysUp(event) {
    //cross browser issues exist
	if (!event) {
		var event = window.event;
	}
    
    var actionKeyMap = actionsKeyUpMap[event.keyCode];
    if (!actionKeyMap)
        return;
        
    actionKeyMap.action.call(actionKeyMap.actor);
}