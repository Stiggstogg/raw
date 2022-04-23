/**
 * Tile Sprite class
 */
export default class Block extends Phaser.GameObjects.TileSprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y, numTiles, unraw) {

        // get width and height of the loaded image
        const width = scene.textures.get('block').get(0).width;
        const height = scene.textures.get('block').get(0).height;

        super(scene, x, y, numTiles * width, height, 'block');

        this.unraw = unraw;     // if this is true the unraw image is shown, otherwise the raw one (graphics upgrade not activated)

        // set origin to 0, 0
        this.setOrigin(0);

        // add physics to the sprite
        scene.physics.add.existing(this, true);

        // set frame according to if the block is raw or unraw
        if (this.unraw) {
            this.setFrame(1);
        }
        else {
            this.setFrame(0);
        }

    }

}