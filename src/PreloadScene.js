import { Scene } from 'phaser';

class PreloadScene extends Scene {
    constructor() {
        super('preload');
    }
    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('menu', 'assets/star.png');
    }

    create() {
        var logo = this.add.image(400, 150, 'logo');

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 200,
            ease: 'Power',
            yoyo: true,
            loop: -1
        });
        this.input.on('pointerdown', () =>this.scene.start('menu'));

    }
}

export default PreloadScene;