import spongeImg from '../assets/images/sponge.jpeg';

/**
 * "Loading" scene: Loads all assets and shows a progress bar while loading
 */
export default class loadingScene extends Phaser.Scene {

    /**
     * Constructor
     * @constructor
     */
    constructor() {
        super({
            key: 'Loading'
        });
    }

    /**
     * Load all assets (for all scenes)
     */
    preload() {

        // get game width and height
        let gw = this.sys.game.config.width;
        let gh = this.sys.game.config.height;

        // show logo
        let logo = this.add.sprite(gw/2, gh/2, 'logo').setScale(5, 5); // logo is already preloaded in 'Boot' scene

        // text
        this.add.text(gw/2, gh * 0.20, 'CLOWNGAMING', {fontSize: '70px', color: '#FFFF00', fontStyle: 'bold'}).setOrigin(0.5);
        this.add.text(gw/2, gh * 0.73, 'Loading', {fontSize: '30px', color: '#27FF00'}).setOrigin(0.5);

        // progress bar background (e.g grey)
        let bgBar = this.add.graphics();
        let barW = gw * 0.3;            // progress bar width
        let barH = barW * 0.1;          // progress bar height
        let barX = gw / 2 - barW / 2;       // progress bar x coordinate (origin is 0, 0)
        let barY = gh * 0.8 - barH / 2   // progress bar y coordinate (origin is 0, 0)
        bgBar.setPosition(barX, barY);
        bgBar.fillStyle(0xF5F5F5, 1);
        bgBar.fillRect(0, 0, barW, barH);    // position is 0, 0 as it was already set with ".setPosition()"

        // progress bar
        let progressBar = this.add.graphics();
        progressBar.setPosition(barX, barY);

        // listen to the 'progress' event (fires every time an asset is loaded and 'value' is the relative progress)
        this.load.on('progress', function(value) {

            // clearing progress bar (to draw it again)
            progressBar.clear();

            // set style
            progressBar.fillStyle(0x27ff00, 1);

            // draw rectangle
            progressBar.fillRect(0, 0, value * barW, barH);
            console.log(value)

        }, this);

        // load images
        this.load.image('sponge', spongeImg);

        // load audio
        //this.load.audio('miss', 'assets/audio/Pew.mp3');

    }

    // change to "Home" scene
    create() {
        //this.scene.start('Home');
    }

}