import UpgradeButton from './../sprites/upgradeButton.js'
import Selector from './../helper/selector.js'
import OkButton from './../sprites/okButton.js'
import LineDrawer from './../helper/lineDrawer.js';
import eventsCenter from '../helper/eventsCenter';

/**
 * "Editor" scene: Scene for the editor to choose upgrades
 */
export default class editorScene extends Phaser.Scene {

    /**
     * Constructor
     * @constructor
     */
    constructor() {
        super({
            key: 'Editor'
        });
    }

    /**
     * Initialize parameters
     */
    init(data) {

        // get game width and height
        this.gw = this.sys.game.config.width;
        this.gh = this.sys.game.config.height;

        // editor size and position
        const yRel = 0.10;     // relative position of the editor (to game height)
        const widthRel = 0.8;      // relative width of the editor (to game width)
        const heightRel = 0.7;     // relative height of the editor (game height)

        this.editorArea = {
            width: Math.round(this.gw * widthRel),                              // width of the editor (scene) area
            height: Math.round(this.gh * heightRel),                            // height of the editor (scene) area
            x: Math.round(this.gw / 2 - Math.round(this.gw * widthRel) / 2),     // top left position of the play area (camera position), x
            y: Math.round(this.gh * yRel)                                       // top left position of the editor (scene) area, y
        };

        // get data (active checkpoints and active upgrades)
        this.data = data;

        //console.log(this.editorArea);
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

        // bring scene on top
        this.scene.bringToTop();

        // creates the world
        this.createEditor();

        // create objects
        //this.createObjects();

        // Add keyboard inputs
        this.addKeys();

        // add mobile control inputs
        this.addMobileControls();

    }

    /**
     * Update function for the game loop.
     * @param {number} time
     * @param {number} delta
     */
    update(time, delta) {

    }

    /**
     * Add keyboard input to the scene.
     */
    addKeys() {

        // arrow keys to select the buttons / upgrades
        this.input.keyboard.addKey('Left').on('down', function() { this.selector.left() }, this);
        this.input.keyboard.addKey('Right').on('down', function() { this.selector.right() }, this);
        this.input.keyboard.addKey('Down').on('down', function() { this.selector.down() }, this);
        this.input.keyboard.addKey('Up').on('down', function() { this.selector.up() }, this);

        // space key (confirming a selection)
        this.input.keyboard.addKey('Space').on('down', this.activateUpgrade, this);

    }

