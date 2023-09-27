/**
* MySpriteAnimation
* @constructor
*/

class MySpriteAnimation{
    constructor(scene, spriteSheet, initCell, endCell, duration) {
        this.scene = scene;
        this.spriteSheet = spriteSheet;
        //console.log(this.spriteSheet);
        this.initCell = initCell;
        this.endCell = endCell;
        this.actualCell = initCell;
        this.duration = duration;

        this.rectangle = new MyRectangle(scene,0,0,1,1);
        
        this.timeElapsed = this.duration*1000/(this.endCell-this.initCell);

        this.previousTime = 0;
    }

    update(time) {
    
        if(this.actualCell == this.endCell){
            this.spriteSheet.activeCellP(this.actualCell);
            return;
        }

        if((time-this.previousTime) >= this.timeElapsed){
            this.actualCell++;
            this.spriteSheet.activeCellP(this.actualCell);
            this.previousTime = time;
        }

    }

    display() {
        
        this.scene.pushMatrix();

        this.scene.setActiveShaderSimple(this.spriteSheet.sprite_shader);
        
        
        this.spriteSheet.sprite_texture.bind();
        
        
        this.rectangle.display();

        this.spriteSheet.sprite_texture.unbind();

        this.scene.setActiveShaderSimple(this.scene.defaultShader);

        this.scene.popMatrix();

    }

    updateTexCoords(afs, aft){}

}
