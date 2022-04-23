/**
 * Sprite class
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y, speed, jumpSpeed, doubleJumpActivated, crouchActivated, unraw) {

        super(scene, x, y, 'player', 0);

        this.unraw = unraw;     // if this is true the unraw image is shown, otherwise the raw one (graphics upgrade not activated)

        // add physics to the sprite
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);   // limit the sprite to the boundaries of the world

        this.speed = speed;             // movement speed of the sprite
        this.jumpSpeed = jumpSpeed;     // speed of the jump

        this.onGround = false;                              // true if the player is standing on ground
        this.crouchActivated = crouchActivated;                                // you are not crouching at the beginning
        this.doubleJumpActivated = doubleJumpActivated;     // true if double jump is activated
        this.secondJump = 0;

        // set the hitbox size
        this.body.setSize(this.width/2, this.height);   // set the hit box half as high

        // make sure the player is always in the foreground
        this.setDepth(2);

        this.setAnimKeysFramesHit();                    // set the animation key and frames and hitbox (based on crouch or not)



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
                this.flipX = true;
                break;
            case 'right':                   // movement right
                this.body.setVelocityX(+this.speed);
                this.flipX = false;
                break;
            default:                    // stop movement (by default)
                this.body.setVelocityX(0);
                break;
        }

    }

    /**
     * Update
     */
    update(args) {

        this.onGround = this.body.blocked.down         // check if player is standing on the ground

        this.setAnimation();                            // check for the correct animation and set it

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

    /**
     * set animations
     */
    setAnimation() {

        // run correct animation
        if (this.body.velocity.x !== 0 && this.onGround) {          // if player is moving and on the ground: play walk animation

            if (this.anims.getName() !== this.walkAnimKey || !this.anims.isPlaying) {       // start this animation only if the same is not already running or if none is running
                this.play(this.walkAnimKey);
            }

        }
        else if (!this.onGround) {                                  // if player is in the air, stop all animations and set to the jump frame

            if (this.anims.isPlaying) {
                this.anims.stop();
            }

            this.setFrame(this.jumpFrame);

        }
        else {

            if (this.anims.getName() !== this.idleAnimKey || !this.anims.isPlaying) {
                this.play(this.idleAnimKey);

            }

        }

    }

    /**
     * set animation keys and frames and the hitbox, based on if crouch is activated or not
     */
    setAnimKeysFramesHit() {

        if (!this.unraw) {

            // set crouch animation keys and frames
            this.walkAnimKey = 'playerRaw';
            this.idleAnimKey = 'playerRaw';
            this.jumpFrame = 12;

        }
        else if (this.crouchActivated) {

            // set crouch animation keys and frames
            this.walkAnimKey = 'playerCrouchWalk';
            this.idleAnimKey = 'playerCrouchIdle';
            this.jumpFrame = 11;

            // set smaller hitbox for crouch
            this.body.setSize(this.width/2, this.height/2);   // set the hit box half as high
            this.body.setOffset(this.width/2 - this.width/4, this.height/2);          // set the offset of the hitbox so that the hitbox is at the bottom of the sprite

        }
        else {

            // set normal animation keys and frames
            this.walkAnimKey = 'playerWalk';
            this.idleAnimKey = 'playerIdle';
            this.jumpFrame = 6;

        }

    }

}