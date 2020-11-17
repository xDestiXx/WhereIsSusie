import { Scene } from 'phaser';

class MainMenu extends Scene{
    constructor() {
        super('main-menu');

    }
    preload(){
        console.log('preload w mainmenu')
        // this.load.image('')
    }

    create(){
        console.log('Create w mainmenu')

        let logo = this.add.image(400, 150, 'logo').setScale(0.5, 0.4);

        let buttonStartGame = this.add.image(400, 300, 'play-button').setInteractive().setScale(0.5);
        let buttonAbout = this.add.image(400, 340, 'about-button').setInteractive().setScale(0.5)

        buttonStartGame.on('pointerover', () =>{
            buttonStartGame.alpha = 1
            buttonAbout.alpha = 0.7
        })

        buttonAbout.on('pointerover', () =>{
            buttonAbout.alpha = 1
            buttonStartGame.alpha = 0.7
        });

        this.input.on('pointerout', () => {
            buttonStartGame.alpha = 1;
            buttonAbout.alpha = 1;
        })

//----start sceny gry
        buttonStartGame.on('pointerdown', () => {
            this.scene.start('intro')
        })
//----About
        buttonAbout.on('pointerdown', () =>{
            this.scene.start('about-scene')
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