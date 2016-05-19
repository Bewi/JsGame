if (!window.physics) {
    window.physics = {};
}

physics.getAcceleration = function (delta, speed) {
    return Math.pow(delta, 2) / 1000 * speed / 2;
};