import { Scene } from 'phaser';

class MainMenu extends Scene{
    constructor() {
        super('menu');

    }
    preload(){
    }

    create(){
        console.log('COs tam wyszł')
        let buttonStartGame;
        buttonStartGame = game.add.button(game.world.centerX - 95, 400, 'button1', this.startGame(), this, 2, 1, 0);
        // buttonStartGame.width = 40;
        // buttonStartGame.height = 40;
        // buttonStartGame.add.image(200,200, 'star');

    }
    createButton(){

        // buttonStartGame = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
        // buttonStartGame.width = 40;
        // buttonStartGame.height = 40;
        // buttonStartGame.add.image(200,200, 'star');
    }
    startGame(){
        this.scene.start('game')
    }
}