/**
 * Sprite class
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y, speed, jumpSpeed, doubleJumpActivated) {

        super(scene, x, y, 'player');
        this.setInteractive();

        // add physics to the sprite
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);   // limit the sprite to the boundaries of the world

        this.speed = speed;             // movement speed of the sprite
        this.jumpSpeed = jumpSpeed;     // speed of the jump

        this.onGround = false;                              // true if the player is standing on ground
        this.doubleJumpActivated = doubleJumpActivated;     // true if double jump is activated
        this.secondJump = 0;

    }

    /**
     * Move the sprite
     * @param direction direction in which the sprite should move
     */
    move(direction) {

        switch(direction) {
            case 'up':                   // movement up (jump)
                this.jump();
                break;
            case 'left':                 // movement left
                this.body.setVelocityX(-this.speed);
                break;
            case 'right':                   // movement right
                this.body.setVelocityX(+this.speed);
                break;
            case 'down':                    // crouch
                this.body.setSize(this.width, this.height/2);   // set the hit box half as high
                this.body.setOffset(0, this.height/2);          // set the offset of the hitbox so that the hitbox is at the bottom of the sprite
                 break;
            default:                    // stop movement (by default)
                this.body.setVelocityX(0);
                break;
        }

    }

    /**
     * Uncrouch (reset the hitbox)
     */
    uncrouch() {

        this.body.setSize(this.width, this.height);   // set the hit box back to the size of the sprite
        this.body.setOffset(0, 0);        // set the offset back

    }

    /**
     * Update
     */
    update(args) {

        this.onGround = this.body.blocked.down         // check if player is standing on the ground


    }

    /**
     * Jump
     */
    jump() {

        if (this.onGround) {                   // jump only if the player is on the ground
            this.body.setVelocityY(-this.jumpSpeed);
            this.secondJump = true;             // set the trigger for the double jump to true as soon as the first jump was executed
        }
        else if (this.doubleJumpActivated && this.secondJump) {     // double jump (only when activated and the player is in the air and the first jump was executed)
            this.body.setVelocityY(-this.jumpSpeed);
            this.secondJump = false;
        }

    }

}