    /**
     * Add mobile controls (through events)
     */
    addMobileControls() {

        // event listener to listen for any presses of buttons
        eventsCenter.on('mobileDown', function(type) {          // set "control pressed" to true for this control

            switch(type) {
                case 'left':
                    this.selector.previous();                               // select previous button entry
                    break;
                case 'right':
                    this.selector.next();                                   // select next button
                    break;
                case 'jump':
                    this.activateUpgrade();                                   // choose the update
                    break;
                default:
                    break
            }

        }, this);

        // event listener to listen for any presses of upgrade buttons
        eventsCenter.on('mobileUpgradeButton', function(buttonIndex) {          // set "control pressed" to true for this control

            this.selector.selectByIndex(buttonIndex);

        }, this);

        // cleanup the listeners for the events
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, function() {
            eventsCenter.off('mobileDown');
            eventsCenter.off('mobileUpgradeButton');
        });

    }


    /**
     * Create the editor elements
     */
    createEditor() {

        // get level data
        this.levelData = this.cache.json.get('levelData');

        // get uiElements data
        this.uiElements = this.cache.json.get('uiElements');

        // set the camera
        this.cameras.main.setPosition(this.editorArea.x, this.editorArea.y);                  // set the camera position
        this.cameras.main.setSize(this.editorArea.width, this.editorArea.height);             // set the camera size (editor size)

        // background
        const background = this.add.image(0, 0, 'editorBackground').setOrigin(0).setDepth(-2);

        // ------------------
        // Instruction text
        // ------------------

        this.add.text(this.relToGame(0.06), this.relToGame(0.06), 'Choose a new feature for your game!', {
                fontSize: '30px',
                fill: '#000000',
                fontStyle: 'bold',
                wordWrap: {width: this.relToGame(0.89, 'x')}
            }
        )

        this.add.text(this.relToGame(0.06), this.relToGame(0.22), 'Arrows or touch to select.\nSPACE or "Build" to confirm.', {
                fontSize: '20px',
                fill: '#000000',
                fontStyle: 'bold',
                wordWrap: {width: this.relToGame(0.88, 'x')}
            }
        )

        // ------------
        // buttons
        // ------------
        const buttonData = this.uiElements.buttons;      // get data on button placement and picture

        this.upgradeButtons = this.add.group();

        // create buttons and set their active or available state
        for (let i = 0; i < buttonData.length; i++) {

            let button = this.add.existing(new UpgradeButton(this,
                this.relToGame(buttonData[i].x, 'x'),
                this.relToGame(buttonData[i].y, 'y'),
                buttonData[i].key, i, buttonData[i].text));

            this.upgradeButtons.add(button);            // add the button to the group

            // set button to active or available
            if (this.data.activeUpgrades[i]) {          // set button state to already active if already activated
                button.setButtonState(2);
            }
            else {                                      // else set button state to available (might change later!)
                button.setButtonState(1);
            }

        }

        // check now if certain buttons are not available (because of dependencies)
        if (this.upgradeButtons.getChildren()[0].getButtonState() !== 2 || this.upgradeButtons.getChildren()[1].getButtonState() !== 2) {     // set the jump, left, crouch and platforms to "not available" when graphics and sound are not active

            for (let i = 2; i < 6; i++) {

                this.upgradeButtons.getChildren()[i].setButtonState(0);
            }
        }

        if (this.upgradeButtons.getChildren()[2].getButtonState() !== 2) {         // set the double jump  to "not available" when jump is not active

            this.upgradeButtons.getChildren()[6].setButtonState(0);

        }

        // textfield which describes the upgrade
        this.upgradeText = this.add.text(this.relToGame(0.08, 'x'), this.relToGame(0.73, 'y'), ' ', {
                fontSize: '30px',
                fill: '#000000',
                fontStyle: 'bold',
                wordWrap: {width: this.relToGame(0.84, 'x')}
            }
        );

        // OK button
        this.okButton = this.add.existing(new OkButton(this, this.relToGame(0.5, 'x'), this.relToGame(0.93, 'y')));
        this.okButton.on('pointerdown', this.activateUpgrade, this);

        // textfield which describes when an upgrade is not available
        this.errorText = this.add.text(this.upgradeText.x, this.relToGame(0.82, 'y'), ' ', {
                fontSize: '25px',
                fill: '#000000',
                fontStyle: 'bold',
                wordWrap: {width: this.relToGame(0.9, 'x')}
            }
        )

        // ----------
        // selector
        // ----------

        this.selector = this.add.existing(new Selector(this, 6, 0xffff00, this.upgradeButtons, this.upgradeText,
            this.errorText, this.okButton));

        // lines between the upgrades
        const lineDrawer = new LineDrawer(this, this.upgradeButtons);

        // rectangle for button area
        const buttonBackground = this.add.rectangle(this.relToGame(0.5, 'x'), this.relToGame(0.20, 'y'),
            this.relToGame(0.93, 'x'), this.relToGame(0.5, 'y'), 0x76428A);
        buttonBackground.setOrigin(0.5, 0).setDepth(-1).setStrokeStyle(3, 0x000000, 1);

        // rectangle for description
        const descriptionBackground = this.add.rectangle(buttonBackground.x, buttonBackground.y + buttonBackground.height,
            buttonBackground.width, this.relToGame(0.17, 'y'), 0xDF7126);
        descriptionBackground.setOrigin(0.5, 0).setDepth(-1).setStrokeStyle(3, 0x000000, 1);


    }

    /**
     * Activate an upgrade (or at least try to activate one
     */
    activateUpgrade() {

        const selectedButton = this.selector.getSelectedButton();

        if (selectedButton.getButtonState() === 1) {
            this.data.activeUpgrades[selectedButton.getButtonIndex()] = true;       // activate this upgrade
            this.scene.stop('UI');                                              // stop UI scene
            this.scene.stop('Game');                                            // stop game scene (which is still paused)
            this.scene.start('Build', this.data);                               // start game scene again
        }

    }


    /**
     * Calculate from relative coordinates to the game coordinates in pixels
     * @param {number} rel relative coordinate in the world
     * @param {string} dir direction of the coordinate ('x' or 'y')
     */
    relToGame(rel, dir) {

        if (dir === 'y') {
            return Math.round(rel * this.editorArea.height);
        }
        else {
            return Math.round(rel * this.editorArea.width);
        }
    }

}