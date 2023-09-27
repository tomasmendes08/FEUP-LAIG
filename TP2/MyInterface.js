/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application,lights) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        // add a group of controls (and open/expand by defult)
        this.gui = new dat.GUI();
        this.initKeys();

        return true;
    }

    /**
     * initKeys
     */

    addLightsGUI() {
        
        var keyNames = Object.keys(this.scene.graph.lights);
        //var group = this.gui.addFolder("Lights");
        for (var i = 0; i < keyNames.length;i++) {
            group.add(this.scene.lights[i],'enabled').name(keyNames[i]);
        }
    }

    addCamerasGUI() {
        this.gui.add(this.scene,'curView',Object.keys(this.scene.graph.cameras)).name('View Points').onChange(this.scene.updateView.bind(this.scene));
    }
    
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}