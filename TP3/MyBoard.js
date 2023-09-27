/**
* MyBoard
* @constructor
*/
class MyBoard extends CGFobject {
    constructor(scene) {
        super(scene);
        this.board = new MyPlane(this.scene, 10, 10);
        
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
        
        this.greenMaterial = new CGFappearance(this.scene);
        this.greenMaterial.setShininess(1.0);
        this.greenMaterial.setAmbient(0, 1, 0, 0.1);
        this.greenMaterial.setDiffuse(0, 1, 0, 0.1);
        this.greenMaterial.setSpecular(0, 1, 0, 0.1);
        this.greenMaterial.setEmission(0, 1, 0, 0.5); 

        this.blueMaterial = new CGFappearance(this.scene);
        this.blueMaterial.setShininess(1.0);
        this.blueMaterial.setAmbient(0.3, 0.9, 1.0, 1);
        this.blueMaterial.setDiffuse(0.3, 0.9, 1.0, 1);
        this.blueMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.blueMaterial.setEmission(0.1, 0.1, 0.1, 1); 
        
        /*this.tiles = [
            [new MyTile(this.scene, 1, 1, this,["green"]), new MyTile(this.scene, 2, 1, this,["white"]), new MyTile(this.scene, 3, 1, this, ["black"]), new MyTile(this.scene, 4, 1, this, ["green"]), new MyTile(this.scene, 5, 1, this, ["black"]), new MyTile(this.scene, 6, 1, this, ["green"])],
            [new MyTile(this.scene, 1, 2, this,["black"]), new MyTile(this.scene, 2, 2, this, ["green"]), new MyTile(this.scene, 3, 2, this, ["green"]), new MyTile(this.scene, 4, 2, this, ["white"]), new MyTile(this.scene, 5, 2, this, ["green"]), new MyTile(this.scene, 6, 2, this, ["white"])],
            [new MyTile(this.scene, 1, 3, this, ["green"]), new MyTile(this.scene, 2, 3, this, ["white"]), new MyTile(this.scene, 3, 3, this,["black"]), new MyTile(this.scene, 4, 3, this, ["green"]), new MyTile(this.scene, 5, 3, this, ["black"]), new MyTile(this.scene, 6, 3, this, ["green"])],
            [new MyTile(this.scene, 1, 4, this, ["black"]), new MyTile(this.scene, 2, 4, this, ["white"]), new MyTile(this.scene, 3, 4, this,["green"]), new MyTile(this.scene, 4, 4, this, ["green"]), new MyTile(this.scene, 5, 4, this, ["green"]), new MyTile(this.scene, 6, 4, this, ["white"])],
            [new MyTile(this.scene, 1, 5, this, ["green"]), new MyTile(this.scene, 2, 5, this, ["green"]), new MyTile(this.scene, 3, 5, this, ["green"]), new MyTile(this.scene, 4, 5, this, ["green"]), new MyTile(this.scene, 5, 5, this, ["white"]), new MyTile(this.scene, 6, 5, this, ["black"])],
            [new MyTile(this.scene, 1, 6, this, ["white"]), new MyTile(this.scene, 2, 6, this, ["white"]), new MyTile(this.scene, 3, 6, this, ["black"]), new MyTile(this.scene, 4, 6, this, ["green"]), new MyTile(this.scene, 5, 6, this, ["black"]), new MyTile(this.scene, 6, 6, this, ["green"])]
        ];*/

        this.tiles = [
            [new MyTile(this.scene, 1, 1, this,["empty"]), new MyTile(this.scene, 2, 1, this,["empty"]), new MyTile(this.scene, 3, 1, this, ["black"]), new MyTile(this.scene, 4, 1, this, ["empty"]), new MyTile(this.scene, 5, 1, this, ["black"]), new MyTile(this.scene, 6, 1, this, ["empty"])],
            [new MyTile(this.scene, 1, 2, this,["empty"]), new MyTile(this.scene, 2, 2, this, ["empty"]), new MyTile(this.scene, 3, 2, this, ["empty"]), new MyTile(this.scene, 4, 2, this, ["empty"]), new MyTile(this.scene, 5, 2, this, ["empty"]), new MyTile(this.scene, 6, 2, this, ["empty"])],
            [new MyTile(this.scene, 1, 3, this, ["empty"]), new MyTile(this.scene, 2, 3, this, ["empty"]), new MyTile(this.scene, 3, 3, this,["empty"]), new MyTile(this.scene, 4, 3, this, ["empty"]), new MyTile(this.scene, 5, 3, this, ["empty"]), new MyTile(this.scene, 6, 3, this, ["empty"])],
            [new MyTile(this.scene, 1, 4, this, ["empty"]), new MyTile(this.scene, 2, 4, this, ["empty"]), new MyTile(this.scene, 3, 4, this,["empty"]), new MyTile(this.scene, 4, 4, this, ["empty"]), new MyTile(this.scene, 5, 4, this, ["empty"]), new MyTile(this.scene, 6, 4, this, ["empty"])],
            [new MyTile(this.scene, 1, 5, this, ["empty"]), new MyTile(this.scene, 2, 5, this, ["empty"]), new MyTile(this.scene, 3, 5, this, ["green"]), new MyTile(this.scene, 4, 5, this, ["green"]), new MyTile(this.scene, 5, 5, this, ["white"]), new MyTile(this.scene, 6, 5, this, ["empty"])],
            [new MyTile(this.scene, 1, 6, this, ["white"]), new MyTile(this.scene, 2, 6, this, ["white"]), new MyTile(this.scene, 3, 6, this, ["empty"]), new MyTile(this.scene, 4, 6, this, ["green"]), new MyTile(this.scene, 5, 6, this, ["black"]), new MyTile(this.scene, 6, 6, this, ["green"])]
        ];

        //console.log(this.tiles);
    }

    updateBoard(newBoard){
        var auxCol = 0;
        var auxRow = 0;

        for(let i = 0; i < newBoard.length; i++){
            if(auxRow == 6) break;

            this.tiles[auxRow][auxCol].setStack(newBoard[i]);

            if(auxCol == 5){
                auxCol = 0;
                auxRow += 1;
            }
            else{
                auxCol += 1;
            }
        }

        //console.log(this.scene.gameOrchestrator.board.tiles.stack);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(4.45,1.62,4.25);
        this.scene.scale(2, 2, 2);
        this.blueMaterial.apply();
        this.board.display();
        this.scene.popMatrix();

        for(let x = 0; x < 6; x++){
            for(let y = 0; y < 6; y++){
                this.tiles[x][y].display(); 
            }
        }
    }
}