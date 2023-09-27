/**
* KeyframeAnimation
* @constructor
*/

class KeyframeAnimation extends Animation {

    constructor(scene, id) {
        super(scene, id);
        this.id = id;
        this.scene = scene;
        this.transfMatrix = mat4.create();
        this.keyFrames = []; //List with the keyframes
        this.initialTime = 0;
        this.currentTime; //Current time
        this.stage = 0; //Stages of the keyframe

        this.startedMovement = false;
        
    }

    aux_interpolate(i, f, p){
        return i + (f-i) * p;
    }


    addKeyFrame(kf){

        if (this.keyFrames.length == 0){
            this.keyFrames.push(kf);
            return;
        }
        
        if (kf.instant > this.keyFrames[this.keyFrames.length-1].instant){
            this.keyFrames.push(kf);
        }
    }


    update(t) {

        if(this.initialTime == 0) this.initialTime = t;

        this.currentTime = (t - this.initialTime)/1000;

        if(this.currentTime >= this.keyFrames[0].instant) this.startedMovement = true;

        if(this.stage < this.keyFrames.length - 1){
            if(this.currentTime >= this.keyFrames[this.stage+1].instant){
                this.stage++;
            }
        }

        if(this.stage == this.keyFrames.length-1){
            this.transfMatrix = mat4.create();
            this.transfMatrix = mat4.translate(this.transfMatrix, this.transfMatrix, [this.keyFrames[this.stage].translation[0], this.keyFrames[this.stage].translation[1], this.keyFrames[this.stage].translation[2]]);
            this.transfMatrix = mat4.rotate(this.transfMatrix, this.transfMatrix, this.keyFrames[this.stage].rotation[0], [1,0,0]);
            this.transfMatrix = mat4.rotate(this.transfMatrix, this.transfMatrix, this.keyFrames[this.stage].rotation[1], [0,1,0]);
            this.transfMatrix = mat4.rotate(this.transfMatrix, this.transfMatrix, this.keyFrames[this.stage].rotation[2], [0,0,1]);
            this.transfMatrix = mat4.scale(this.transfMatrix, this.transfMatrix, [this.keyFrames[this.stage].scale[0], this.keyFrames[this.stage].scale[1], this.keyFrames[this.stage].scale[2]]);
            return;
        }

        var p = (this.currentTime - this.keyFrames[this.stage].instant) / (this.keyFrames[this.stage+1].instant - this.keyFrames[this.stage].instant);

        var trans_x = this.aux_interpolate(this.keyFrames[this.stage].translation[0], this.keyFrames[this.stage+1].translation[0], p);
        var trans_y = this.aux_interpolate(this.keyFrames[this.stage].translation[1], this.keyFrames[this.stage+1].translation[1], p);
        var trans_z = this.aux_interpolate(this.keyFrames[this.stage].translation[2], this.keyFrames[this.stage+1].translation[2], p);

        var rot_x = this.aux_interpolate(this.keyFrames[this.stage].rotation[0], this.keyFrames[this.stage+1].rotation[0],p);
        var rot_y = this.aux_interpolate(this.keyFrames[this.stage].rotation[1], this.keyFrames[this.stage+1].rotation[1],p);
        var rot_z = this.aux_interpolate(this.keyFrames[this.stage].rotation[2], this.keyFrames[this.stage+1].rotation[2],p);

        var scale_x = this.aux_interpolate(this.keyFrames[this.stage].scale[0], this.keyFrames[this.stage+1].scale[0], p);
        var scale_y = this.aux_interpolate(this.keyFrames[this.stage].scale[1], this.keyFrames[this.stage+1].scale[1], p);
        var scale_z = this.aux_interpolate(this.keyFrames[this.stage].scale[2], this.keyFrames[this.stage+1].scale[2], p);

        this.transfMatrix = mat4.create();
        this.transfMatrix = mat4.translate(this.transfMatrix, this.transfMatrix, [trans_x,trans_y,trans_z]);
        this.transfMatrix = mat4.rotate(this.transfMatrix, this.transfMatrix, rot_x, [1,0,0]);
        this.transfMatrix = mat4.rotate(this.transfMatrix, this.transfMatrix, rot_y, [0,1,0]);
        this.transfMatrix = mat4.rotate(this.transfMatrix, this.transfMatrix, rot_z, [0,0,1]);
        this.transfMatrix = mat4.scale(this.transfMatrix, this.transfMatrix, [scale_x,scale_y,scale_z]);

        

    }

    apply() {
        this.scene.multMatrix(this.transfMatrix);
    }



}