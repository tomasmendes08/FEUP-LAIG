/**
* MySpriteText
* @constructor
*/

class MySpriteText {
    constructor(scene,text) {
        this.scene = scene;
        this.text = text;
        this.sprite_sheet = new MySpriteSheet(this.scene,"./scenes/images/font.png",16,16);
        this.rectangles = [];

        for (var i = 0; i < text.length; i++) {
			this.rectangles.push(new MyRectangle(scene,0,0,1,1));
		}
        
    }

    getCharacterPosition(character) {
        return character.charCodeAt(0);
    }

    display() {
        
        this.scene.pushMatrix();
        this.scene.setActiveShaderSimple(this.sprite_sheet.sprite_shader);
        this.sprite_sheet.sprite_texture.bind();
        for (var i in this.text) {
            var cellPosition;
            const char1 = this.text[i];
            cellPosition = this.getCharacterPosition(char1);
            this.sprite_sheet.activeCellP(cellPosition);
            this.scene.translate(1,0,0);
            this.rectangles[i].display();
        }
        this.sprite_sheet.sprite_texture.unbind();
        this.scene.setActiveShaderSimple(this.scene.defaultShader);
        this.scene.popMatrix();
        
    }

    updateTexCoords(afs, aft){}
}