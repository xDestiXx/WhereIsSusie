import Phaser from 'phaser'
import PreloadScene from './PreloadScene';
import GameScene from "./GameScene";
import MainMenu from "./MainMenu";
import AboutScene from './AboutScene';
import Introduction from "./Introduction";


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: false,
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
    scene: [PreloadScene, MainMenu, Introduction, GameScene, AboutScene],
};

export { config };