import MobileControl from './../sprites/mobileControl';
import eventsCenter from "../helper/eventsCenter";

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

        // set music keys
        this.musicKeys = ['playingMusic', 'playingRockMusic'];

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

        // home button (including keyboard) and text setup
        this.homeButtonSetup();

        // Music
        this.music = this.sound.add(this.musicKeys[this.data.musicType]);

        if (this.data.activeUpgrades[1]) {            // only play music when upgrade is activated
            this.music.play({loop: true});
        }

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, function() {
            this.music.stop();
        }, this);
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
                (mobileData[i].key === 'mobileLeft' && this.data.activeUpgrades[3]) ||          // draw left button only if upgrade (index: 3) is active
                (mobileData[i].key === 'mobileJump' && this.data.activeUpgrades[2])) {          // draw jump button only if upgrade (index: 2) is active

                    let button = this.add.existing(new MobileControl(this,
                    this.relToGame(mobileData[i].x, 'x'),
                    this.relToGame(mobileData[i].y, 'y'),
                    mobileData[i].key, i));
            }
        }

    }

    /**
     * Setup the home button, the text and the key
     */
    homeButtonSetup() {

        // add home button
        const homeButton = this.add.sprite(this.relToGame(0.98, 'x'), this.relToGame(0.02, 'x'), 'back').setOrigin(1, 0).setInteractive();

        homeButton.on('pointerdown', this.backToMenu, this);    // add action to home button

        // add esc key
        this.input.keyboard.addKey('Esc').on('down', this.backToMenu, this);

        // add text to describe it
        const homeText = this.add.text(this.relToGame(0.85, 'x'), this.relToGame(0.015, 'y'),
            'Press ESC or this button to go back to the menu.', {
                fontSize: '20px',
                fill: '#ffffff',
                fontStyle: 'bold',
                wordWrap: {width: this.relToGame(0.45, 'x')}
            }
        ).setOrigin(1, 0);

        if (this.data.activeUpgrades[0]) {          // change color of the text to black if the graphics upgrade (index: 0) is activated
            homeText.setColor('#000000');
        }

    }

    /**
     * Go back to main menu
     */
    backToMenu() {
        this.scene.stop('Game');    // stop game scene
        this.scene.stop('Editor');    // stop UI scene
        this.scene.start('Home');
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