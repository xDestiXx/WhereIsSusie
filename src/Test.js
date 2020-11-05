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
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.add.image(0,0, 'sky').setOrigin(0,0)
        createTextBox(this, this.screenCenterX - 270, 200, { // 270 bo space ustawione na 20 left i 20 right 540/2
            wrapWidth: 500,
        })
            .start(content, 50)

        // Dodanie przycisku po 2 sekundach
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.addButton(500, 'Kontynuuj...', 150, 5, 10, "#260E04")
            }
        })

    }

//
//------ Funkcja tworząca przycisk
//
    addButton(y,string,fixedWidth,paddingX, paddingY, backgroundColor){
        let buttonStartGame = this.add.text(this.screenCenterX-75, y, string, {
            fixedWidth: fixedWidth,
            backgroundColor: backgroundColor,
            padding: { x: paddingX, y: paddingY },
            align: "center",
        }).setInteractive()

        buttonStartGame.on('pointerover', () => {
            buttonStartGame.setBackgroundColor('#5F2614')
        })
        buttonStartGame.on('pointerout', () => {
            buttonStartGame.setBackgroundColor('#260E04')
        })
        buttonStartGame.on('pointerdown', () => {
            this.scene.start('game')
        })

    }

}

//
//------ Tworzenie textboxa
//
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