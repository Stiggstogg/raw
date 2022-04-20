/**
 * "Build" scene: Shows how the scene is built
 */
export default class buildScene extends Phaser.Scene {

    /**
     * Constructor
     * @constructor
     */
    constructor() {
        super({
            key: 'Build'
        });
    }

    /**
     * Initialize parameters
     */
    init(data) {

        // get game width and height
        this.gw = this.sys.game.config.width;
        this.gh = this.sys.game.config.height;

        // get data (active checkpoints and active upgrades)
        this.data = data;

        // settings
        this.space = 0.05;          // relative spacing between the texts

    }

    /**
     * Creates all objects of this scene
     */
    create() {

        // building text
        const buildTexts = [
            'Starting Game Builder v3.2.3....',
            'Building game.....',
            ' ',
            'Adding features:',
            'Move right....'
        ];

        buildTexts.push(' ')
        buildTexts.push('\nBuild finished\nStarting game....')

        // TODO: Add more build texts based on activated features

        // text styles
        const textStyle = {
            fontSize: '10px',
            fill: '#ffffff',
            wordWrap: {width: this.relToGame(0.9, 'x')}

        }

        // Show build texts one after another
        let i = 0
        this.time.addEvent({
            delay: 500,
            repeat: buildTexts.length - 1,
            callback: function() {

                this.add.text(
                    this.relToGame(0.05, 'x'),
                    this.relToGame(0.10 + i * this.space, 'y'),
                    buildTexts[i], textStyle);

                console.log(buildTexts[i]);

                i = i + 1;

            },
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
        this.scene.stop('UI');
        this.scene.stop('Finish');
        this.scene.stop('Game');

        // start home scene
        this.scene.start('Home')

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