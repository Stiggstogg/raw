/**
 * Sprite class
 */
export default class Finish extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y, unraw) {

        super(scene, x, y, 'finish', 0);

        this.unraw = unraw;     // if this is true the unraw image is shown, otherwise the raw one (graphics upgrade not activated)

        // set origin
        this.setOrigin(0, 1);

        // add physics to the sprite
        scene.physics.add.existing(this, true);

        // put hit box to the left and make it smaller
        this.body.setSize(this.width / 4, this.height);   // make the hitbox smaller
        this.body.setOffset(0, 0);        // set it to the very left

        // set frame according to if the finish is raw or unraw
        if (this.unraw) {
            this.setFrame(1);
        }
        else {
            this.setFrame(0);
        }
    }

}