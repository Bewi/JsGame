var stage;
var stageSize = {
    width: 500,
    height: 400
}

var strictyBoy;
var actionsKeyMap;

function init() {
    document.onkeydown = handleKeys;
    
    stage = new createjs.Stage("demoCanvas");
    stage.canvas.width = stageSize.width;
    stage.canvas.height = stageSize.height;
    
    strictyBoy = new StrictyBoy(stageSize); // stageSize, size
    strictyBoy.init();                
                    
    stage.addChild(strictyBoy.shape);
    
    initActionsKeyMap();
    
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

// Note: moved initialisation here to be sure that actors are instantiated.
function initActionsKeyMap() {
    actionsKeyMap = {
        37: {
            actor: strictyBoy,
            action: strictyBoy.moveLeft
        },
        39: {
            actor: strictyBoy,
            action: strictyBoy.moveRight
        },
        38: {
            actor: strictyBoy,
            action: strictyBoy.moveUp
        },
        40: {
            actor: strictyBoy,
            action: strictyBoy.moveDown
        }
    }
}

function handleKeys(event) {
    var actionKeyMap = actionsKeyMap[event.keyCode];
    if (!actionKeyMap)
        return;
        
    actionKeyMap.action.call(actionKeyMap.actor);
}