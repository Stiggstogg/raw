/**
 * Selector class which select the buttons in the editor.
 */
export default class Selector extends Phaser.GameObjects.Rectangle {

    /**
     * Constructor
     * @param {Phaser.Scene} scene - scene where the rectangle is placed
     * @param {number} lineWidth - width of the line in px
     * @param {number} lineColor - color of the line
     * @param {Phaser.GameObjects.Group} buttonGroup - group with all the upgrade buttons
     */
    constructor(scene, lineWidth, lineColor, buttonGroup, text, errorText, okButton) {

        super(scene, 0, 0, buttonGroup.getChildren()[0].width + lineWidth, buttonGroup.getChildren()[0].height + lineWidth);

        this.setStrokeStyle(lineWidth, lineColor, 1);       // set the style of the selector frame

        // button structure of the upgrade tree
        this.structure = [
            [buttonGroup.getChildren()[0], buttonGroup.getChildren()[1]],
            [buttonGroup.getChildren()[2], buttonGroup.getChildren()[3], buttonGroup.getChildren()[4], buttonGroup.getChildren()[5]],
            [buttonGroup.getChildren()[6]]
        ]

        // which button is selected
        this.selected = {
            row: 0,
            column: 0
        }

        this.text = text;               // text field which describes the upgrade
        this.errorText = errorText;     // text field which describes if there is an error
        this.okButton = okButton;       // Ok button to confirm the upgrade

        this.select();

    }

    /**
     * Move selection left
     */
    left() {

        this.deselect();        // deselect the currently active button

        const numItems = this.structure[this.selected.row].length; // number of items in the row

        if (this.selected.column > 0) {         // if it is not the very left item just choose one on the left
            this.selected.column = this.selected.column - 1;
        }
        else {                                  // if it is the very left choose the very right one
            this.selected.column = numItems - 1;
        }

        this.select();

    }

    /**
     * Move selection right
     */
    right() {

        this.deselect();        // deselect the currently active button

        const numItems = this.structure[this.selected.row].length; // number of items in the row

        if (this.selected.column < numItems - 1) {         // if it is not the very right item just choose one on the right
            this.selected.column = this.selected.column + 1;
        }
        else {                                  // if it is the very right choose the very left one
            this.selected.column = 0;
        }

        this.select();

    }

    /**
     * Move selection down
     */
    down() {

        this.deselect();        // deselect the currently active button

        switch(this.selected.row) {
            case 0:                   // down to the second row

                this.selected.row = 1;

                if (this.selected.column === 0) {
                    this.selected.column = 1;
                }
                else {
                    this.selected.column = 2;
                }
                break;
            case 1:                 // down to the last row
                this.selected.row = 2;
                this.selected.column = 0;
                break;
            default:                    // from the last row all the way up to the first one
                this.selected.row = 0;
                this.selected.column = 0;
                break;
        }

        this.select();

    }

    /**
     * Move selection up
     */
    up() {

        this.deselect();        // deselect the currently active button

        switch(this.selected.row) {
            case 0:                   // up to the last row

                this.selected.row = 2;
                this.selected.column = 0;
                break;
            case 1:                 // up to the first row
                this.selected.row = 0;

                if (this.selected.column < 2) {
                    this.selected.column = 0;
                }
                else {
                    this.selected.column = 1;
                }
                break;
            default:                    // from the last row to the second one
                this.selected.row = 1;
                this.selected.column = 0;
                break;
        }

        this.select();


    }

    /**
     * Deselect button
     */
    deselect() {

        this.structure[this.selected.row][this.selected.column].deselect();

    }

    /**
     * Select next button (for mobile controls)
     */
    next() {

        this.deselect();        // deselect the currently active button

        if (this.selected.column >= this.structure[this.selected.row].length - 1) {         // check if currently the last entry (column) of the selected row is selected
            this.selected.column = 0;                                                       // select the first column

            if (this.selected.row >= this.structure.length - 1) {                           // check if currently the last row is selected
                this.selected.row = 0;                                                      // select the first row
            }
            else {
                this.selected.row = this.selected.row + 1;                                  // select the next row
            }

        }
        else {
            this.selected.column = this.selected.column + 1;                                // select the next column
        }

        this.select();          // select the new key

    }

    /**
     * Select previous button (for mobile controls)
     */
    previous() {

        this.deselect();        // deselect the currently active button

        if (this.selected.column === 0) {                                           // check if currently the first entry (column) of the selected row is selected

            if (this.selected.row === 0) {                                          // check if currently the first row is selected
                this.selected.row = this.structure.length - 1;                      // select the last row
            }
            else {
                this.selected.row = this.selected.row - 1;                          // select the previous row
            }

            this.selected.column = this.structure[this.selected.row].length - 1;    // select the last column

        }
        else {
            this.selected.column = this.selected.column - 1;                        // select the previous column
        }

        this.select();          // select the new key

    }

    /**
     * Select the button
     */
    select() {

        const button = this.getSelectedButton();     // get the button to select

        button.select();                             // select this button

        this.setPosition(button.x, button.y);        // change the position of the rectangle to the one of the button

        this.text.setText(this.getText());           // provide description of the text

        // show the error text if needed
        switch (this.getSelectedButton().getButtonState()) {
            case 0:
                this.errorText.setText('(Not yet available)');
                this.okButton.notSelectable();
                break;
            case 1:
                this.errorText.setText('');
                this.okButton.selectable();
                break;
            case 2:
                this.errorText.setText('(Already activated)');
                this.okButton.notSelectable();
                break;
        }

    }

    /**
     * Select button by providing an index
     */
    selectByIndex(buttonIndex) {

        // set the selected button to the first one
        this.selected.row = 0;
        this.selected.column = 0;

        // execute the "next" action for as many times (minus one) as the button Index
        for (let i = 0; i < buttonIndex; i++) {
            this.next();
        }

        // select the button at the end (eventhough this is already in this.next(), it needs to be done for the first button)
        this.select();

    }

    /**
     * Get the currently selected button
     */
    getSelectedButton() {

        return this.structure[this.selected.row][this.selected.column];

    }

    /**
     * Get text of selected button
     */
    getText() {
        return this.getSelectedButton().getText();
    }

}