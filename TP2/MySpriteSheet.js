/**
* MySpriteSheet
* @constructor
*/


class MySpriteSheet {
    constructor(scene,texture,sizeM,sizeN) {
        this.scene = scene;
        this.texture = texture;
        this.sizeM = sizeM;
        this.sizeN = sizeN;

        this.sprite_shader = new CGFshader(this.scene.gl,'scenes/shaders/sprite.vert','scenes/shaders/sprite.frag');
        this.sprite_texture = new CGFtexture(this.scene,this.texture);

        this.sprite_shader.setUniformsValues({sizeM:sizeM});
        this.sprite_shader.setUniformsValues({sizeN:sizeN});
        this.sprite_shader.setUniformsValues({uSampler1:0});
    }

    activateCellMN(m, n) {
        this.sprite_shader.setUniformsValues({actualM:m});
        this.sprite_shader.setUniformsValues({actualN:n});
        
    }

    activeCellP(p) {
        var curM = p % this.sizeM;
        var curN = Math.floor(p / (this.sizeN));
        this.activateCellMN(curM,curN);
    }
    
}
