/**
 * Upgrade button
 */
export default class UpgradeButton extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y, img) {

        super(scene, x, y, img, 0);

        this.selected = false;      // true if the button is selected
        this.buttonState = 0;             // state of the button / upgrade: 0: not available, 1: available, 2: already active

    }

    /**
     * Select this button
     */
    select() {
        this.selected = true;
    }

    /**
     * Deselect this button
     */
    deselect() {
        this.selected = false;
    }

    /**
     * Set state of the button
     */
    setButtonState(state) {
        this.buttonState = state;
        this.setFrame(state);
    }

}