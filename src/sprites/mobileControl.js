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

        // listen to the event when the item is clicked and unclicked
        this.on('pointerdown', this.click, this);
        this.on('pointerup', this.release, this);

        this.buttonType = img.replace('mobile', '').toLowerCase();       // store the button type (left, right, crouch, jump)

    }

    /**
     * Action which is done when the button is pressed.
     */
    click() {

        eventsCenter.emit('mobileDown', this.buttonType);

    }

    /**
     * Action which is done when the button is released.
     */
    release() {

        eventsCenter.emit('mobileUp', this.buttonType);


    }

}