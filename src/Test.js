import { Scene } from 'phaser';

const BG_COLOR = 0x260e04;
const FRAME_COLOR = 0x915F08;
const DOT_COLOR = 0x4A2513;
let endText = false;

let content = `Za 5 minut zaczynasz zajęcia, na które potrzebujesz symulator. Niestety Susie stwierdziła, że to dobry czas na zabawę w chowanego. Musisz jak najszybciej ją odnaleźć aby zajęcia mogły się odbyć o czasie. Powodzenia!`;

class Test extends Scene {
    constructor() {
        super({
            key: 'test'
        })
    }

    preload() {
        this.load.image('nextPage', 'assets/arrow-down-left.png');
    }

    create() {
        createTextBox(this, 100, 100, {
            wrapWidth: 500,
        })
            .start(content, 50)
        this.addButton(100,100,'tekstsss', 100, 100)
    }
    addButton(x,y,string,fixedWidth,fixedHeight){
        let buttonStartGame = this.add.text(x, y, string, {
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,
            backgroundColor: "#ffffff"
        }).setInteractive().setScale(0.5)
    }

}


const GetValue = Phaser.Utils.Objects.GetValue;
let createTextBox = function (scene, x, y, config) {
    let wrapWidth = GetValue(config, 'wrapWidth', 0);
    let fixedWidth = GetValue(config, 'fixedWidth', 0);
    let fixedHeight = GetValue(config, 'fixedHeight', 0);
    let textBox = scene.rexUI.add.textBox({
        x: x,
        y: y,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 15, BG_COLOR)
            .setStrokeStyle(2, FRAME_COLOR),

        icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, DOT_COLOR), // ikonka

        text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),

       // action: scene.add.image(0, 0, 'nextPage').setTint(DOT_COLOR).setVisible(false),

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
            //let icon = this.getElement('action').setVisible(false);
            //this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                return //start new scene here
                scene.scene.start('game')
            }
        }, textBox)
    return textBox;
}

let getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.add.text(0, 0, '', {
        fontSize: '20px',
        wordWrap: {
            width: wrapWidth
        },
        maxLines: 6
    })
        .setFixedSize(fixedWidth, fixedHeight);
}

export default Test