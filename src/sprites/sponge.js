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

        this.speed = 10;     // movement speed of the sprite

    }

    /**
     * Action which should happen when the sprite is clicked
     * @param pointer pointer
     */
    click(pointer) {
        console.log('spongibongy');
        this.scene.scene.start('Home');
    }

    /**
     * Move the sprite
     * @param direction direction in which the sprite should move
     */
    move(direction) {

        switch(direction) {
            case 'up':                   // movement up
                this.y -= this.speed;
                break;
            case 'down':                 // movement down
                this.y += this.speed;
                break;
            case 'left':                 // movement left
                this.x -= this.speed;
                break;
            default:                     // movement right (by default)
                this.x += this.speed;
                break;
        }

    }

}