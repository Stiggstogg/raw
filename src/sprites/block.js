/**
 * Tile Sprite class
 */
export default class Block extends Phaser.GameObjects.TileSprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y, numTiles) {

        // get width and height of the loaded image
        const width = scene.textures.get('block').get(0).width;
        const height = scene.textures.get('block').get(0).height;

        super(scene, x, y, numTiles * width, height, 'block');

        // set origin to 0, 0
        this.setOrigin(0);

        // add physics to the sprite
        scene.physics.add.existing(this, true);
    }

}