/**
 * Line drawer class which draws the lines between the upgrades (in the editor scene)
 */
export default class LineDrawer {

    /**
     * Constructor
     * @param {Phaser.Scene} scene - scene where the rectangle is placed
     * @param {number} lineWidth - width of the line in px
     * @param {number} lineColor - color of the line
     * @param {Phaser.GameObjects.Group} buttonGroup - group with all the upgrade buttons
     */
    constructor(scene, buttonGroup) {

        this.lineWidth = 2;
        this.lineColor = '#ffffff';
        this.scene = scene;

        // button structure of the upgrade tree
        this.buttonGroup = buttonGroup;

        // get parameters
        this.buttonHeight = this.buttonGroup.getChildren()[0].height;       // height of the buttons
        this.buttonGap = (this.buttonGroup.getChildren()[2].y - this.buttonHeight / 2) - (this.buttonGroup.getChildren()[0].y + this.buttonHeight / 2);     // vertical gap between the buttons in first and second row

        this.drawOne([
            this.buttonGroup.getChildren()[0],
            this.buttonGroup.getChildren()[1]
        ]);

        this.drawTwo([
            this.buttonGroup.getChildren()[2],
            this.buttonGroup.getChildren()[3],
            this.buttonGroup.getChildren()[4],
            this.buttonGroup.getChildren()[5]
        ]);

        this.drawThree([
            this.buttonGroup.getChildren()[2],
            this.buttonGroup.getChildren()[6]
        ]);

    }

    /**
     * Draw lines down from the first row of buttons
     */
    drawOne(buttonArray) {

        // calculate important positions
        const yZero = buttonArray[0].y + this.buttonHeight / 2;
        const yOne = yZero + this.buttonGap / 3;
        const yTwo = yOne + this.buttonGap / 3;
        const xMiddle = (buttonArray[0].x + buttonArray[1].x) /2;

        // vertical lines down from the buttons
        for (let i = 0; i < buttonArray.length; i++) {

            let button = buttonArray[i];
            this.scene.add.line(0, 0, button.x, yZero, button.x, yOne, this.lineColor).setOrigin(0).setLineWidth(this.lineWidth);

        }

        // horizontal line between the vertical lines
        this.scene.add.line(0, 0, buttonArray[0].x, yOne, buttonArray[1].x, yOne, this.lineColor).setOrigin(0).setLineWidth(this.lineWidth);

        // vertical line (between the two horizontal lines)
        this.scene.add.line(0, 0, xMiddle , yOne, xMiddle, yTwo, this.lineColor).setOrigin(0).setLineWidth(this.lineWidth);

    }

    /**
     * Draw lines up from the second row of buttons
     */
    drawTwo(buttonArray) {

        // calculate important positions
        const yZero = buttonArray[0].y - this.buttonHeight/ 2 - this.buttonGap / 3;
        const yOne = yZero + this.buttonGap / 3;

        // vertical lines up from the buttons
        for (let i = 0; i < buttonArray.length; i++) {

            let button = buttonArray[i];
            this.scene.add.line(0, 0, button.x, yZero, button.x, yOne, this.lineColor).setOrigin(0).setLineWidth(this.lineWidth);

        }

        // horizontal line between the vertical lines
        this.scene.add.line(0, 0, buttonArray[0].x, yZero, buttonArray[3].x, yZero, this.lineColor).setOrigin(0).setLineWidth(this.lineWidth);

    }

    /**
     * Draw lines up from the third row of buttons
     */
    drawThree(buttonArray) {

        this.scene.add.line(0, 0,
            buttonArray[1].x, buttonArray[1].y - this.buttonHeight / 2,
            buttonArray[1].x, buttonArray[0].y + this.buttonHeight / 2,
            this.lineColor).setOrigin(0).setLineWidth(this.lineWidth);

    }

}