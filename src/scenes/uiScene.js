/**
 * "Game" scene: Scene for the UI of the game
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

        // image
        const background = this.add.image(0, 0, 'uiBackground');

        background.setDisplaySize(this.gw, this.gh).setOrigin(0);

    }

    /**
     * Update function for the game loop.
     * @param {number} time
     * @param {number} delta
     */
    update(time, delta) {

    }

}