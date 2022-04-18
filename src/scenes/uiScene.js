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
    init(data) {

        // get game width and height
        this.gw = this.sys.game.config.width;
        this.gh = this.sys.game.config.height;

        // save information from game scene
        this.data = data;

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

    /**
     * Draws the mobile control buttons.
     */
    mobileControlsSetup() {

        // add multiple pointers to allow multi touch
        this.input.addPointer(2);

        const mobileData = this.uiElements.mobileControls;      // get data on the mobile control button placement and picture

        const visible = true;               // true if a certain button is visible

        // create mobile control buttons and place them
        for (let i = 0; i < mobileData.length; i++) {

            // only draw the mobile control button if the upgrade is activated
            if (mobileData[i].key === 'mobileRight' ||                                          // right button is always drawn
                (mobileData[i].key === 'mobileLeft' && this.data.activeUpgrades[3]) ||          // draw left button only if upgrade (index: 2) is active
                (mobileData[i].key === 'mobileCrouch' && this.data.activeUpgrades[4]) ||        // draw crouch button only if upgrade (index: 2) is active
                (mobileData[i].key === 'mobileJump' && this.data.activeUpgrades[2])) {          // draw jump button only if upgrade (index: 2) is active

                    let button = this.add.existing(new MobileControl(this,
                    this.relToGame(mobileData[i].x, 'x'),
                    this.relToGame(mobileData[i].y, 'y'),
                    mobileData[i].key, i));
            }
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