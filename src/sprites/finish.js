/**
 * Sprite class
 */
export default class Finish extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y) {

        super(scene, x, y, 'finish');

        // set origin
        this.setOrigin(0, 1);

        // add physics to the sprite
        scene.physics.add.existing(this, true);

        // put hit box to the left and make it smaller
        this.body.setSize(this.width / 8, this.height);   // make the hitbox smaller
        this.body.setOffset(0, 0);        // set it to the very left

    }

}