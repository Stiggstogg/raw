// imports
import './style.css'
import 'phaser'
import bootScene from './scenes/bootScene.js';
import loadingScene from './scenes/loadingScene.js';
import homeScene from './scenes/homeScene.js';
import gameScene from './scenes/gameScene.js';
import uiScene from './scenes/uiScene.js';
import editorScene from './scenes/editorScene.js';

// Start
const config = {
    type: Phaser.AUTO,
    width: 180,
    height: 380,
    scene: [bootScene, loadingScene, homeScene, gameScene, uiScene, editorScene],
    title: 'Upgrade',                  // Shown in the console
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: false,                                     // if true pixel perfect rendering is used
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 1000},
            debug: false
         }
    }
};

const game = new Phaser.Game(config);