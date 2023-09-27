/**
* MyPlane
* @constructor
*/

class MyPlane extends CGFobject {
    constructor(scene, partsU, partsV) {
        super(scene);
        this.partsU = partsU;
        this.partsV = partsV;

        this.surfaces = [];
        this.makeSurface();
    }

    makeSurface() {
        let controlVertexes = [
            [
                [0.5, 0.0, -0.5, 1],
                [0.5, 0.0, 0.5, 1]
            ],
            [
                [-0.5, 0.0, -0.5, 1],
                [-0.5, 0.0, 0.5, 1]
                                    ]
        ];

        var nurbSurfaces = new CGFnurbsSurface(1, 1, controlVertexes);
        var obj = new CGFnurbsObject(this.scene, this.partsU, this.partsV, nurbSurfaces);

        this.surfaces.push(obj);
    }

    display() {
        for (var i = 0; i < this.surfaces.length; i++) {
            this.scene.pushMatrix();
            this.surfaces[i].display();
            this.scene.popMatrix();
        }
    }


    updateTexCoords(afs, aft){}
}