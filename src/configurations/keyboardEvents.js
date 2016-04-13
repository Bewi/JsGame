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
    };
    
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
    };
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