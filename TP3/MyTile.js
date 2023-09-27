/**
 * MyTile
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTile extends CGFobject {
    constructor(scene, col, row, board, stack) {
        super(scene);
        this.column = col;
        this.row = row;
        this.board = board;
        
        this.stack = stack;
        //console.log(this.stack);

        this.whiteMaterial = new CGFappearance(this.scene);
        this.whiteMaterial.setShininess(0.1);
        this.whiteMaterial.setAmbient(1.0, 1.0, 0.9, 1);
        this.whiteMaterial.setDiffuse(1.0, 1.0, 0.9, 1);
        this.whiteMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.whiteMaterial.setEmission(0.1, 0.1, 0.1, 1);
        
        this.blackMaterial = new CGFappearance(this.scene);
        this.blackMaterial.setShininess(1.0);
        this.blackMaterial.setAmbient(0, 0, 0, 1);
        this.blackMaterial.setDiffuse(0, 0, 0, 1);
        this.blackMaterial.setSpecular(0, 0, 0, 1);
        this.blackMaterial.setEmission(0, 0, 0, 1);

        this.blackMaterial2 = new CGFappearance(this.scene);
        this.blackMaterial2.setShininess(1.0);
        this.blackMaterial2.setAmbient(0, 0, 0, 0.1);
        this.blackMaterial2.setDiffuse(0, 0, 0, 0.1);
        this.blackMaterial2.setSpecular(0, 0, 0, 0.1);
        this.blackMaterial2.setEmission(0, 0, 0, 0.1);
        
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setShininess(1.0);
        this.greenMaterial.setAmbient(0, 1, 0, 0.1);
        this.greenMaterial.setDiffuse(0, 1, 0, 0.1);
        this.greenMaterial.setSpecular(0, 1, 0, 0.1);
        this.greenMaterial.setEmission(0, 1, 0, 0.5); 

        /*if(stack.length != 0){
            //console.log("aqui");
            this.displayPieces();
        }*/
        
        this.tile = new MyPlane(this.scene, 1, 1);
    }

    setStack(stack) {
        this.stack = stack;
    }

    removeStack() {
        if (this.stack != null)
            this.stack = null;
        else console.log("There is no stack to remove on tile " + this.column + ", " + this.row);
    }

    getStack() {
        return this.stack;
    }

    displayPieces(){
        var height = 0.25;
        if(this.stack.length > 1){
            for(let i = 0; i < this.stack.length; i++){
                //console.log(i);
                this.scene.pushMatrix();
                var piece = new MySphere(this.scene, 0.2, 64, 64);
                if(this.stack[i] == "green"){
                    this.greenMaterial.apply();
                }
                else if(this.stack[i] == "black"){
                    this.blackMaterial.apply();
                }
                else if(this.stack[i] == "white"){
                    this.whiteMaterial.apply();
                }

                if(i == 0) this.scene.translate(0, 0.25, 0);
                else {
                    height += 0.25;
                    this.scene.translate(0, height, 0);
                }
                piece.display();
                this.scene.popMatrix();
            }
        }
        else if(this.stack.length == 1){
            this.scene.pushMatrix();
            var piece = new MySphere(this.scene, 0.2, 64, 64);
            if(this.stack[0] == "green"){
                this.greenMaterial.apply();
            }
            else if(this.stack[0] == "black"){
                
                this.blackMaterial.apply();
            }
            else if(this.stack[0] == "white"){
                this.whiteMaterial.apply();
            }
            
            this.scene.translate(0, 0.25, 0);
            
            if(this.stack[0] != "empty") piece.display();
            
            this.scene.popMatrix();
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.column * 0.3, 1.63, this.row * 0.3);
        this.scene.scale(0.2, 0.2, 0.2);
        this.scene.translate(17,0,16);

        
        this.scene.registerForPick(this.column * 10 + this.row, this.tile);
        //this.scene.clearPickRegistration();
        
        
        this.blackMaterial2.apply();
        this.tile.display();
        this.displayPieces();
        this.scene.clearPickRegistration();
        this.scene.popMatrix();
    }

}