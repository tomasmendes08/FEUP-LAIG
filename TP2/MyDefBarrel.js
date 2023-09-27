/**
* MyDefBarrel
* @constructor
*/

class MyDefBarrel extends CGFobject {
    constructor(scene, base, middle, height, slices, stacks) {
        super(scene);
        this.base = base;
        this.middle = middle;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.controlPointsTop = [
            [
                [-this.base, 0, 0, 1],
                [-this.base, 4/3*this.base, 0, 1],
                [this.base, 4/3*this.base, 0, 1],
                [this.base, 0, 0, 1]
            ],
            [
                [-this.middle, 0, this.height/2, 1],
                [-this.middle, 4/3*this.middle, this.height/2, 1],
                [this.middle, 4/3*this.middle, this.height/2, 1],
                [this.middle, 0, this.height/2, 1]
            ],

            [
                [-this.base, 0, this.height, 1],
                [-this.base, 4/3*this.base, this.height, 1],
                [this.base, 4/3*this.base, this.height, 1],
                [this.base, 0, this.height, 1]       
            ]

        ];

        this.controlPointsBottom = [
            [
                [this.base, 0, 0, 1],
                [this.base, -4/3*this.base, 0, 1],
                [-this.base, -4/3*this.base, 0, 1],
                [-this.base, 0, 0, 1]
            ],
            [
                [this.middle, 0, this.height/2, 1],
                [this.middle, -4/3*this.middle, this.height/2, 1],
                [-this.middle, -4/3*this.middle, this.height/2, 1],
                [-this.middle, 0, this.height/2, 1]
            ],

            [
                [this.base, 0, this.height, 1],
                [this.base, -4/3*this.base, this.height, 1],
                [-this.base, -4/3*this.base, this.height, 1],
                [-this.base, 0, this.height, 1]       
            ]

        ];

        this.top = new CGFnurbsSurface(2, 3, this.controlPointsTop);
		this.bottom = new CGFnurbsSurface(2, 3, this.controlPointsBottom);

        this.topObj = new CGFnurbsObject(this.scene, this.stacks, Math.ceil(this.slices/2), this.top);
		this.bottomObj = new CGFnurbsObject(this.scene, this.stacks, Math.ceil(this.slices/2), this.bottom);

    }

    display() {
        this.topObj.display();
        this.bottomObj.display();
    }

    updateTexCoords(afs, aft){}
}
