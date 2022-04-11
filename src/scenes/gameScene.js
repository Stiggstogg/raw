// import objects
import Sponge from '../sprites/sponge.js'

/**
 * "Game" scene: Scene for the main game
 */
export default class gameScene extends Phaser.Scene {

    /**
     * Constructor
     * @constructor
     */
    constructor() {
        super({
            key: 'Game'
        });
    }

    /**
     * Initialize parameters
     */
    init() {

    }

    // load assets
    preload() {

    }

    /**
     * Creates all objects of this scene
     */
    create() {

        this.add.existing(new Sponge(this, 100, 100));

    }

    /**
     * Update function for the game loop.
     * @param {number} time
     * @param {number} delta
     */
    update(time, delta) {

    }

}