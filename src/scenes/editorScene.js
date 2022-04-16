import UpgradeButton from '../sprites/upgradeButton.js'
import Selector from '../helper/selector.js'

/**
 * "Editor" scene: Scene for the editor to choose upgrades
 */
export default class editorScene extends Phaser.Scene {

    /**
     * Constructor
     * @constructor
     */
    constructor() {
        super({
            key: 'Editor'
        });
    }

    /**
     * Initialize parameters
     */
    init(data) {

        // get game width and height
        this.gw = this.sys.game.config.width;
        this.gh = this.sys.game.config.height;

        // editor size and position
        const yRel = 0.15;     // relative position of the editor (to game height)
        const widthRel = 0.8;      // relative width of the editor (to game width)
        const heightRel = 0.5;     // relative height of the editor (game height)

        this.editorArea = {
            width: Math.round(this.gw * widthRel),                              // width of the editor (scene) area
            height: Math.round(this.gh * heightRel),                            // height of the editor (scene) area
            x: Math.round(this.gw / 2 - Math.round(this.gw * widthRel) / 2),     // top left position of the play area (camera position), x
            y: Math.round(this.gh * yRel)                                       // top left position of the editor (scene) area, y
        };

        // get data (active checkpoints and active upgrades)
        this.data = data;

    }

    /**
     * Load assets
     */
    preload() {

    }

    /**
     * Creates all objects of this scene
     */
    create() {

        // bring scene on top
        this.scene.bringToTop();

        // creates the world
        this.createEditor();

        // create objects
        //this.createObjects();

        // Add keyboard inputs
        this.addKeys();

    }

    /**
     * Update function for the game loop.
     * @param {number} time
     * @param {number} delta
     */
    update(time, delta) {

    }

    /**
     * Add keyboard input to the scene.
     */
    addKeys() {

        // arrow keys to select the buttons / upgrades
        this.input.keyboard.addKey('Left').on('down', function() { this.selector.left() }, this);
        this.input.keyboard.addKey('Right').on('down', function() { this.selector.right() }, this);
        this.input.keyboard.addKey('Down').on('down', function() { this.selector.down() }, this);
        this.input.keyboard.addKey('Up').on('down', function() { this.selector.up() }, this);

        // enter and space key (confirming a selection)
        this.input.keyboard.addKey('Enter').on('down', function() {
            this.scene.stop('UI');
            this.scene.start('Game', this.data)
        }, this);

    }


    /**
     * Create the editor elements
     */
    createEditor() {

        // get level data
        this.levelData = this.cache.json.get('levelData');

        // set the camera
        this.cameras.main.setPosition(this.editorArea.x, this.editorArea.y);                  // set the camera position
        this.cameras.main.setSize(this.editorArea.width, this.editorArea.height);             // set the camera size (editor size)

        // background
        const background = this.add.image(0, 0, 'editorBackground');
        background.setDisplaySize(this.editorArea.width, this.editorArea.height).setOrigin(0);

        // ------------
        // buttons
        // ------------
        const buttonData = this.levelData.buttons;      // get data on button placement and picture

        this.upgradeButtons = this.add.group();

        for (let i = 0; i < buttonData.length; i++) {

            let button = this.add.existing(new UpgradeButton(this,
                this.relToWorld(buttonData[i].x, 'x'),
                this.relToWorld(buttonData[i].y, 'y'),
                buttonData[i].key));

            this.upgradeButtons.add(button);
        }

        // selector
        this.selector = new Selector(this.upgradeButtons);

    }

    /**
     * Calculate from relative coordinates to the world coordinates in pixels
     * @param {number} rel relative coordinate in the world
     * @param {string} dir direction of the coordinate ('x' or 'y')
     */
    relToWorld(rel, dir) {

        if (dir === 'y') {
            return Math.round(rel * this.editorArea.height);
        }
        else {
            return Math.round(rel * this.editorArea.width);
        }
    }

}