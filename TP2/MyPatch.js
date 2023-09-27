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

    display() {
       
        this.obj.display();
    }

    updateTexCoords(afs, aft){}
}