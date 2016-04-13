// Constants
var stageSize = {
    width: 500,
    height: 400
};

// Global variables
var stage;
var gunScope;
var strictyBoy;
var ground;
var loader;

function init() {
    
    manifest = [
		{src: "ground.png", id: "ground"},
	];
    
    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "art/");
}

function handleComplete() {  
    // Create js global config
    createjs.Ticker.setFPS(120);
    
    // Stage
    stage = new createjs.Stage("demoCanvas");
    stage.canvas.width = stageSize.width;
    stage.canvas.height = stageSize.height;
    
    // Ground
    ground = new Ground(stageSize);
    ground.init();
    stage.addChild(ground.shape);
    
    // StrictyBoy
    strictyBoy = new StrictyBoy(stageSize);
    strictyBoy.init();
    stage.addChild(strictyBoy.gun);
    stage.addChild(strictyBoy.shape);
        
    // Gun scope    
	gunScope = new createjs.Shape(new createjs.Graphics().beginFill("#123456").drawCircle(0, 0, 10));
	gunScope.cursor = "pointer";
	stage.addChild(gunScope);
    
    // Mouse events
    stage.addEventListener("stagemousedown", handleMouseDown);
	stage.addEventListener("stagemouseup", handleMouseUp);
	stage.addEventListener("stagemousemove", handleMouseMove);
    
    // Keyboard events
    document.onkeydown = handleKeysDown;
    document.onkeyup = handleKeysUp;
    initActionsKeyMap();
    
    // Tick events
	if (!createjs.Ticker.hasEventListener("tick")) {
		createjs.Ticker.addEventListener("tick", tickEvent);
	}
}

function tickEvent(event){
    strictyBoy.tickEvent(event);
    stage.update(event);
}

