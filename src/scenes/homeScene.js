/**
 * "Home" scene: Main game menu scene
 */
export default class gameScene extends Phaser.Scene {

    /**
     * Constructor
     * @constructor
     */
    constructor() {
        super({
            key: 'Home'
        });
    }

    /**
     * Shows the home screen and waits for the the user to select a menu entry
     */
    create() {

        // get game width and height
        let gw = this.sys.game.config.width;
        let gh = this.sys.game.config.height;

        // create background zone
        this.bgZone = this.add.zone(0, 0, gw, gh);

        // set properties
        this.bgZone.setOrigin(0, 0);

        // set interactivity and start game scene when clicked
        this.bgZone.setInteractive();
        this.bgZone.on('pointerdown', function (pointer) {

            this.scene.start('Game');

        }, this);

        // show home screen text
        let text = this.add.text(gw / 2, gh / 2, 'My Game', {
                font: '40px Arial',
                fill: '#27ff00'
            }
        );
        text.setOrigin(0.5, 0.5)
    }

}