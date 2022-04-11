// import objects
import Sponge from '../sprites/sponge.js'

// "Game" scene: This is the main scene of the game
export default class gameScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'Game'
        });
    }

    // initiate scene parameters
    init() {

    }

    // load assets
    preload() {

    }

    // create objects (executed once after preload())
    create() {

        this.add.existing(new Sponge(this, 100, 100));

    }

    // update method
    update(time, delta) {

    }

}