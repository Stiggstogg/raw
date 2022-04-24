import monetization from './../helper/monetization.js';

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
     * Initialize parameters
     */
    init(data) {

        // get game width and height
        this.gw = this.sys.game.config.width;
        this.gh = this.sys.game.config.height;

        // background movement speed
        this.backgroundSpeed = 0.7;        // absolute background movement speed

        // get data
        this.data = data;

        // set music keys
        this.musicKeys = ['menuMusic', 'menuRockMusic'];

    }

    /**
     * Shows the home screen and waits for the the user to select a menu entry
     */
    create() {

        // Title
        const titleAngle = 3;

        this.title = this.add.text(this.relToGame(0.5, 'x'), this.relToGame(0.1, 'y'), 'UNRAWIFY', {
            fontFamily: 'Courier',
            fontSize: '90px',
            color: '#37946E',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0.5).setAngle(titleAngle);

        this.tweens.add({               // angle tween
            targets: this.title,
            duration: 2000,
            angle: - titleAngle,
            pause: false,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({               // angle tween
            targets: this.title,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 500,
            pause: false,
            yoyo: true,
            repeat: -1
        });

        // Instruction / press key text
        this.add.text(this.relToGame(0.1, 'x'), this.relToGame(0.7, 'y'),
            'Controls (Keyboard):\nArrow keys for movement\nSPACE to select\nESC to go back to Menu\n\n' +
            'Controls (Mobile):\nTouch and mobile buttons', {
                fontFamily: 'Courier',
                fontSize: '25px',
                fontStyle: 'bold',
                fill: '#AC3232'
            }).setOrigin(0);

        // Create the menu with its entries
        this.createMenu([
            'Start',
            'Music'
        ]);

        // Add keyboard inputs
        this.addKeys();

        // Setup mobile controls
        this.mobileControlsSetup();

        // Music
        this.setupMusic();

        // Setup background and animations
        this.backgroundAnimSetup();

    }

    /**
     * Update method
     */
    update(time, delta) {


        // move background
        for (let i = 0; i < this.backgroundImages.getLength(); i++) {

            let background = this.backgroundImages.getChildren()[i];

            background.x -= this.backgroundSpeed;

            if (background.x <= -background.width) {
                background.x = this.relToGame(2, 'x');
            }

        }

        // set correct animation
        let currentImg;

        if (this.backgroundImages.getChildren()[0].x <= 0) {
            currentImg = this.backgroundImages.getChildren()[0];
        }
        else {
            currentImg = this.backgroundImages.getChildren()[1];
        }

        if (currentImg.x <= - currentImg.width * 0.25 && currentImg.x >= - currentImg.width * 0.75) {

            if (this.player.anims.getName() !== 'playerWalk') {       // start this animation only if the same is not already running or if none is running
                this.player.play('playerWalk');
            }

        }
        else {

            if (this.player.anims.getName() !== 'playerRaw') {       // start this animation only if the same is not already running or if none is running
                this.player.play('playerRaw');
            }

        }

        // change button based on monetization state
        if (monetization.isMonetized || this.cheat) {
            this.monetizationButton.setFrame(1);
            this.monetizationButton.tween.play();
        }
        else {
            this.monetizationButton.setFrame(0);
            this.monetizationButton.tween.stop();
        }

    }

    /**
     * Creates the menu with its entries and sets the styles for it
     * @param {string[]} menuEntries - entries which should appear in the menu
     */
    createMenu(menuEntries) {

        // save menu texts
        this.menuTexts = menuEntries;

        // styles of the menu entries (active or inactive)
        this.inactiveStyle = {
            fontFamily: 'Courier',
            fontSize: '60px',
            fontStyle: 'bold',
            fill: '#AC3232'
        }

        this.activeStyle = {
            fontFamily: 'Courier',
            fontSize: '70px',
            fontStyle: 'bold',
            fill: '#5B6EE1'
        }

        // start position and y space between the entries
        const start = {x: this.relToGame(0.5, 'x'), y: this.title.y + this.relToGame(0.13, 'y')};      // start position
        const ySpace = this.gh * 0.1;                                         // ySpace between the entries

        this.items = [];

        // create menu items (loop through each item)
        for (let i in menuEntries) {
            this.items.push(this.add.text(start.x, start.y + i * ySpace, menuEntries[i])
                .setOrigin(0.5));
        }

        this.selected = 0;                  // set which entry is selected (0: first one)
        this.highlightSelected();         // highlight the selected entry
    }

    /**
     * Select the next menu entry (when clicking down)
     */
    selectNext() {

        // select the next, or if it is the last entry select the first again
        if (this.selected >= this.items.length - 1) {
            this.selected = 0;              // select the first entry
        }
        else {
            this.selected++;                // select the previous entry
        }

        // highlight the selected entry
        this.highlightSelected();

    }

    /**
     * Select the previous menu entry (when clicking up)
     */
    selectPrevious() {

        // select the previous, or if it is the first entry select the last again
        if (this.selected <= 0) {
            this.selected = this.items.length -1;   // select the last entry
        }
        else {
            this.selected--;                        // select the previous entry
        }

        // highlight the selected entry
        this.highlightSelected();

    }

    /**
     * Highlights the selected entry (changing the styles of the deselected and selected entries)
     */
    highlightSelected() {

        for (let i in this.items) {
            this.items[i].setStyle(this.inactiveStyle);         // change the style of all entries to the inactive style

            this.items[i].setText(this.menuTexts[i]);           // set the text back to the normal one
        }

        this.items[this.selected].setStyle(this.activeStyle);   // change the style of the selected entry to the active style
        this.items[this.selected].setText('-' + this.items[this.selected].text + '-');    // add markers to the selected item text

    }

    /**
     * Add keyboard input to the scene.
     */
    addKeys() {

        // up and down keys (moving the selection of the entries)
        this.input.keyboard.addKey('Down').on('down', function() { this.selectNext() }, this);
        this.input.keyboard.addKey('S').on('down', function() { this.selectNext() }, this);
        this.input.keyboard.addKey('Up').on('down', function() { this.selectPrevious() }, this);
        this.input.keyboard.addKey('W').on('down', function() { this.selectPrevious() }, this);

        // enter and space key (confirming a selection)
        this.input.keyboard.addKey('Enter').on('down', function() { this.spaceEnterKey() }, this);
        this.input.keyboard.addKey('Space').on('down', function() { this.spaceEnterKey() }, this);

        this.input.keyboard.addKey('M').on('down', function() { this.cheat = !this.cheat }, this);      // TODO: Remove this after the game jam!

    }

    /**
     * Action which happens when the enter or space key is pressed.
     */
    spaceEnterKey() {

        switch(this.selected) {
            case 0:                 // start the game when the first entry is selected ("Start")
                this.startGame();
                break;
            default:            // Select the music
                this.toggleMusic();
                break;
        }

    }

    mobileControlsSetup() {

        // set the menu item texts to interactive
        for (let i in this.items) {
            this.items[i].setInteractive();
        }

        this.items[0].on('pointerdown', this.startGame, this);      // start game when "START" is selected
        this.items[1].on('pointerdown', this.toggleMusic, this);      // start game when "START" is selected

    }

    /**
     * Start the game
     */
    startGame() {

        this.music.stop();
        this.scene.start('Build', {                                 // TODO: change back to build
            musicType: this.data.musicType,
            activeUpgrades: [false, false, false, false, false, false, false],            // order: graphics, sound, jump, left, crouch, platforms, double jump
            activeCheckpoints: [true, true, true, true, true, true, true],
        });

    }

    /**
     * Setup the music
     */
    setupMusic() {

        // choose music and play it
        this.music = this.sound.add(this.musicKeys[this.data.musicType]);
        this.music.play({loop: true});

        // Music text
        this.musicText = this.add.text(this.relToGame(0.5, 'x'), this.items[1].y + this.relToGame(0.04, 'y'),
            'Grooovy', {
                fontFamily: 'Courier',
                fontSize: '30px',
                fontStyle: 'bold',
                fill: '#AC3232'
            }).setOrigin(0.5);

        if (this.data.musicType === 1) {
            this.musicText.setText('Rock \'n\' Roll!');
        }

        // web monetization cheat
        this.cheat = false;

        // Web Monetization text
        this.monetizationInstructions = [
            'Wanna hear some Rock \'n\' Roll music?\n' +
            'Get a Coil subscription on coil.com and support my Rock \'n\' Roll lifestyle!\nThanks.',
            'Thank you for supporting my Rock \'n\' Roll lifestyle!'
        ];

        this.monetizationTextTitle = this.add.text(this.relToGame(0.5, 'x'), this.musicText.y + this.relToGame(0.06, 'y'),
            'Web-Monetization', {
                fontFamily: 'Courier',
                fontSize: '30px',
                fontStyle: 'bold',
                fill: '#D77BBA',
            }).setOrigin(0.5).setVisible(false);

        this.monetizationText = this.add.text(this.relToGame(0.10, 'x'), this.monetizationTextTitle.y + this.relToGame(0.03, 'y'),
            this.monetizationInstructions[0], {
                fontFamily: 'Courier',
                fontSize: '30px',
                fontStyle: 'bold',
                fill: '#D77BBA',
                wordWrap: {width: this.relToGame(0.90, 'x')}
            }).setOrigin(0).setVisible(false);

        // monetization Icon
        this.monetizationButton = this.add.image(this.items[1].x + this.items[1].width + this.relToGame(0.03, 'x'), this.items[1].y, 'monetization').setFrame(0);

        this.monetizationButton.tween = this.tweens.add({               // rotation tween
            targets: this.monetizationButton,
            duration: 3000,
            angle: 360,
            paused: true,
            yoyo: false,
            repeat: -1
        });

    }

    /**
     * Change between normal and rock music
     */
    toggleMusic() {

        if (monetization.isMonetized || this.cheat) {             // only change music if monetized

            // make instruction text invisible
            this.monetizationTextTitle.setVisible(true);
            this.monetizationText.setVisible(true);
            this.monetizationText.setText(this.monetizationInstructions[1]);    // show thank you text

            this.music.stop();

            if (this.data.musicType === 0) {            // change to rock music
                this.data.musicType = 1;
                this.musicText.setText('Rock \'n\' Roll!');

            }
            else {                                      // change to normal music
                this.data.musicType = 0;
                this.musicText.setText('Grooovy');
            }

            this.music = this.sound.add(this.musicKeys[this.data.musicType]);
            this.music.play({loop: true});

        }
        else {

            // make instruction text visible
            this.monetizationTextTitle.setVisible(true);
            this.monetizationText.setVisible(true);

            this.monetizationText.setText(this.monetizationInstructions[0]);    // show thank you text

        }


    }

    /**
     * Setup the background and animations
     */
    backgroundAnimSetup() {

        // add background picture
        this.backgroundImages = this.add.group();
        this.backgroundImages.add(this.add.image(0, 0, 'menuBackground').setOrigin(0).setDepth(-1));
        this.backgroundImages.add(this.add.image(this.relToGame(2, 'x'), 0, 'menuBackground').setOrigin(0).setDepth(-1));

        // add player
        this.player = this.add.sprite(this.relToGame(0.5, 'x'), this.relToGame(0.96, 'y'), 'player').setOrigin(0.5, 1);
        this.player.play('playerWalk');

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