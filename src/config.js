import Phaser from 'phaser'
import PreloadScene from './PreloadScene';
import GameScene from "./GameScene";
import MainMenu from "./MainMenu";


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [PreloadScene, MainMenu, GameScene],
};

export { config };