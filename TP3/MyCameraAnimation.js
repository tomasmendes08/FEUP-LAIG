/**
* MyCameraAnimation
* @constructor
*/

class MyCameraAnimation {
    constructor(scene,currentTime,time) {
        this.scene = scene;
        this.previousTime = currentTime;
        this.time = time;
        this.currentAngle = 0;
    }

    update(currentTime) {
        if (this.currentAngle >= Math.PI) return true;
        const angle = Math.PI;

        const timeRatio = (currentTime - this.previousTime) / this.time;
        let increment = angle * timeRatio;
        this.currentAngle += increment;
        this.previousTime = currentTime;

        if (this.currentAngle > Math.PI) increment -= this.currentAngle - Math.PI;

        const camera = this.scene.cameras.defaultCamera;

        camera.orbit({X: (1,0,0), Y: (0,1,0), Z: (0,0,1)},increment);
    }
}