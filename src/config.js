import Phaser from 'phaser'
import PreloadScene from './PreloadScene';
import GameScene from "./GameScene";
import MainMenu from "./MainMenu";
import AboutScene from './AboutScene';
import Introduction from "./Introduction";
import Test from "./Test";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin'

const config = {
    type: Phaser.CANVAS,
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
    scene: [PreloadScene, MainMenu, Introduction,Test , GameScene, AboutScene],
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

export { config };