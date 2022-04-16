/**
 * Tile Sprite class
 */
export default class Checkpoint extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y, num) {

        super(scene, x, y, 'checkpoint');

        this.num = num

        // add physics to the sprite
        scene.physics.add.existing(this, true);
    }

    /**
     * Get the number of the checkpoint
     */
    getNum() {
        return this.num;
    }

}