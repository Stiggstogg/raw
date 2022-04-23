/**
 * OK in the editor
 */
export default class OkButton extends Phaser.GameObjects.Sprite {

    /**
     * Constructor
     * @constructor
     */
    constructor(scene, x, y) {

        super(scene, x, y, 'okButton', 0);

        this.setInteractive();

        this.okText = scene.add.text(this.x, this.y, 'OK', {
            fontSize: '30px',
            fill: '#000000',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(1);

    }

    /**
     * Make button selectable
     */
    selectable() {
       this.setFrame(0);
       this.okText.setColor('#000000');
    }

    /**
     * Make button not selectable
     */
    notSelectable() {
       this.setFrame(1);
        this.okText.setColor('#696A6A');
    }

}