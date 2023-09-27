class MyGraphLeaf{

    constructor(graph, leafType, dimensions){
        this.graph = graph;
        this.leafType = leafType;
        this.primitive = null;
        
        if (leafType == "rectangle"){
            this.primitive = new MyRectangle(this.graph.scene, dimensions[0], dimensions[1], dimensions[2], dimensions[3]);
        }
        else if (leafType == "triangle"){
            this.primitive = new MyTriangle(this.graph.scene, dimensions[0], dimensions[1], dimensions[2], dimensions[3], dimensions[4], dimensions[5]);
        }
        else if (leafType == "sphere"){
            this.primitive = new MySphere(this.graph.scene, dimensions[0], dimensions[1], dimensions[2]);
        }
        else if (leafType == 'cylinder'){
            this.primitive = new MyCylinder(this.graph.scene, dimensions[0], dimensions[1], dimensions[2], dimensions[3], dimensions[4]);
        }
        else if (leafType == 'torus'){
            this.primitive = new MyTorus(this.graph.scene, dimensions[0], dimensions[1], dimensions[2], dimensions[3]);
        }
        else if(leafType == 'spriteanim'){
            this.primitive = new MySpriteAnimation(dimensions[0], dimensions[1], dimensions[2], dimensions[3], dimensions[4]);
            this.graph.spriteSheetAnimations.push(this.primitive);
            //console.log(dimensions[0]);
            //console.log(this.primitive);
        }
        else if(leafType == 'spritetext'){
            this.primitive = new MySpriteText(this.graph.scene, dimensions[0]);
            //console.log(this.primitive);
        }
        else if(leafType == 'plane'){
            this.primitive = new MyPlane(dimensions[0], dimensions[1], dimensions[2]);
            //console.log(this.primitive);
        }
        else if(leafType == 'patch'){
            this.primitive = new MyPatch(dimensions[0], dimensions[1], dimensions[2], dimensions[3], dimensions[4], dimensions[5]);
            //console.log(this.primitive);
        }
        else if(leafType == 'defbarrel'){
            this.primitive = new MyDefBarrel(dimensions[0], dimensions[1], dimensions[2], dimensions[3], dimensions[4], dimensions[5]);
            console.log(this.primitive);
        }
    }

    display(){
        this.primitive.display();
    }

}  