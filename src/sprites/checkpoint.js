/**
 * Tile Sprite class
 */
export default class Checkpoint extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y) {

        super(scene, x, y, 'checkpoint');

        // add physics to the sprite
        scene.physics.add.existing(this, true);
    }

}