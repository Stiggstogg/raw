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

        buildTexts.push(' ');
        buildTexts.push('\nBuild finished\nStarting game....');

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
            repeat: buildTexts.length,      // repeat it for every entry PLUS ONE (in the last repetition the next scene will be started)
            callback: function() {

                if (i <= buildTexts.length - 1) {

                    this.add.text(                                  // show next text line
                        this.relToGame(0.05, 'x'),
                        this.relToGame(0.10 + i * this.space, 'y'),
                        buildTexts[i], textStyle);

                    i = i + 1;

                }
                else {
                    this.startGame();
                }


            },
            callbackScope: this
        });

        if (i >= buildTexts.length - 1) {
            console.log('go');
        }


    }

    /**
     * Update function for the game loop.
     * @param {number} time
     * @param {number} delta
     */
    update(time, delta) {

    }

    /**
     * Start the game scene
     */
    startGame() {

        // start the game scene
        this.scene.start('Game', this.data);

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