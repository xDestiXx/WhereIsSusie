import Phaser from 'phaser'
import PreloadScene from './PreloadScene';
import GameScene from "./GameScene";
import MainMenu from "./MainMenu";
import AboutScene from './AboutScene';


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [PreloadScene, MainMenu, GameScene, AboutScene],
};

export { config };