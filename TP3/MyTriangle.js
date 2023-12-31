/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x - Scale of rectangle in X
 * @param y - Scale of rectangle in Y
 */
class MyTriangle extends CGFobject {
    constructor(scene, x1, y1, x2, y2, x3, y3) {
        super(scene);
        this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
        this.y1 = y1;
        this.y2 = y2;
        this.y3 = y3;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
			this.x1, this.y1, 0,	//0
			this.x2, this.y2, 0,	//1
			this.x3, this.y3, 0,	//2
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
			0, 1, 2,
            2, 1, 0,
        ];

        //Facing Z positive
        this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
        ];

        /*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */

    updateTexCoords(afs,aft) {
       
        this.texCoords = [
            0, 1,
            this.a/afs, 1,
            (this.c*this.alpha_cos)/afs, (this.c*this.alpha_sin)/aft
        ];
        this.updateTexCoordsGLBuffers();
    }
}