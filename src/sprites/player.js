/**
 * Sprite class
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y, speed, jumpSpeed) {

        super(scene, x, y, 'player');
        this.setInteractive();

        // add physics to the sprite
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);   // limit the sprite to the boundaries of the world

        this.speed = speed;             // movement speed of the sprite
        this.jumpSpeed = jumpSpeed;     // speed of the jump

    }

    /**
     * Move the sprite
     * @param direction direction in which the sprite should move
     */
    move(direction) {

        switch(direction) {
            case 'up':                   // movement up (jump)

                if (this.body.blocked.down) {                   // jump only if the player is on the ground
                    this.body.setVelocityY(-this.jumpSpeed);
                }

                break;
            case 'left':                 // movement left
                this.body.setVelocityX(-this.speed);
                break;
            case 'right':                   // movement right
                this.body.setVelocityX(+this.speed);
                break;
            default:                    // stop movement (by default)
                this.body.setVelocityX(0);
                break;
        }

    }

}