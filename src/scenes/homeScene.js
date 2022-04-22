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
    init() {

        // get game width and height
        this.gw = this.sys.game.config.width;
        this.gh = this.sys.game.config.height;

    }

    /**
     * Shows the home screen and waits for the the user to select a menu entry
     */
    create() {

        // Title
        this.title = this.add.text(this.gw / 2, this.gh * 0.2, 'My Game', {
            fontFamily: 'Courier',
            fontSize: '80px',
            color: '#FFFF00',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0.5);

        // Instruction / press key text
        this.add.text(this.gw / 2, this.gh - 46,
            'Use arrow keys or W, A, S, D to select\nUse [SPACE] or [ENTER] to confirm', {
                font: '14px Courier',
                fill: '#27ff00'
            }).setOrigin(0.5);

        // Create the menu with its entries
        this.createMenu([
            'Start',
            'How to Play',
            'Credits'
        ]);

        // Add keyboard inputs
        this.addKeys();

    }

    /**
     * Creates the menu with its entries and sets the styles for it
     * @param {string[]} menuEntries - entries which should appear in the menu
     */
    createMenu(menuEntries) {

        // styles of the menu entries (active or inactive)
        this.inactiveStyle = {
            fontFamily: 'Courier',
            fontSize: '60px',
            fontStyle: '',
            fill: '#ffff00'
        }

        this.activeStyle = {
            fontFamily: 'Courier',
            fontSize: '70px',
            fontStyle: 'bold',
            fill: '#0000ff'
        }

        // start position and y space between the entries
        const start = {x: this.gw / 2, y: this.title.y + this.gh * 0.2};      // start position
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
        }

        this.items[this.selected].setStyle(this.activeStyle);   // change the style of the selected entry to the active style

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

    }

    /**
     * Action which happens when the enter or space key is pressed.
     */
    spaceEnterKey() {

        switch(this.selected) {
            case 0:                 // start the game when the first entry is selected ("Start")
                this.scene.start('Build', {                                 // TODO: change back to build
                    activeUpgrades: [false, false, false, false, false, false, false],            // order: graphics, sound, jump, left, crouch, platforms, double jump
                    activeCheckpoints: [true, true, true, true, true, true, true],
                });
                break;
            case 1:                 // start the "Howto" scene when the "How To Play" entry is selected
                console.log("HowTo");
                break;
            case 2:                 // start the "Credits" scene when the "How To Play" entry is selected
                console.log("Credits");
                break;
            default:
                this.scene.start('Game');   // start the game by default
                break;
        }

    }

}