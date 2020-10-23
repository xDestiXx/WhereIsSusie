import { Scene } from 'phaser';

class MainMenu extends Scene{
    constructor() {
        super('mainmenu');

    }
    preload(){
        console.log('preload w mainmenu')
        // this.load.image('')
    }

    create(){
        console.log('Create w mainmenu')
        let buttonStartGame = this.add.image(300, 300, 'menu').setInteractive();

        this.input.on('pointerover', () =>{
            buttonStartGame.setTint(0xFF0905)
        })
        // buttonStartGame = this.game.add.button(this.game.world.centerX - 95, 400, 'button1', this.startGame(), this, 2, 1, 0);
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

export default MainMenu;