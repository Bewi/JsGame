// Constants
var stageSize = {
    width: 1500,
    height: 600
};

// Global variables
var stage;
var gunScope;
var strictyBoy;
var world;
var loader;

function init() {
    
    manifest = [
		{src: "sky.png", id: "sky"},
		{src: "ground.png", id: "ground"},
		{src: "platform.png", id: "platform"},
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
        
    // World
    world = new World(stageSize);
    world.init();
    for (var i = 0; i < world.shapes.length; i++) {
        stage.addChild(world.shapes[i]);
    }
    
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

