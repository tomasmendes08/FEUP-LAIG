const DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var INITIALS_INDEX = 0;
var VIEWS_INDEX = 1;
var ILLUMINATION_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var ANIMATIONS_INDEX = 6;
var SPRITESHEETS_INDEX = 7;
var NODES_INDEX = 8;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * Constructor for MySceneGraph class.
     * Initializes necessary variables and starts the XML file reading process.
     * @param {string} filename - File that defines the 3D scene
     * @param {XMLScene} scene
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.nodes = [];
        this.animationsIds = [];
        this.spriteSheetArray = [];
        this.spriteSheetAnimations=[];

        this.idRoot = null; // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lsf")
            return "root tag <lsf> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <initials>
        var index;
        if ((index = nodeNames.indexOf("initials")) == -1)
            return "tag <initials> missing";
        else {
            if (index != INITIALS_INDEX)
                this.onXMLMinorError("tag <initials> out of order " + index);

            //Parse initials block
            if ((error = this.parseInitials(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseViews(nodes[index])) != null)
                return error;
        }

        // <illumination>
        if ((index = nodeNames.indexOf("illumination")) == -1)
            return "tag <illumination> missing";
        else {
            if (index != ILLUMINATION_INDEX)
                this.onXMLMinorError("tag <illumination> out of order");

            //Parse illumination block
            if ((error = this.parseIllumination(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }
        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        //<animations>
        if ((index = nodeNames.indexOf("animations")) == -1)
            return "tag <animations> missing";
        else {
            if (index != ANIMATIONS_INDEX)
                this.onXMLMinorError("tag <animations> out of order");

            //Parse animations block
            if ((error = this.parseAnimations(nodes[index])) != null)
                return error;
        }

        if ((index = nodeNames.indexOf("spritesheets")) == -1)
            return "tag <spritesheets> missing";
        else {
            if (index != SPRITESHEETS_INDEX)
                this.onXMLMinorError("tag <spritesheets> out of order");

            //Parse animations block
            if ((error = this.parseSpriteSheets(nodes[index])) != null)
                return error;
        }


        // <nodes>
        if ((index = nodeNames.indexOf("nodes")) == -1)
            return "tag <nodes> missing";
        else {
            if (index != NODES_INDEX)
                this.onXMLMinorError("tag <nodes> out of order");

            //Parse nodes block
            if ((error = this.parseNodes(nodes[index])) != null)
                return error;
        }
        this.log("all parsed");
    }

    /**
     * Parses the <initials> block. 
     * @param {initials block element} initialsNode
     */
    parseInitials(initialsNode) {
        var children = initialsNode.children;
        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var rootIndex = nodeNames.indexOf("root");
        var referenceIndex = nodeNames.indexOf("reference");

        // Get root of the scene.
        if(rootIndex == -1)
            return "No root id defined for scene.";

        var rootNode = children[rootIndex];
        var id = this.reader.getString(rootNode, 'id');
        if (id == null)
            return "No root id defined for scene.";

        this.idRoot = id;

        // Get axis length        
        if(referenceIndex == -1)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        var refNode = children[referenceIndex];
        var axis_length = this.reader.getFloat(refNode, 'length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed initials");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */

    
    parseViews(viewsNode) {
         var children = viewsNode.children;

         this.cameras = [];
         var grandChildren = [];
 
         this.scene.curView = this.reader.getString(viewsNode, 'default');
         
         this.viewIds = [];

         console.log(this.cameras);
 
 
         for (var i = 0; i < children.length; i++) {
 
             if (children[i].nodeName != "perspective" && children[i].nodeName != "ortho") {
                 this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                 continue;
             }
 
             var viewId = this.reader.getString(children[i], 'id');
 
             if (viewId == null)
                 return "no ID defined for texture";
 
             // Checks for repeated IDs.
             if (this.cameras[viewId] != null)
                 return "ID must be unique for each primitive (conflict: ID = " + viewId + ")";
             
             this.viewIds.push(viewId);
 
             var cam;
 
             // Checks if view is perspective
             if (children[i].nodeName == "perspective") {
 
                 var near = this.reader.getFloat(children[i], 'near');
                 var far = this.reader.getFloat(children[i], 'far');
                 var angle = this.reader.getFloat(children[i], 'angle');
 
                 var angleRad = angle * DEGREE_TO_RAD;
 
                 grandChildren = children[i].children;
 
                 // Checks position
                 if (grandChildren[0].nodeName != "from")
                     this.onXMLMinorError("unknown tag <" + grandChildren[0].nodeName + ">");
 
                 var fromX = this.reader.getFloat(grandChildren[0], 'x');
                 var fromY = this.reader.getFloat(grandChildren[0], 'y');
                 var fromZ = this.reader.getFloat(grandChildren[0], 'z');
 
                 // Checks target
                 if (grandChildren[1].nodeName != "to")
                     this.onXMLMinorError("unknown tag <" + grandChildren[1].nodeName + ">");
 
                 var toX = this.reader.getFloat(grandChildren[1], 'x');
                 var toY = this.reader.getFloat(grandChildren[1], 'y');
                 var toZ = this.reader.getFloat(grandChildren[1], 'z');
 
                 cam = new CGFcamera(angleRad, near, far, vec3.fromValues(fromX, fromY, fromZ), vec3.fromValues(toX, toY, toZ)); // Creates camera
             }
 
             // Checks if view is ortho
             if (children[i].nodeName == "ortho") {
                 var near = this.reader.getFloat(children[i], 'near');
                 var far = this.reader.getFloat(children[i], 'far');
                 var left = this.reader.getFloat(children[i], 'left');
                 var right = this.reader.getFloat(children[i], 'right');
                 var top = this.reader.getFloat(children[i], 'top');
                 var bottom = this.reader.getFloat(children[i], 'bottom');
 
                 grandChildren = children[i].children;
 
                 // Checks position
                 if (grandChildren[0].nodeName != "from")
                     this.onXMLMinorError("unknown tag <" + grandChildren[0].nodeName + ">");
 
                 var fromX = this.reader.getFloat(grandChildren[0], 'x');
                 var fromY = this.reader.getFloat(grandChildren[0], 'y');
                 var fromZ = this.reader.getFloat(grandChildren[0], 'z');
 
                 // Checks target
                 if (grandChildren[1].nodeName != "to")
                     this.onXMLMinorError("unknown tag <" + grandChildren[1].nodeName + ">");
 
                 var toX = this.reader.getFloat(grandChildren[1], 'x');
                 var toY = this.reader.getFloat(grandChildren[1], 'y');
                 var toZ = this.reader.getFloat(grandChildren[1], 'z');
 
                 if (grandChildren[2].nodeName != "up")
                     this.onXMLMinorError("unknown tag <" + grandChildren[2].nodeName + ">");
 
                 var upX = this.reader.getFloat(grandChildren[2], 'x');
                 var upY = this.reader.getFloat(grandChildren[2], 'y');
                 var upZ = this.reader.getFloat(grandChildren[2], 'z');
 
                 cam = new CGFcameraOrtho(left, right, bottom, top, near, far, vec3.fromValues(fromX, fromY, fromZ), vec3.fromValues(toX, toY, toZ), vec3.fromValues(upX, upY, upZ)); // Creates camera
             }
             this.cameras[viewId] = cam;
 
         }
         return null;
    }

    /**
     * Parses the <illumination> node.
     * @param {illumination block element} illuminationsNode
     */
    parseIllumination(illuminationsNode) {

        var children = illuminationsNode.children;

        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color))
            return color;
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color))
            return color;
        else
            this.background = color;

        this.log("Parsed Illumination.");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {
        var children = lightsNode.children;
        
        this.lights = [];
        var numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "light") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                attributeNames.push(...["enable", "position", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["boolean","position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "boolean")
                        var aux = this.parseBoolean(grandChildren[attributeIndex], "value", "enabled attribute for light of ID" + lightId);
                    else if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

                    if (typeof aux === 'string')
                        return aux;

                    global.push(aux);
                }
                else
                    return "light " + attributeNames[i] + " undefined for ID = " + lightId;
            }
            this.lights[lightId] = global;
            numLights++;
        }
        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");
            
            this.log("Parsed lights");
            return null;
        }
        
    /**
     * Parses the <textures> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {
            
        var children = texturesNode.children;
        this.textures = [];
        var count = 0;
        
        for(var i = 0; i < children.length; i++){
            if(children[i].nodeName != "texture"){
                console.log("Wrong name (texture)");
            }
            
            var textureID = this.reader.getString(children[i], 'id');
            
            if(textureID==null) console.log("Texture ID not defined");
            
            var textPath = this.reader.getString(children[i],'path');
            
            var text = new CGFtexture(this.scene, textPath);        
            this.textures[textureID] = text;
            
            this.count++;
        }
            
        if(count == 0) console.log("Textures not detected");
        
        
        //For each texture in textures block, check ID and file URL
        console.log("Parsed textures");
        return null;
    }
    
    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;
        
        var grandChildren = [];
        var grandChildrenNames = [];
        
        this.materials = [];
        
        var count = 0;
        
        // Any number of materials.
        for (var i = 0; i < children.length; i++) {
            
            if (children[i].nodeName != "material") {
                console.log("Wrong name (material)");
            }
            
            // Get id of the current material.
            var materialID = this.reader.getString(children[i], 'id');
            if (materialID == null)
            return "no ID defined for material";
            
            // Checks for repeated IDs.
            if (this.materials[materialID] != null)
            return "ID must be unique for each light (conflict: ID = " + materialID + ")";
            
            
            grandChildren = children[i].children;
            for(var j = 0; j < grandChildren.length; j++){
                grandChildrenNames.push(grandChildren[j].nodeName);
            }
            
            var shinenessIndex = grandChildrenNames.indexOf("shininess");
            var ambientIndex = grandChildrenNames.indexOf("ambient");
            var diffuseIndex = grandChildrenNames.indexOf("diffuse");
            var specularIndex = grandChildrenNames.indexOf("specular");
            var emissiveIndex = grandChildrenNames.indexOf("emissive");
            
            if(shinenessIndex != -1 && ambientIndex != -1 && diffuseIndex != -1 && specularIndex != -1 && emissiveIndex != -1){
                var shinenessValue = this.reader.getFloat(grandChildren[shinenessIndex],'value');
                
                var ambientR = this.reader.getFloat(grandChildren[ambientIndex],'r');
                var ambientG = this.reader.getFloat(grandChildren[ambientIndex],'g');
                var ambientB = this.reader.getFloat(grandChildren[ambientIndex],'b');
                var ambientA = this.reader.getFloat(grandChildren[ambientIndex],'a');
                
                var diffuseR = this.reader.getFloat(grandChildren[diffuseIndex],'r');
                var diffuseG = this.reader.getFloat(grandChildren[diffuseIndex],'g');
                var diffuseB = this.reader.getFloat(grandChildren[diffuseIndex],'b');
                var diffuseA = this.reader.getFloat(grandChildren[diffuseIndex],'a');
                
                var specularR = this.reader.getFloat(grandChildren[specularIndex],'r');
                var specularG = this.reader.getFloat(grandChildren[specularIndex],'g');
                var specularB = this.reader.getFloat(grandChildren[specularIndex],'b');
                var specularA = this.reader.getFloat(grandChildren[specularIndex],'a');
                
                var emissiveR = this.reader.getFloat(grandChildren[emissiveIndex],'r');
                var emissiveG = this.reader.getFloat(grandChildren[emissiveIndex],'g');
                var emissiveB = this.reader.getFloat(grandChildren[emissiveIndex],'b');
                var emissiveA = this.reader.getFloat(grandChildren[emissiveIndex],'a');
                
                
                if(shinenessValue!=null && ambientR!=null && ambientG!=null && ambientB!=null && ambientA!=null && diffuseR!=null && diffuseG!=null && diffuseB!=null && diffuseA!=null && 
                    specularR!=null && specularG!=null && specularB!=null && specularA!=null&& emissiveR!=null && emissiveG!=null && emissiveB!=null && emissiveA!=null) {
                        if(isNaN(shinenessValue)||isNaN(ambientR)||isNaN(ambientG)||isNaN(ambientB)||isNaN(ambientA)||isNaN(diffuseR)||isNaN(diffuseG)||isNaN(diffuseB)||isNaN(diffuseA)
                    ||isNaN(specularR)||isNaN(specularG)||isNaN(specularB)||isNaN(specularA)||isNaN(emissiveR)||isNaN(emissiveG)||isNaN(emissiveB) || isNaN(emissiveA)){
                        console.log("Material values must be numeric");
                    }
                    else if(shinenessValue<0 || ambientR<0 || ambientG<0 || ambientB<0 || ambientA<0 || diffuseR<0 || diffuseG<0 || diffuseB<0 || diffuseA<0 || 
                        specularR<0 || specularG<0 || specularB<0 || specularA<0 || emissiveR<0 || emissiveG<0 || emissiveB<0 || emissiveA<0 || ambientR>1 || ambientG>1 || ambientB>1 || ambientA>1 || diffuseR>1 || diffuseG>1 || diffuseB>1 || diffuseA>1 || 
                        specularR>1 || specularG>1 || specularB>1 || specularA>1 || emissiveR>1 || emissiveG>1 || emissiveB>1 || emissiveA>1){
                            console.log("Material values must be between 0 and 1 (inclusive)");
                        }
                    }
                    else{
                    console.log("Material values not found");
                }
                
                var mat = new CGFappearance(this.scene);
                mat.setAmbient(ambientR, ambientG, ambientG, ambientA);
                mat.setDiffuse(diffuseR, diffuseG, diffuseB, diffuseA);
                mat.setSpecular(specularR, specularG, specularB, specularA);
                mat.setEmission(emissiveR, emissiveG, emissiveB, emissiveA);
                mat.setShininess(shinenessValue);

                this.materials[materialID] = mat;
            }
            
            count++;
        }
        if(count == 0) console.log("Materials not found");

        console.log("Parsed materials");
        return null;
    }
   
    
    parseAnimations(animationsNode) {
        this.animations = [];
        
        var children = animationsNode.children;
        var keyFrames = [];
        
        for (var i = 0; i < children.length;i++) {
            if (children[i].nodeName != "animation")
                this.onXMLError("unknown tag <" + children[i].nodeName + ">");
            
            var animationID = this.reader.getString(children[i],"id");
            if (animationID == null) return "no ID defined for animation";
            if (this.animations[animationID] != null) return "ID must be unique for each animation";
            
            this.animations[animationID] = new KeyframeAnimation(this.scene, this.animationID);
            //console.log(this.animations[animationID]);
            keyFrames = children[i].children;
           // console.log(keyFrames[i]);
            
            for (var j = 0; j < keyFrames.length;j++) {
                var temp = [];
                
                var currTime = this.reader.getFloat(keyFrames[j],"instant");
                
                temp.push(currTime);
                
                var transformations = keyFrames[j].children;
                
                var temp_translations = [];
                
                temp_translations.push(this.reader.getFloat(transformations[0],"x"));
                temp_translations.push(this.reader.getFloat(transformations[0],"y"));
                temp_translations.push(this.reader.getFloat(transformations[0],"z"));

                temp.push(temp_translations);
                
                var temp_rotations = [];
                
                temp_rotations.push(this.reader.getFloat(transformations[1],"angle"));
                temp_rotations.push(this.reader.getFloat(transformations[2],"angle"));
                temp_rotations.push(this.reader.getFloat(transformations[3],"angle"));
                
                temp.push(temp_rotations);
                
                var temp_scale = [];
                
                temp_scale.push(this.reader.getFloat(transformations[4],"sx"));
                temp_scale.push(this.reader.getFloat(transformations[4],"sy"));
                temp_scale.push(this.reader.getFloat(transformations[4],"sz"));

                temp.push(temp_scale);
                //console.log(temp);
                
                var newKeyFrame = new KeyFrame(currTime, temp_translations, temp_rotations, temp_scale);
                //console.log(newKeyFrame);
                
                this.animations[animationID].addKeyFrame(newKeyFrame);
                //console.log(this.animations[animationID]);
                
                this.animationsIds.push(animationID);
                //console.log(this.animationsIds);
            }
        }
        this.log("Parsed animations.");
    }

    parseSpriteSheets(SpriteSheetNode) {
        var children = SpriteSheetNode.children;
        //console.log(children);

        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeName != 'spritesheet') {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            var spriteSheetID = this.reader.getString(children[i],'id');
            //console.log(spriteSheetID);
            if (spriteSheetID == null) {
                return "no ID defined for spritesheet";
            }

            if (this.spriteSheetArray[spriteSheetID] != null) {
                return "ID must be unique for each spritesheet";
            }
            let texturePath = this.reader.getString(children[i], 'path');
            if (texturePath == null) {
                this.onXMLError("No path on spritesheet");
                continue;
            }

            let sizeM = this.reader.getFloat(children[i], 'sizeM');
            if (sizeM == null) {
                this.onXMLError("No sizeM on spritesheet");
                continue;
            }

            let sizeN = this.reader.getFloat(children[i], 'sizeN');
            if (sizeN == null) {
                this.onXMLError("No sizeN on spritesheet");
                continue;
            }

            

            var spriteSheet = new MySpriteSheet(this.scene, texturePath, sizeM, sizeN);
            //console.log(spriteSheet);
            this.spriteSheetArray[spriteSheetID] = spriteSheet;
            //console.log(this.spriteSheetArray);
        }
        
        console.log("Spritesheets parsed");
    }

    getSpriteSheet(spriteSheetID) {
        for (var i = 0; i < this.spriteSheetArray.length; i++) {
            //console.log(this.spriteSheetArray[i]);
            if (spriteSheetID == this.spriteSheetArray[i].id) {
                //console.log(this.spriteSheetArray[i]);
                return this.spriteSheetArray[i];
            }
        }
        return null;
    }

    /**
   * Parses the <nodes> block.
   * @param {nodes block element} nodesNode
   */
  parseNodes(nodesNode) {
        var children = nodesNode.children;

        this.nodes = [];

        var grandChildren = [];

        var nodeNames = [];

        // Any number of nodes.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "node") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current node.
            var nodeID = this.reader.getString(children[i], 'id');
            
            if (nodeID == null)
                return "no ID defined for nodeID";

            // Checks for repeated IDs.
            if (this.nodes[nodeID] != null)
                return "ID must be unique for each node (conflict: ID = " + nodeID + ")";

            this.nodes[nodeID] = new MyGraphNode(nodeID, this); 
            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            var transformationsIndex = nodeNames.indexOf("transformations");
            var materialIndex = nodeNames.indexOf("material");
            var textureIndex = nodeNames.indexOf("texture");
            var descendantsIndex = nodeNames.indexOf("descendants");
            var animationsIndex = nodeNames.indexOf("animationref");

            //Animations
            if(animationsIndex != -1){
                var animationID = this.reader.getString(grandChildren[animationsIndex], 'id');
                if(animationID == null) return "No animationID defined";
                this.nodes[nodeID].animations = this.animations[animationID];
                //console.log(this.nodes[nodeID].animations[animationID]);
            }


            //Materials
            if(materialIndex!=-1){
                var materialID = this.reader.getString(grandChildren[materialIndex], 'id');
                if(materialID == null){
                    return "No materialID or textureID";
                }
                else if((this.materials[materialID]==null && materialID != "null")){
                    return "Material or texture not found";
                }
                else if(materialID=="null"){
                    this.nodes[nodeID].material = null;
                }
                else if(materialID!="null"){
                    this.nodes[nodeID].material = this.materials[materialID];
                }
            }

            //Textures
            if(textureIndex != -1){
                var textureID = this.reader.getString(grandChildren[textureIndex], 'id');
                if(this.textures[textureID]==null && textureID!="null" && textureID!="clear"){
                    return "Texture not valid";
                }
                if(textureID == null) return "TextureID not found";
            }

            var textureChildren = grandChildren[textureIndex].children;
            var textureChildrenName = [];
            for(var t = 0; t < textureChildren.length; t++){
                textureChildrenName.push(textureChildren[t].nodeName);
            }

            var amplificationIndex = textureChildrenName.indexOf("amplification");
            if(amplificationIndex != -1){
                var amplificationAFS = this.reader.getFloat(textureChildren[amplificationIndex], 'afs');
                var amplificationAFT = this.reader.getFloat(textureChildren[amplificationIndex], 'aft');
            
                if(isNaN(amplificationAFS) || isNaN (amplificationAFT)) return "afs and aft must have numeric values";
            }
            else{
                this.nodes[nodeID].afs = 1.0;
                this.nodes[nodeID].aft = 1.0;
            }
            
            if(textureID!="null" && textureID!="clear")
                this.nodes[nodeID].texture = this.textures[textureID];

            else if(textureID=="null"){
                this.nodes[nodeID].texture = null;
            }
            else if(textureID=="clear"){
                this.nodes[nodeID].texture="clear";
            }

            this.nodes[nodeID].afs = amplificationAFS;
            this.nodes[nodeID].aft = amplificationAFT;

            //Transformations
            var transformations = grandChildren[transformationsIndex].children;
            
            //ler vetor por ordem inversa
            for (var k = 0; k < transformations.length; k++){
                var transformationsNodeName = transformations[k].nodeName;
                if (transformationsNodeName == 'translation'){
                    var x = this.reader.getFloat(transformations[k], 'x');
                    var y = this.reader.getFloat(transformations[k], 'y');
                    var z = this.reader.getFloat(transformations[k], 'z');
 
                    if (isNaN(x) || isNaN(y) || isNaN(z)) return "Invalid translation values.";
                    else if (x == null || y == null || z == null) return "Invalid translation values.";
 
 
                    mat4.translate(this.nodes[nodeID].transformMatrix, this.nodes[nodeID].transformMatrix, [x, y, z]);
 
                }

                else if (transformationsNodeName == 'rotation'){
                    var axis = this.reader.getItem(transformations[k], 'axis', ['x', 'y', 'z']);
                    var angle = this.reader.getFloat(transformations[k], 'angle');
 
                    if (isNaN(angle)) return "Invalid rotation values.";
                    else if (axis == null || angle == null) return "Invalid rotation values.";
 
                    mat4.rotate(this.nodes[nodeID].transformMatrix, this.nodes[nodeID].transformMatrix, angle * Math.PI/180, this.axisCoords[axis]);
 
                }
 
                else if (transformationsNodeName == 'scale'){
                    var sx = this.reader.getFloat(transformations[k], 'sx');
                    var sy = this.reader.getFloat(transformations[k], 'sy');
                    var sz = this.reader.getFloat(transformations[k], 'sz');
 
                    if (isNaN(sx) || isNaN(sy) || isNaN(sz)) return "Invalid scale values.";
                    else if (sx == null || sy == null || sz == null) return "Invalid scale values.";
 
                    mat4.scale(this.nodes[nodeID].transformMatrix, this.nodes[nodeID].transformMatrix, [sx, sy, sz]);
                }

            }

            //Descendants
            var descendantsChildren = grandChildren[descendantsIndex].children;
            
            for(var k = 0; k < descendantsChildren.length; k++){
                if(descendantsChildren[k].nodeName == 'noderef'){
                    var noderefid = this.reader.getString(descendantsChildren[k], 'id');

                    if(noderefid != null){
                        this.nodes[nodeID].addChildNode(noderefid);
                    }
                    else{
                        return "Invalid noderef ID";
                    }
                }

                else if(descendantsChildren[k].nodeName == 'leaf'){
                    var leaf = this.reader.getItem(descendantsChildren[k], 'type', ['rectangle', 'triangle', 'sphere', 'cylinder', 'torus', 'spriteanim', 'spritetext', 'plane', 'patch', 'defbarrel']);

                    switch(leaf){
                        case 'rectangle':
                            var x1 = this.reader.getFloat(descendantsChildren[k], 'x1');
                            var y1 = this.reader.getFloat(descendantsChildren[k], 'y1');
                            var x2 = this.reader.getFloat(descendantsChildren[k], 'x2');
                            var y2 = this.reader.getFloat(descendantsChildren[k], 'y2');

                            var leafRectangle = new MyGraphLeaf(this, 'rectangle', [x1,y1,x2,y2]);
                            this.nodes[nodeID].addChildLeave(leafRectangle);
                            break;
                        case 'triangle':
                            var x1 = this.reader.getFloat(descendantsChildren[k], 'x1');
                            var y1 = this.reader.getFloat(descendantsChildren[k], 'y1');
                            var x2 = this.reader.getFloat(descendantsChildren[k], 'x2');
                            var y2 = this.reader.getFloat(descendantsChildren[k], 'y2');
                            var x3 = this.reader.getFloat(descendantsChildren[k], 'x3');
                            var y3 = this.reader.getFloat(descendantsChildren[k], 'y3');

                            var leafTriangle = new MyGraphLeaf(this, 'triangle', [x1,y1,x2,y2,x3,y3]);
                            this.nodes[nodeID].addChildLeave(leafTriangle);
                            break;
                        case 'sphere':
                            var stacks = this.reader.getInteger(descendantsChildren[k], 'stacks');
                            var slices = this.reader.getInteger(descendantsChildren[k], 'slices');
                            var radius = this.reader.getFloat(descendantsChildren[k], 'radius');

                            var leafSphere = new MyGraphLeaf(this, 'sphere', [radius, slices, stacks]);
                            this.nodes[nodeID].addChildLeave(leafSphere);
                            break;
                        case 'cylinder':
                            var height = this.reader.getFloat(descendantsChildren[k],'height');
                            var topRadius = this.reader.getFloat(descendantsChildren[k], 'topRadius');
                            var bottomRadius = this.reader.getFloat(descendantsChildren[k], 'bottomRadius');
                            var stacks = this.reader.getInteger(descendantsChildren[k], 'stacks');
                            var slices = this.reader.getInteger(descendantsChildren[k], 'slices');

                            var leafCylinder = new MyGraphLeaf(this, 'cylinder', [height, topRadius, bottomRadius, stacks, slices]);
                            this.nodes[nodeID].addChildLeave(leafCylinder);
                            break;
                        case 'torus':
                            var inner = this.reader.getFloat(descendantsChildren[k],'inner');
                            var outer = this.reader.getFloat(descendantsChildren[k], 'outer');
                            var slices = this.reader.getInteger(descendantsChildren[k], 'slices');
                            var loops = this.reader.getInteger(descendantsChildren[k], 'loops');
    
                            var leafTorus = new MyGraphLeaf(this, 'torus', [inner,outer,slices,loops]);
                            this.nodes[nodeID].addChildLeave(leafTorus);
                            break;
                        case 'spriteanim':
                            //console.log("cheguei");
                            const spriteID = this.reader.getString(descendantsChildren[k],'ssid');
                            const initCell = this.reader.getFloat(descendantsChildren[k],'startCell');
                            const endCell = this.reader.getFloat(descendantsChildren[k],'endCell');
                            const duration = this.reader.getString(descendantsChildren[k],'duration');
                            
                            
                            var leafSpriteAnim = new MyGraphLeaf(this, 'spriteanim', [this.scene, this.spriteSheetArray[spriteID], initCell, endCell, duration]);
                            //console.log(leafSpriteAnim);
                            this.nodes[nodeID].addChildLeave(leafSpriteAnim);
                            break;

                        case 'spritetext':
                            const spriteText = this.reader.getString(descendantsChildren[k],'text');
                            //console.log(spriteText);
                            var leafSpriteText = new MyGraphLeaf(this, 'spritetext', [spriteText]);
                            this.nodes[nodeID].addChildLeave(leafSpriteText);
                            //console.log(leafSpriteText);
                            break;
                        
                        case 'plane':
                            var npartsU = this.reader.getInteger(descendantsChildren[k], 'npartsU');
                            var npartsV = this.reader.getInteger(descendantsChildren[k], 'npartsV');
                            var leafPlane = new MyGraphLeaf(this.scene, 'plane', [this.scene, npartsU, npartsV]);
                            //console.log(leafPlane);
                            this.nodes[nodeID].addChildLeave(leafPlane);
                            break;

                        case 'patch':
                            var npointsU = this.reader.getInteger(descendantsChildren[k], 'npointsU');
                            var npointsV = this.reader.getInteger(descendantsChildren[k], 'npointsV');
                            var npartsU = this.reader.getInteger(descendantsChildren[k], 'npartsU');
                            var npartsV = this.reader.getInteger(descendantsChildren[k], 'npartsV');
                            var controlPoints = [];
                            var patchChildren = descendantsChildren[k].children;
                           
                            for(var t = 0; t < patchChildren.length; t++){
                                let x = this.reader.getFloat(patchChildren[t], 'x');
                                let y = this.reader.getFloat(patchChildren[t], 'y');
                                let z = this.reader.getFloat(patchChildren[t], 'z');
                                controlPoints.push([x,y,z,1]);
                            }

                            var leafPatch = new MyGraphLeaf(this.scene, 'patch', [this.scene, npointsU, npointsV, npartsU, npartsV, controlPoints]);
                            //console.log(leafPatch);
                            this.nodes[nodeID].addChildLeave(leafPatch);
                            break;
                        
                        case 'defbarrel':
                            var base = this.reader.getFloat(descendantsChildren[k], 'base');
                            var middle = this.reader.getFloat(descendantsChildren[k], 'middle');
                            var height = this.reader.getFloat(descendantsChildren[k], 'height');
                            var slices = this.reader.getInteger(descendantsChildren[k], 'slices');
                            var stacks = this.reader.getInteger(descendantsChildren[k], 'stacks');

                            var leafDefBarrel = new MyGraphLeaf(this.scene, 'defbarrel', [this.scene, base, middle, height, slices, stacks]);
                            console.log(leafDefBarrel);
                            this.nodes[nodeID].addChildLeave(leafDefBarrel);
                        default:
                            break;
                    }
                }
                
            }


        }
        
        this.log("Parsed nodes.");
    }
    


    parseBoolean(node, name, messageError){
        var boolVal = true;
        boolVal = this.reader.getBoolean(node, name);
        if (!(boolVal != null && !isNaN(boolVal) && (boolVal == true || boolVal == false)))
            this.onXMLMinorError("unable to parse value component " + messageError + "; assuming 'value = 1'");

        return boolVal;
    }
    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates3D(node, messageError) {
        var position = [];

        // x
        var x = this.reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.reader.getFloat(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = this.reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = this.reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = this.reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() {
        
        
        if (this.nodes[this.idRoot].material == null){
            var mat = new CGFappearance(this.scene);
            mat.setShininess(0.0);
            mat.setAmbient(1.0, 1.0, 1.0, 1.0);
            mat.setDiffuse(0.6, 1.0, 1.0, 1.0);
            mat.setSpecular(0.6, 1.0, 1.0, 1.0);
            mat.setEmission(0.0, 0.0, 0.0, 1.0);

            this.nodes[this.idRoot].material = mat;
        }
        

        this.nodes[this.idRoot].display(this.nodes[this.idRoot].material, this.nodes[this.idRoot].texture);
    }
}