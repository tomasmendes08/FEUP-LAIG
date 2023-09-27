#ifdef  GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float sizeM;
uniform float sizeN;
uniform float actualM;
uniform float actualN;

varying vec2 ST;
varying vec2 vTextureCoord;

void main() {
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

    float horizontalSpace = 1.0 / sizeM;
    float verticalSpace = 1.0 / sizeN;

    ST = vec2(aTextureCoord.s * horizontalSpace + horizontalSpace * actualM, aTextureCoord.t * verticalSpace + verticalSpace * actualN);
    vTextureCoord = ST;
}
