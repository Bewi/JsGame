if (!window.trigo) {
    window.trigo = {};
}

trigo.angleToRadian = function(angle) {
    return angle * (Math.PI / 180);
};

trigo.radianToAngle = function(radian) {
    return angle * (180 / Math.PI);
};