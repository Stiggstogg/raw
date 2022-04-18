import MobileControl from './../sprites/mobileControl';

/**
 * "UI" scene: Scene for the UI of the game
 */
export default class uiScene extends Phaser.Scene {

    /**
     * Constructor
     * @constructor
     */
    constructor() {
        super({
            key: 'UI'
        });
    }

    /**
     * Initialize parameters
     */
    init() {

        // get game width and height
        this.gw = this.sys.game.config.width;
        this.gh = this.sys.game.config.height;

    }

    // load assets
    preload() {

    }

    /**
     * Creates all objects of this scene
     */
    create() {

        // get UI elements data from JSON (mobile control button palcement)
        this.uiElements = this.cache.json.get('uiElements');

        // image
        const background = this.add.image(0, 0, 'uiBackground');

        background.setDisplaySize(this.gw, this.gh).setOrigin(0);

        // setup mobile control buttons
        this.mobileControlsSetup();

        this.events.on('moveRight', function () {
            console.log('I can hear it!');
        }, this.scene);

    }

    /**
     * Update function for the game loop.
     * @param {number} time
     * @param {number} delta
     */
    update(time, delta) {

    }

    mobileControlsSetup() {

        const mobileData = this.uiElements.mobileControls;      // get data on the mobile control button placement and picture

        // create mobile control buttons and place them
        for (let i = 0; i < mobileData.length; i++) {

            let button = this.add.existing(new MobileControl(this,
                this.relToGame(mobileData[i].x, 'x'),
                this.relToGame(mobileData[i].y, 'y'),
                mobileData[i].key, i));

        }


    }

    /**
     * Calculate from relative coordinates to the game coordinates
     * @param {number} rel relative coordinate in the game
     * @param {string} dir direction of the coordinate ('x' or 'y')
     */
    relToGame(rel, dir) {

        if (dir === 'y') {
            return Math.round(rel * this.gh);
        }
        else {
            return Math.round(rel * this.gw);
        }
    }

}