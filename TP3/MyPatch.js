/**
* MyPatch
* @constructor
*/

class MyPatch extends CGFobject {
    constructor(scene, nPointsU, nPointsV, partsU, partsV, controlPoints) {
        super(scene);
        this.nPointsU = nPointsU;
        this.nPointsV = nPointsV;        
        this.partsU = partsU;
        this.partsV = partsV;
        this.controlPoints = [];
        
        var number = 0;
        for(var i = 0; i < nPointsU; i++){
            var vPoints = [];
            for(var j = 0; j < nPointsV; j++){
                vPoints.push(controlPoints[number]);
                number++;
            }
            this.controlPoints.push(vPoints);
        }

        this.nurbSurfaces = new CGFnurbsSurface(this.nPointsU - 1, this.nPointsV - 1, this.controlPoints);
        this.obj = new CGFnurbsObject(this.scene, this.partsU, this.partsV, this.nurbSurfaces);

    }
/*
    makeSurface() {
        let empty = [];
        let tempVertexes = [];

        for (var i = 0; i < this.nPointsU; i++) {
            this.tempVertexes.push(empty);
        }
        for (var i = 0; i < this.tempVertexes.length; i++) {
            for (var j = 0; j < this.nPointsV; j++) {
                this.tempVertexes[i].push(empty);
            }
        }

        for (var i = 0; i < this.controlPoints.length;i++) {
            let surface_nPointsU = 0, surface_nPointsV = 0;
            let count = 0;
            if (surface_nPointsV != this.nPointsV && count < 4) {
                count++;
                this.tempVertexes[surface_nPointsU][surface_nPointsV].push(this.controlPoints[i]);
            }
            else if (count == 4 && surface_nPointsV < this.nPointsV) {
                count = 0;
                surface_nPointsV++;
            }
            else {
                surface_nPointsU++;
                surface_nPointsV = 0;
            }

            
        }
        
        var nurbSurfaces = new CGFnurbsSurface(this.nPointsU - 1, this.nPointsV - 1, tempVertexes);
        var obj = new CGFnurbsObject(this.scene, this.partsU, this.partsV, nurbSurfaces);

        this.surfaces.push(obj);
    }
*/
    display() {
       /* for (var i = 0; i < this.surfaces.length; i++) {
            this.scene.pushMatrix();
            this.surfaces[i].display();
            this.scene.popMatrix();
        }*/
        this.obj.display();
    }

    updateTexCoords(afs, aft){}
}