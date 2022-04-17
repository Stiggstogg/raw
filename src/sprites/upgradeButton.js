/**
 * Upgrade button
 */
export default class UpgradeButton extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y, img, buttonIndex) {

        super(scene, x, y, img, 0);

        this.selected = false;              // true if the button is selected
        this.buttonState = 0;               // state of the button / upgrade: 0: not available, 1: available, 2: already active
        this.buttonIndex = buttonIndex;     // index of the button: 0: graphics, 1: sound, 2: jump, 3: left, 4: crouch, 5: platforms, 6: double jump

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
        this.buttonState = state;       // set the state
        this.setFrame(state);           // change frame
    }

    /**
     * Get the index of the button
     */
    getButtonIndex() {
        return this.buttonIndex;
    }

    /**
     * Get button state
     */
    getButtonState() {
        return this.buttonState;
    }

}