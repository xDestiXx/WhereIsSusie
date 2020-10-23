import { Scene } from 'phaser';

class GameScene extends Scene{
    constructor() {
        super('game');
    }

    preload(){
        this.load.image('menu', 'assets/star.png');
    }

    create(){
        console.log('scena gry')
        this.add.image(300, 200, 'menu')

    }
}
export default GameScene;