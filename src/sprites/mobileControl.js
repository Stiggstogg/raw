import eventsCenter from './../helper/eventsCenter'

/**
 * Mobile control button
 */
export default class MobileControl extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y, img) {

        super(scene, x, y, img, 0);

        this.setInteractive();      // make it interactive

        // listen to the event when the item is clicked and unclicked or moved away
        this.on('pointerdown', this.click, this);
        this.on('pointerup', this.release, this);
        this.on('pointerout', this.release, this);      // this will also stop the clicking when the button is still pressed but the pointer is moved away from the object

        this.buttonType = img.replace('mobile', '').toLowerCase();       // store the button type (left, right, crouch, jump)

        eventsCenter.on('moveKeyDown', this.makeClicked, this);    // make the button show as clicked when the corresponding key is pressed
        eventsCenter.on('moveKeyUp', this.makeUnclicked, this);    // make the button show as not clicked when the corresponding key is pressed

    }

    /**
     * Action which is done when the button is pressed.
     */
    click() {

        eventsCenter.emit('mobileDown', this.buttonType);       // emit the event that the button was pressed
        this.setFrame(1);                                       // set the image to pressed

    }

    /**
     * Action which is done when the button is released or the pointer is moved away
     */
    release() {

        eventsCenter.emit('mobileUp', this.buttonType);         // emit the event that the button was released
        this.setFrame(0);                                       // set the image back to normal


    }

    /**
     * Make the button clicked (when key is pressed)
     */
    makeClicked(type) {

        if (this.buttonType === type) {
            this.setFrame(1);
        }

    }

    /**
     * Make the button unclicked (when key is preleased)
     */
    makeUnclicked(type) {

        if (this.buttonType === type) {
            this.setFrame(0);
        }

    }

}