import { Scene } from 'phaser';

class GameScene extends Scene{
    constructor() {
        super('game');

    }


    preload(){
        this.load.image('menu', 'assets/star.png');

    }

    create(){
        console.log('scena gry')
        //kod gry
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("where-is-Susie", "tiles");
        const belowLayer = map.createStaticLayer("Poniżej gracza", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("world", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ collides: true });

        player = this.physics.add
            .sprite(50, 450, 'star')
        //.setSize(32, 48)
        //.setOffset(0, 24);

        // Watch the player and worldLayer for collisions, for the duration of the scene:
        this.physics.add.collider(player, worldLayer);
        this. cameras.main.roundPixels = true;
        const camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        cursors = this.input.keyboard.createCursorKeys();

        // // Help text that has a "fixed" position on the screen
        // this.add
        //     .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
        //         font: "18px monospace",
        //         fill: "#000000",
        //         padding: { x: 20, y: 10 },
        //         backgroundColor: "#ffffff"
        //     })
        //     .setScrollFactor(0)
        //     .setDepth(20);

        // Debug graphics
        this.input.keyboard.once("keydown_D", (event) => {
            // Turn on physics debugging to show player's hitbox
            this.physics.world.createDebugGraphic();

            // Create worldLayer collision graphic above the player, but below the help text
            const graphics = this.add.graphics().setAlpha(0.75).setDepth(10);
            worldLayer.renderDebug(graphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
        });
    }
    update(time, delta) {
        const speed = 175;
        const prevVelocity = player.body.velocity.clone();

        // Stop any previous movement from the last frame
        player.body.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            player.body.setVelocityX(-speed);
            player.rotation -= 0.1;
        } else if (cursors.right.isDown) {
            player.body.setVelocityX(speed);
            player.rotation += 0.1;
        }

        // Vertical movement
        if (cursors.up.isDown) {
            player.body.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            player.body.setVelocityY(speed);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        player.body.velocity.normalize().scale(speed);

    }
}
export default GameScene;