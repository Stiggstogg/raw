/**
 * Sprite class
 */
export default class Sponge extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y) {

        super(scene, x, y, 'sponge');
        this.setInteractive();

        this.on('pointerdown', this.click);

    }

    // what should happen if it is clicked on
    click(pointer) {
        console.log('spongibongy');
        this.scene.scene.start('Home');
    }
}