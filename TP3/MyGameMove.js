class MyGameMove extends CGFobject {
    constructor(scene, stack, startTile, endTile, board){
        super(scene);
        this.stack = stack;
        this.startTile = startTile;
        this.endTile = endTile;
        this.board = board;
    }

    animate() {
        this.scene.gameOrchestrator.animator.animate(this);
    }
}