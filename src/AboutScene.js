import { Scene } from 'phaser';

class AboutScene extends Scene{
    constructor() {
        super('about-scene');
    }
    preload(){
        console.log('Preload w AboutScene')
        console.log('Czy działa?')
    }
    create(){
        let aboutText = this.add.text(200, 600, "Where is Susie\n\nKod\n P.Sz\n\nPomysł\n P.Sz\n\nGrafika\n P.Sz\n\n\nMiłego grania.",{
            font: "24px monospace",
            fill: "#ffffff",
            align: "center",
            // backgroundColor: "#7A0059",
            fixedWidth: 400,
            fixedHeight: 400,
        })
        this.tweens.add({
            targets: aboutText,
            y: 100,
            duration: 1500,
            ease: 'Power',
            yoyo: false,
            loop: 0
        });
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                let backToMenuButton = this.add.image(400, 500, 'about-button').setInteractive().setScale(0.5)
                backToMenuButton.alpha = 0.7
                backToMenuButton.alpha = 0.7

                backToMenuButton.on('pointerover', () =>{
                    backToMenuButton.alpha = 1
                })

                this.input.on('pointerout', () => {
                    backToMenuButton.alpha = 0.7;
                })

//----start sceny gry
                backToMenuButton.on('pointerdown', () => {
                    this.scene.start('main-menu')
                })

        }
        })

    }
    addBackButton(){

    }
}

export default AboutScene
//     .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
//         font: "18px monospace",
//         fill: "#000000",
//         padding: { x: 20, y: 10 },
//         backgroundColor: "#ffffff"
//     })
//     .setScrollFactor(0)
//     .setDepth(20);
