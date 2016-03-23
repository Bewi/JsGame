function handleMouseDown(event){
    
}

function handleMouseUp(event){
    
}

function handleMouseMove(event){
    gunScope.x = stage.mouseX;
	gunScope.y = stage.mouseY;

    strictyBoy.handleMouseMove(event);
    stage.update();
}
