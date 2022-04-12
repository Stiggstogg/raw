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

        // sprite
        this.sponge = this.add.existing(new Sponge(this, 100, 100));

        // Instruction / press key text
        this.add.text(this.gw / 2, this.gh - 46,
            'Use arrow keys or W, A, S, D to move Sponge Bob around\n' +
            'Click with the mouse on it to finish the game', {
                font: '20px Arial',
                fill: '#27ff00'
            }).setOrigin(0.5);

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

        // up and down keys (moving the selection of the entries)
        this.input.keyboard.addKey('Down').on('down', function() { this.sponge.move('down') }, this);
        this.input.keyboard.addKey('S').on('down', function() { this.sponge.move('down') }, this);
        this.input.keyboard.addKey('Up').on('down', function() { this.sponge.move('up') }, this);
        this.input.keyboard.addKey('W').on('down', function() { this.sponge.move('up') }, this);
        this.input.keyboard.addKey('Left').on('down', function() { this.sponge.move('left') }, this);
        this.input.keyboard.addKey('A').on('down', function() { this.sponge.move('left') }, this);
        this.input.keyboard.addKey('Right').on('down', function() { this.sponge.move('right') }, this);
        this.input.keyboard.addKey('D').on('down', function() { this.sponge.move('right') }, this);

        // enter and space key (confirming a selection)
        this.input.keyboard.addKey('Enter').on('down', function() { this.spaceEnterKey() }, this);
        this.input.keyboard.addKey('Space').on('down', function() { this.spaceEnterKey() }, this);

    }

}