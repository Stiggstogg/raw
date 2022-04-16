/**
 * Selector class which select the buttons in the editor.
 */
export default class Selector {

    /**
     * Constructor
     * @constructor
     * @param {Phaser.GameObjects.Group} buttonGroup - group of buttons
     */
    constructor(buttonGroup) {

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

    // deselect the currently active button
    deselect() {

        this.structure[this.selected.row][this.selected.column].deselect();

    }

    // select the currently active button
    select() {

        this.structure[this.selected.row][this.selected.column].select();

        console.log(this.structure[this.selected.row][this.selected.column].texture.key);

    }

}