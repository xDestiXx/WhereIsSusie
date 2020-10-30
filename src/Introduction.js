import { Scene } from 'phaser';

class Introduction extends Scene{
    constructor() {
        super('intro');

    }

    preload(){

    }
    create(){
        this.introduction()

    }
//
//------ Funkcja wyświetlająca wstęp
//
    introduction(){
        this.add.image(0, 0, 'sky').setOrigin(0,0);
        this.story = this.add.text(200, 600, "Where is Susie\n\nKod\n P.Sz\n\nPomysł\n P.Sz\n\nGrafika\n P.Sz\n\n\nMiłego grania.",{
            font: "24px monospace",
            fill: "#ffffff",
            align: "center",
            // backgroundColor: "#7A0059",
            fixedWidth: 400,
            fixedHeight: 400,
        })
        this.tweens.add({
            targets: this.story,
            y: -500,
            duration: 10000,
            ease: 'Power',
            yoyo: false,
            loop: 0
        });

    }

}
export default Introduction;

