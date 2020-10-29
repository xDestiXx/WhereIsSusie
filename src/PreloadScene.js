import { Scene } from 'phaser';

class PreloadScene extends Scene {
    constructor() {
        super('preload');
    }
    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('play-button', 'assets/play.png');
        this.load.image('about-button', 'assets/about.png');
        //ładowanie assetów gry
        this.load.image('susie', 'assets/bomb.png');
        this.load.image('tiles','assets/where-is-Susie.png');
        this.load.image('star','assets/star.png');
        this.load.tilemapTiledJSON('map', 'JSON/mapaCSM.json');
        this.load.json('coordData', 'JSON/coordinates.json');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 24, frameHeight: 22 }
        );
    }

    create() {
        var logo = this.add.image(400, 150, 'logo');

        this.tweens.add({
            targets: logo,
            y: 300,
            duration: 1500,
            ease: 'Power',
            yoyo: false,
            loop: 0
        });
        // this.add.text(300,300,'Kliknij aby przejść dalej',{
        //     font: "18px monospace",
        //     fill: "#ffffff",
        //     padding: { x: 20, y: 10 },
        //     // backgroundColor: "#ffffff"
        // })
        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                this.addText()
                this.input.on('pointerdown', () => this.scene.start('main-menu'));
            },
            loop: false
        })

    }
//----------- Dodawanie tekstu pod logo
    addText(){
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 3;
        this.add.text(screenCenterX, 500,'Kliknij aby przejść dalej',{
                    font: "18px monospace",
                    fill: "#ffffff",
                })
    }
}

export default PreloadScene;