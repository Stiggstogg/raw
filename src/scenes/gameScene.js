import Player from './../sprites/player.js';
import Block from './../sprites/block.js';
import Checkpoint from './../sprites/checkpoint.js';
import Finish from './../sprites/finish.js';
import eventsCenter from './../helper/eventsCenter.js';

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
    init(data) {

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
            y: lineSize                                       // top left position of the play area (camera position), y
        };

        // world size
        this.worldSize = {
            width: this.playArea.width * 2,   // world is double the size of the play area width
            height: this.playArea.height      // world is as high as the play area height
        }

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

        // launch UI scene
        this.scene.launch('UI', this.data);
        this.scene.bringToTop();        // bring this scene on top of the UI scene

        // creates the world
        this.createWorld();

        // create objects
        this.createObjects();

        // setup collisions
        this.setupCollisions();

        // add keyboard inputs
        this.addKeys();

        // add mobile control inputs (through events)
        this.addMobileControls();

        // TODO: Remove. Just used as template
        // Instruction / press key text
        // this.add.text(this.gw / 2, this.gh - 46,
        //     'Use arrow keys or W, A, S, D to move Sponge Bob around\n' +
        //     'Click with the mouse on it to finish the game', {
        //         font: '20px Arial',
        //         fill: '#27ff00'
        //     }).setOrigin(0.5);

        // TODO: Remove. For touch optimization
        // this.add.text(20, 20, 'Left:',{fill: '#000000'});
        // this.add.text(20, 40, 'Right:', {fill: '#000000'});
        // this.add.text(20, 60, 'Crouch:', {fill: '#000000'});
        // this.add.text(20, 80, 'Jump', {fill: '#000000'});
        // this.debugLeft = this.add.text(100, 20, 'wat', {fill: '#000000'});
        // this.debugRight = this.add.text(100, 40, '', {fill: '#000000'});
        // this.debugCrouch = this.add.text(100, 60, '', {fill: '#000000'});
        // this.debugJump = this.add.text(100, 80, '', {fill: '#000000'});

    }

    /**
     * Update function for the game loop.
     * @param {number} time
     * @param {number} delta
     */
    update(time, delta) {

        // TODO: Remove. For touch optimization
        // this.debugLeft.setText(this.mobileControlPressed.left.toString());
        // this.debugRight.setText(this.mobileControlPressed.right.toString());
        // this.debugCrouch.setText(this.mobileControlPressed.crouch.toString());
        // this.debugJump.setText(this.mobileControlPressed.jump.toString());


        // update player
        this.player.update();

        // movement (left, right)
        if (((this.keyLeft.isDown && !this.keyRight.isDown) ||
            (this.mobileControlPressed.left && !this.mobileControlPressed.right))
            && this.data.activeUpgrades[3]) {       // check if move left upgrade (index: 3) is active
            this.player.move('left');
        }
        else if ((this.keyRight.isDown && !this.keyLeft.isDown) ||
        (this.mobileControlPressed.right && !this.mobileControlPressed.left)) {
            this.player.move('right');
        }
        else {
            this.player.move();
        }

        // jump is done with events, to only jump once it

    }

    /**
     * Add keyboard input to the scene.
     */
    addKeys() {

        // left right keys (movement of left and right is implemented in the update function)
        this.keyLeft = this.input.keyboard.addKey('Left');      //
        this.keyRight = this.input.keyboard.addKey('Right');

        // jump (jump is done with events, to only jump once it)
        this.input.keyboard.addKey('Space').on('down', function() {

            if (this.data.activeUpgrades[2]) {      // check if jump upgrade (index: 2) is active
                this.player.move('up');
            }

        }, this);

        // crouch
        const downKey = this.input.keyboard.addKey('Down').on('down', function() {

            if (this.data.activeUpgrades[4]) {      // check if crouch upgrade (index: 4) is active
                this.player.move('down');
            }

        }, this);

        // uncrouch
        downKey.on('up', function() {

            if (this.data.activeUpgrades[4]) {      // check if crouch upgrade (index: 4) is active
                this.player.uncrouch();
            }

        }, this);

    }

    /**
     * Add mobile controls (through events)
     */
    addMobileControls() {

        // object which has the pressed state of every mobile button
        this.mobileControlPressed = {
            left: false,
            right: false,
            crouch: false,
            jump: false
        }

        // event listener to listen for any presses of buttons
        eventsCenter.on('mobileDown', function(type) {          // set "control pressed" to true for this control
            this.mobileControlPressed[type] = true;

            if (type === 'jump' && this.data.activeUpgrades[2]) {        // jump is handled by events (similar to jumping with the keys) to make sure it jumps only once
                this.player.move('up');
            }

            if (type === 'crouch' && this.data.activeUpgrades[4]) {      // check if crouch upgrade (index: 4) is active
                this.player.move('down');
            }

        }, this);

        eventsCenter.on('mobileUp', function(type) {          // set "control pressed" to false if the control is released
            this.mobileControlPressed[type] = false;

            if (type === 'crouch' && this.data.activeUpgrades[4]) {      // check if crouch upgrade (index: 4) is active
                this.player.uncrouch();
            }

        }, this);

        // cleanup the listeners for the events
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, function() {
            eventsCenter.off('mobileDown');
            eventsCenter.off('mobileUp');
        });

    }

    /**
     * Creates the world and all objects in it
     */
    createWorld() {

        // set world boundaries
        this.physics.world.bounds.width = this.worldSize.width;
        this.physics.world.bounds.height = this.worldSize.height;

        // set the camera
        this.cameras.main.setBounds(0, 0, this.worldSize.width, this.worldSize.height);       // set the camera boundaries (to the world size)
        this.cameras.main.setPosition(this.playArea.x, this.playArea.y);                  // set the camera position
        this.cameras.main.setSize(this.playArea.width, this.playArea.height);             // set the camera size (play area)

        //this.cameras.main.setBackgroundColor('rgba(255, 0, 0, 0.5)');

        // add background
        this.add.image(0, 0, 'background').setOrigin(0);

        // show instruction text and arrows
        this.instructionText();

    }

    /**
     * Adds the instruction text (if needed) to the game scene
     */
    instructionText() {

        // check if all upgrades are deactivated (this means that it is a new game)
        let newGame = true;

        for (let i = 0; i < this.data.activeUpgrades.length; i++) {

            if (this.data.activeUpgrades[i]) {      // if one of the upgrades is activated it is not a new game
                newGame = false;
            }

        }

        if (newGame) {

            this.add.text(this.relToWorld(0.05, 'x'), this.relToWorld(0.30, 'y'),
                'Welcome. You are caught in your own game!\n' +
                'It still looks pretty RAW. At the moment you can only move right.\n' +
                'Collect breakpoints, add new features and create a new build. Repeat that until you are able to reach the exit and escape your game.\n' +
                'Enjoy UNRAWIFYING your game!', {
                    fontSize: '30px',
                    fill: '#000000',
                    fontStyle: 'bold',
                    wordWrap: {width: this.relToWorld(0.45, 'x')}
                }
            )

            // add arrows
            this.add.sprite(this.relToWorld(0.07, 'x'), this.relToWorld(0.16, 'y'), 'arrow').setRotation(225 * Math.PI / 180);
            this.add.sprite(this.relToWorld(0.41, 'x'), this.relToWorld(0.90, 'y'), 'arrow').setRotation(135 * Math.PI / 180);

            // label of finish and checkpoint
            const textStyle = {
                fontSize: '30px',
                fill: '#000000',
                fontStyle: 'bold',
            }

            this.add.text(this.relToWorld(0.10, 'x'), this.relToWorld(0.13, 'y'), 'Exit', textStyle).setOrigin(0, 0.5);
            this.add.text(this.relToWorld(0.38, 'x'), this.relToWorld(0.87, 'y'), 'Breakpoint', textStyle).setOrigin(1, 0.5);

        }

    }

    /**
     * Create all objects
     */
    createObjects() {

        // get level data
        this.levelData = this.cache.json.get('levelData');

        // ------------
        // player
        // ------------
        this.player = this.add.existing(new Player(this,
            this.relToWorld(this.levelData.player.x, 'x'),
            this.relToWorld(this.levelData.player.y, 'y'),
            this.relToWorld(this.levelData.player.speed, 'x'),
            this.relToWorld(this.levelData.player.jumpSpeed, 'y'),
            this.data.activeUpgrades[6]));

        // make camera follow player
        this.cameras.main.startFollow(this.player);

        // --------------
        // platforms
        // --------------


        this.platforms = this.physics.add.staticGroup();

        for (let i = 0; i < this.levelData.platforms.length; i++) {

            if (i < 1 || this.data.activeUpgrades[5]) {                  // create platforms (besides the first one, which is the floor) only if the platforms upgrade (index: 5) is active

                let platformData = this.levelData.platforms[i];

                let platform = new Block(this, this.relToWorld(platformData.x, 'x'), this.relToWorld(platformData.y, 'y'), platformData.numTiles);

                this.add.existing(platform);

                this.platforms.add(platform);

            }
        }

        // --------------
        // checkpoints
        // --------------
        this.checkpoints = this.physics.add.staticGroup();

        for (let i = 0; i < this.levelData.checkpoints.length; i++) {

            if (this.data.activeCheckpoints[i]) {
                let checkpointData = this.levelData.checkpoints[i];

                let checkpoint = new Checkpoint(this,
                    this.relToWorld(checkpointData.x, 'x'),
                    this.relToWorld(checkpointData.y, 'y'),
                    i);

                this.add.existing(checkpoint);

                this.checkpoints.add(checkpoint);
            }
        }

        // -------------
        // Finish
        // -------------

        this.finish = this.add.existing(new Finish(this, this.relToWorld(this.levelData.finish.x, 'x'),
            this.relToWorld(this.levelData.finish.y, 'y')));

    }

    /**
     * Setup all collisions
     */
    setupCollisions() {

        // collision between player and platforms
        this.physics.add.collider(this.player, this.platforms);

        // overlapping of player and checkpoints
        this.physics.add.overlap(this.player, this.checkpoints, this.checkpointOverlap, null, this);

        // overlap of player and finish
        this.physics.add.overlap(this.player, this.finish, this.finishOverlap, null, this);

    }

    /**
     * Function which executes when player overlaps with a checkpoint
     */
    checkpointOverlap(sourceSprite, targetSprite) {

        // make checkpoint invisible
        const spriteNumber = targetSprite.getNum();         // get number of the checkpoint which was touched
        this.data.activeCheckpoints[spriteNumber] = false;       // innactivate checkpoint for next time

        // pause game and UI scene
        this.scene.pause('Game');

        // launch editor scene
        this.scene.launch('Editor', this.data);

    }

    /**
     * Function which is executed when the player touches the finish
     */
    finishOverlap(sourceSprite, targetSprite) {

        // pause game scene
        this.scene.pause('Game');

        // launch finish scene
        this.scene.launch('Finish', this.data);

    }

    /**
     * Calculate from relative coordinates to the world coordinates in pixels
     * @param {number} rel relative coordinate in the world
     * @param {string} dir direction of the coordinate ('x' or 'y')
     */
    relToWorld(rel, dir) {

        if (dir === 'y') {
            return Math.round(rel * this.worldSize.height);
        }
        else {
            return Math.round(rel * this.worldSize.width);
        }
    }

}