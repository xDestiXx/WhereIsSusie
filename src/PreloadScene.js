import { Scene } from 'phaser';

class PreloadScene extends Scene {

    preload() {
        this.load.image('logo', 'assets/logo.png');
    }

    create() {
        var logo = this.add.image(400, 150, 'logo');

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            loop: -1
        });

    }
}

export default PreloadScene;