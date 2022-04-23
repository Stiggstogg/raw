// imports
import './style.css'
import 'phaser'
import bootScene from './scenes/bootScene.js';
import loadingScene from './scenes/loadingScene.js';
import homeScene from './scenes/homeScene.js';
import gameScene from './scenes/gameScene.js';
import uiScene from './scenes/uiScene.js';
import editorScene from './scenes/editorScene.js';
import finishScene from './scenes/finishScene.js';
import buildScene from './scenes/buildScene.js';

// Start
const config = {
    type: Phaser.WEBGL, //Phaser.AUTO,
    width: 540,
    height: 1140,
    scene: [bootScene, loadingScene, homeScene, gameScene, uiScene, editorScene, finishScene, buildScene],
    title: 'Upgrade',                  // Shown in the console
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    //pixelArt: true,                                     // if true pixel perfect rendering is used (sets antialias: false and roundPixels: true)
    roundPixels: true,
    antialias: true,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 3000},
            debug: false
         }
    },
};

const game = new Phaser.Game(config);