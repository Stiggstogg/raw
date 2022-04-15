import Player from '../sprites/player.js'
import Block from '../sprites/block.js'

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

        // play area size
        const lineSizeRel = 0.005;         // size of the lines on the right and left side and on the top, relative to game height
        const buttonAreaSizeRel = 0.15;    // size of the area where the buttons are shown, relative to game height

        const lineSize = Math.round(this.gh * lineSizeRel);                 // round the values to the closest integer to avoid misplacements due to rounding
        const buttonAreaSize = Math.round(this.gh * buttonAreaSizeRel);

        this.playArea = {
            width: this.gw - 2 * lineSize,                    // width of the play area size (camera size)
            height: this.gh - lineSize - buttonAreaSize,      // height of the play area size (camera size)
            x: lineSize,                                      // top left position of the play area (camera position), x
            y: lineSize                                       // top left position of the play area (camera position), x
        };

        //console.log(this.playArea);

    }

    // load assets
    preload() {

    }

    /**
     * Creates all objects of this scene
     */
    create() {

        // launch UI scene
        this.scene.launch('UI');
        this.scene.bringToTop();        // bring this scene on top of the UI scene

        // creates the world
        this.createWorld();

        // create objects
        this.createObjects();

        // setup collisions
        this.setupCollisions();

        // Add keyboard inputs
        this.addKeys();

        // Instruction / press key text
        // this.add.text(this.gw / 2, this.gh - 46,
        //     'Use arrow keys or W, A, S, D to move Sponge Bob around\n' +
        //     'Click with the mouse on it to finish the game', {
        //         font: '20px Arial',
        //         fill: '#27ff00'
        //     }).setOrigin(0.5);



    }

    /**
     * Update function for the game loop.
     * @param {number} time
     * @param {number} delta
     */
    update(time, delta) {

        // movement (left, right)
        if (this.keyLeft.isDown && !this.keyRight.isDown) {
            this.player.move('left');
        }
        else if (this.keyRight.isDown && !this.keyLeft.isDown) {
            this.player.move('right');
        }
        else {
            this.player.move();
        }

        // jump
        if (this.keyUp.isDown) {
            this.player.move('up');
        }
    }

    /**
     * Add keyboard input to the scene.
     */
    addKeys() {

        // up and down keys (moving the selection of the entries)
        this.keyDown = this.input.keyboard.addKey('Down');
        this.keyUp = this.input.keyboard.addKey('Up');
        this.keyLeft = this.input.keyboard.addKey('Left');
        this.keyRight = this.input.keyboard.addKey('Right');

        // enter and space key (confirming a selection)
        //this.input.keyboard.addKey('Enter').on('down', function() { this.spaceEnterKey() }, this);
        //this.input.keyboard.addKey('Space').on('down', function() { this.spaceEnterKey() }, this);

    }

    /**
     * Creates the world and all objects in it
     */
    createWorld() {

        // calculate world size
        const worldSize = {
            width: this.playArea.width * 2,   // world is double the size of the play area width
            height: this.playArea.height      // world is as high as the play area hight
        }

        // set world boundaries
        this.physics.world.bounds.width = worldSize.width;
        this.physics.world.bounds.height = worldSize.height;

        // set the camera
        this.cameras.main.setBounds(0, 0, worldSize.width, worldSize.height);       // set the camera boundaries (to the world size)
        this.cameras.main.setPosition(this.playArea.x, this.playArea.y);                  // set the camera position
        this.cameras.main.setSize(this.playArea.width, this.playArea.height);             // set the camera size (play area)

        //this.cameras.main.setBackgroundColor('rgba(255, 0, 0, 0.5)');

        // add background
        this.add.image(0, 0, 'background').setOrigin(0);

    }

    /**
     * Create all objects
     */
    createObjects() {

        // get level data
        this.levelData = this.cache.json.get('levelData');

        // add player
        this.player = this.add.existing(new Player(this, this.levelData.player.x, this.levelData.player.y,
            this.levelData.player.speed, this.levelData.player.jumpSpeed));

        // make camera follow player
        this.cameras.main.startFollow(this.player);

        // add platforms
        this.platforms = this.physics.add.staticGroup();

        for (let i = 0; i < this.levelData.platforms.length; i++) {

            let platformData = this.levelData.platforms[i];

            let platform = new Block(this, platformData.x, platformData.y, platformData.numTiles);

            this.add.existing(platform);

            this.platforms.add(platform);

        }

    }

    /**
     * Setup all collisions
     */
    setupCollisions() {

        // collision between player and platforms
        this.physics.add.collider(this.player, this.platforms);

    }

}