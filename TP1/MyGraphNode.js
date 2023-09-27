class MyGraphNode{
    constructor(nodeID, graph){
        this.nodeID = nodeID;
        this.graph = graph;
        this.material = null;
        this.texture = null;
        this.afs= null;
        this.aft = null;
        this.animation = null;
        this.children = [];
        this.leaves = [];
        this.amplified = false;
        this.transformMatrix = mat4.create();
        mat4.identity(this.transformMatrix);
    }

    addChildLeave(leaf){
        this.leaves.push(leaf);
    }

    addChildNode(nodeID){
        this.children.push(nodeID);
    }

    display(FatherMaterial, FatherTexture){
        this.graph.scene.multMatrix(this.transformMatrix);

        var currentMaterial = FatherMaterial;
        var currentTexture = FatherTexture;

        if (this.material != null) currentMaterial = this.material;
        if (this.texture != null) currentTexture = this.texture;

        if(this.texture=="clear") currentTexture=null;


        for (var i = 0; i < this.leaves.length; i++){
            //console.log(currentMaterial);
            if (currentTexture != null && !this.amplified){
                this.leaves[i].primitive.updateTexCoords(this.afs, this.aft);
                this.amplified = true;
            }
            currentMaterial.setTexture(currentTexture);
            currentMaterial.apply();
            this.leaves[i].display();
        }
        
        for (var j = 0; j < this.children.length; j++){
            this.graph.scene.pushMatrix();
            
            if (this.graph.nodes[this.children[j]] != null) {
                this.graph.nodes[this.children[j]].display(currentMaterial, currentTexture);
            }
            else this.graph.onXMLMinorError("Noderef ID is not defined.");

            this.graph.scene.popMatrix();
        }
    }

}