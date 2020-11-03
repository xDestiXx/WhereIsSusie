import { Scene } from 'phaser';
import { TextBox } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

class Introduction extends Scene{
    constructor() {
        super('intro');
        this.content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
        this.COLOR_PRIMARY = 0x4e342e;
        this.COLOR_LIGHT = 0x7b5e57;
        this.COLOR_DARK = 0x260e04;
    }

    preload(){
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
        this.GetValue = Phaser.Utils.Objects.GetValue;
    }
    create() {
        //this.introduction()
        this.createTextBox(100, 100, {
            wrapWidth: 500,
        })
            .start(this.content, 50);

    }
    createTextBox(x, y, config) {
        var wrapWidth = this.GetValue(config, 'wrapWidth', 0);
        var fixedWidth = this.GetValue(config, 'fixedWidth', 0);
        var fixedHeight = this.GetValue(config, 'fixedHeight', 0);
        var textBox = new TextBox({
            x: x,
            y: y,


            // background: this.scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, this.COLOR_PRIMARY)
            //     .setStrokeStyle(2, this.COLOR_LIGHT),

           // icon: this.scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, this.COLOR_DARK),

            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: this.getBBcodeText(wrapWidth, fixedWidth, fixedHeight),

            action: this.add.image(0, 0, 'nextPage').setTint(this.COLOR_LIGHT).setVisible(false),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
                text: 10,
            }
        })
            .setOrigin(0)
            .layout();

        textBox
            .setInteractive()
            .on('pointerdown', function () {
                var icon = this.getElement('action').setVisible(false);
                this.resetChildVisibleState(icon);
                if (this.isTyping) {
                    this.stop(true);
                } else {
                    this.typeNextPage();
                }
            }, textBox)
            .on('pageend', function () {
                if (this.isLastPage) {
                    return;
                }

                var icon = this.getElement('action').setVisible(true);
                this.resetChildVisibleState(icon);
                icon.y -= 30;
                var tween = scene.tweens.add({
                    targets: icon,
                    y: '+=30', // '+=100'
                    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 500,
                    repeat: 0, // -1: infinity
                    yoyo: false
                });
            }, textBox)
        //.on('type', function () {
        //})

        return textBox;
    }

    getBBcodeText(wrapWidth, fixedWidth, fixedHeight) {
        return rexUI.add.BBCodeText(0, 0, '', {
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,

            fontSize: '20px',
            wrap: {
                mode: 'word',
                width: wrapWidth
            },
            maxLines: 3
        })
    }

//
//------ Funkcja wyświetlająca wstęp
//
    introduction(){
        this.add.image(0, 0, 'textFrame').setOrigin(0,0);
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

////////////////////////////////////////





