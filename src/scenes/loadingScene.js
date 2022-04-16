import uiBgImg from '../assets/images/uiBackground.png';
import playerImg from '../assets/images/Player.png';
import blockImg from '../assets/images/Block.png';
import backgroundImg from '../assets/images/Background.png';
import checkpointImg from '../assets/images/Checkpoint.png';
import levelJson from '../assets/json/level.json'

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
     * Initialize parameters
     */
    init() {

        // get game width and height
        this.gw = this.sys.game.config.width;
        this.gh = this.sys.game.config.height;

    }

    /**
     * Load all assets (for all scenes)
     */
    preload() {

        // show logo
        this.add.sprite(this.gw/2, this.gh/2, 'logo').setScale(1, 1); // logo is already preloaded in 'Boot' scene

        // text
        this.add.text(this.gw/2, this.gh * 0.20, 'CLOWNGAMING', {fontSize: '70px', color: '#FFFF00', fontStyle: 'bold'}).setOrigin(0.5);
        this.add.text(this.gw/2, this.gh * 0.73, 'Loading', {fontSize: '30px', color: '#27FF00'}).setOrigin(0.5);

        // progress bar background (e.g grey)
        const bgBar = this.add.graphics();
        const barW = this.gw * 0.3;            // progress bar width
        const barH = barW * 0.1;          // progress bar height
        const barX = this.gw / 2 - barW / 2;       // progress bar x coordinate (origin is 0, 0)
        const barY = this.gh * 0.8 - barH / 2   // progress bar y coordinate (origin is 0, 0)
        bgBar.setPosition(barX, barY);
        bgBar.fillStyle(0xF5F5F5, 1);
        bgBar.fillRect(0, 0, barW, barH);    // position is 0, 0 as it was already set with ".setPosition()"

        // progress bar
        const progressBar = this.add.graphics();
        progressBar.setPosition(barX, barY);

        // listen to the 'progress' event (fires every time an asset is loaded and 'value' is the relative progress)
        this.load.on('progress', function(value) {

            // clearing progress bar (to draw it again)
            progressBar.clear();

            // set style
            progressBar.fillStyle(0x27ff00, 1);

            // draw rectangle
            progressBar.fillRect(0, 0, value * barW, barH);

        }, this);

        // load images
        this.load.image('uiBackground', uiBgImg);
        this.load.image('player', playerImg);
        this.load.image('block', blockImg);
        this.load.image('background', backgroundImg);
        this.load.image('checkpoint', checkpointImg);

        // load audio
        //this.load.audio('miss', 'assets/audio/Pew.mp3');

        // load json
        this.load.json('levelData', levelJson);

    }

    /**
     * Add the animations and change to "Home" scene, directly after loading
     */
    create() {
        //this.scene.start('Home');
        this.scene.start('Game');  // TODO: Remove
    }

}