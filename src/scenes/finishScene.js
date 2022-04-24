import eventsCenter from './../helper/eventsCenter.js';

/**
 * "Finish" scene: Scene which is shown when the game is finished
 */
export default class uiScene extends Phaser.Scene {

    /**
     * Constructor
     * @constructor
     */
    constructor() {
        super({
            key: 'Finish'
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

    /**
     * Creates all objects of this scene
     */
    create() {

        // bring scene on top
        this.scene.bringToTop();

        // text styles
        const titleStyle = {            // title
            fontSize: '40px',
            fill: '#000000',
            fontStyle: 'bold',
            wordWrap: {width: this.relToGame(0.9, 'x')}
        }

        const subStyle = {            // subtitle
            fontSize: '30px',
            fill: '#000000',
            fontStyle: 'bold',
            wordWrap: {width: this.relToGame(0.9, 'x')}
        }

        const instStyle = {             // instructions
            fontSize: '25px',
            fill: '#000000',
            fontStyle: 'bold',
            wordWrap: {width: this.relToGame(0.9, 'x')}
        }

        // Show texts
        this.add.text(this.relToGame(0.5, 'x'), this.relToGame(0.32, 'y'),      // congratulations
            'Congratulations!', titleStyle).setOrigin(0.5);

        this.add.text(this.relToGame(0.5, 'x'), this.relToGame(0.36, 'y'),      // congratulations
            'You unrawified your game and made it out!', subStyle).setOrigin(0.5, 0);

        this.instructions = this.add.text(this.relToGame(0.5, 'x'), this.relToGame(0.50, 'y'),      // congratulations
            'Press any key or button to go back to the menu.', instStyle).setOrigin(0.5, 0).setVisible(false);


        // Sound
        this.yeahSound = this.sound.add('yeahSound');
        this.yeahSound.play();

        // Show the instructions and activate the keys / buttons to go back
        this.time.addEvent({
            delay: 1000,
            repeat: 0,
            callback: this.goBackSetup,
            callbackScope: this
        });

    }

    /**
     * Update function for the game loop.
     * @param {number} time
     * @param {number} delta
     */
    update(time, delta) {

    }

    /**
     * Function shows the instructions and setups the buttons and keys to go back to the menu
     */
    goBackSetup() {

        // make instructions visible
        this.instructions.setVisible(true);

        // add the keyboard buttons and listeners
        this.input.keyboard.addKey('Up').on('down', this.backToMenu, this);
        this.input.keyboard.addKey('Down').on('down', this.backToMenu, this);
        this.input.keyboard.addKey('Left').on('down', this.backToMenu, this);
        this.input.keyboard.addKey('Right').on('down', this.backToMenu, this);
        this.input.keyboard.addKey('Space').on('down', this.backToMenu, this);
        this.input.keyboard.addKey('Enter').on('down', this.backToMenu, this);

        // add listeners for the mobile buttons
        eventsCenter.on('mobileDown', this.backToMenu, this);

        // cleanup the listeners for the events
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, function() {
            eventsCenter.off('mobileDown');
        });

    }

    /**
     * Go back to main menu
     */
    backToMenu() {

        // Stop UI, Finish and Game scene (to make them disappear)
        this.scene.stop('UI');              // stop UI scene (which is still running)
        this.scene.stop('Game');            // stop the game scene

        // start home scene
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