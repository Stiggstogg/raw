/**
 * Sprite class
 */
export default class Checkpoint extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y, num, unraw) {

        super(scene, x, y, 'checkpoint', 0);

        this.num = num
        this.unraw = unraw;     // if this is true the unraw image is shown, otherwise the raw one (graphics upgrade not activated)

        // add physics to the sprite
        scene.physics.add.existing(this, true);

        // add animations
        this.addAnimations();

    }

    /**
     * Get the number of the checkpoint
     */
    getNum() {
        return this.num;
    }

    /**
     * Add the animations for the checkpoint
     */
    addAnimations() {

        if (this.unraw) {
            this.play('checkpointRotate');      // unraw animation
        }
        else {
            this.play('checkpointRotateRaw');   // raw animation
        }
    }

}