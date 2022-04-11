// imports
import './style.css'
import 'phaser'
import bootScene from './scenes/bootScene.js';
import loadingScene from './scenes/loadingScene.js';
import homeScene from './scenes/homeScene.js';
import gameScene from './scenes/gameScene.js';

// Start
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [bootScene, loadingScene, homeScene, gameScene],
    title: 'My Game',                  // Shown in the console
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: false,                                     // if true pixel perfect rendering is used
    backgroundColor: '#000000'
};

const game = new Phaser.Game(config);