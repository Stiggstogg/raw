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

        // parameters for the text
        const textStyle = {
            fontSize: '30px',
            fill: '#ffffff',
            fontStyle: 'bold',
            wordWrap: {width: this.relToGame(0.9, 'x')}
            };

        const ySpace = this.relToGame(0.01, 'y');   // space between lines
        const xPos = this.relToGame(0.03, 'x');     // x position of the

        // Add Title text
        const titleText = this.add.text(xPos,
            this.relToGame(0.03, 'y'),
            'Starting Game Builder v3.2.3....\n\n' +
            'Building game.....\n',
            textStyle);


        // building text
        const buildTexts = [
            'Adding features...',
            '- Move right'
        ];

        // texts of the different upgrades
        const upgradeTexts = [
            '- Graphics',
            '- Music',
            '- Jump',
            '- Move left',
            '- Small',
            '- Platforms',
            '- Double Jump'
        ];

        // add build texts depending on activated features
        for (let i = 0; i < this.data.activeUpgrades.length; i++) {
            if (this.data.activeUpgrades[i]) {
                buildTexts.push(upgradeTexts[i]);
            }
        }


        buildTexts.push(' ');
        buildTexts.push('\nBuild finished!\nPress SPACE or touch the screen to start.');


        // Show build texts one after another
        let j = 0                                                   // counter for the different texts
        let yNext = titleText.y + titleText.height + 2 * ySpace;
        let tempText;

        this.time.addEvent({
            delay: 300,
            repeat: buildTexts.length,      // repeat it for every entry PLUS ONE (in the last repetition the next scene will be started)
            callback: function() {

                if (j <= buildTexts.length - 1) {

                    tempText = this.add.text(                                  // show next text line
                        xPos,
                        yNext,
                        buildTexts[j], textStyle);

                    yNext = tempText.y + tempText.height + ySpace;
                    j = j + 1;

                }
                else {
                    this.input.keyboard.addKey('Space').on('down', this.startGame, this);
                    this.input.on('pointerdown', this.startGame, this);
                }


            },
            callbackScope: this
        });

        // Music
        this.music = this.sound.add('buildSound');
        this.music.play();

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