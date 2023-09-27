/**
* MyAnimation
* @constructor
*/

class Animation {
    constructor(scene) {
        this.scene = scene;

    }

    update(t) {
        throw new Error("error in time update");
    }

    apply() {
        throw new Error("error applying animation");
    }
}