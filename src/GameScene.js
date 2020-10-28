import { Scene } from 'phaser';

class GameScene extends Scene{
    constructor() {
        super('game');
        this.susiePos = {"coordinates":
                [//x, y
                    [32,160],
                    [38,386],
                    [322,148],
                    [688,128],
                    [580,308],
                    [320,463],
                    [240,709],
                    [32,685],
                    [120,506],
                    [410,261]
                ]
            }
    }


    preload(){
        this.load.image('menu', 'assets/star.png');

    }

    create(){
        console.log('scena gry')
//----Wywoływanie funkcji
        this.createMap();
        this.createPlayer();
        this.createCursors();
        this.createCamera();
        this.physics.add.collider(this.player, this.worldLayer);
        this.positionForSusie();
        this.timerPos = this.time.addEvent({ //timer od zmiany pozycji susie
            delay: 3000,
            callback: () => {
                this.changePosForSusie();
            },
            loop: true,
            paused: false
        })


        // player = this.physics.add
        //     .sprite(250, 450, 'star')
        //.setSize(32, 48)
        //.setOffset(0, 24);

        // Watch the player and worldLayer for collisions, for the duration of the scene:





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
        // this.input.keyboard.once("keydown_D", (event) => {
        //     // Turn on physics debugging to show player's hitbox
        //     this.physics.world.createDebugGraphic();
        //
        //     // Create worldLayer collision graphic above the player, but below the help text
        //     const graphics = this.add.graphics().setAlpha(0.75).setDepth(10);
        //     worldLayer.renderDebug(graphics, {
        //         tileColor: null, // Color of non-colliding tiles
        //         collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //         faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        //     });
        // });
    }
    update(time, delta) {
        const speed = 175;
        const prevVelocity = this.player.body.velocity.clone();

        // Stop any previous movement from the last frame
        this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
            this.player.rotation -= 0.1;
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
            this.player.rotation += 0.1;
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.body.setVelocityY(speed);
        }

        if(this.A.isDown){
            this.scene.start('main-menu')
            //this.timee = 1000
            //console.log(this.player.body.position)
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(speed);

    }
    createMap(){
        this.map = this.make.tilemap({ key: "map" });
        const tileset = this.map.addTilesetImage("where-is-Susie", "tiles");
        const belowLayer = this.map.createStaticLayer("BelowPlayer", tileset, 0, 0);
        this.worldLayer = this.map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = this.map.createStaticLayer("AbovePlayer", tileset, 0, 0);
        aboveLayer.setDepth(10);
        this.worldLayer.setCollisionByProperty({ collides: true });
       // this.physics.add.collider(this.player, this.worldLayer);

    }
    createPlayer(){
        this.player = this.physics.add.sprite(250, 400, 'star')
    }
    createCamera(){
        this.cameras.main.roundPixels = true;
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
    }
    createCursors(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    positionForSusie(){
        this.randomPosForSusie()

        this.susie = this.physics.add.sprite(this.posforSusieX, this.posforSusieY, 'susie')
        this.physics.add.collider(this.player, this.susie, this.susieWasFound, null, this)
    }
    randomPosForSusie(){
        this.posForSusie = Math.floor(Math.random() * this.susiePos.coordinates.length);
        console.log("Pozycja w tablicy: ", this.susiePos.coordinates[this.posForSusie]);
        this.posforSusieX = this.susiePos.coordinates[this.posForSusie][0];
        this.posforSusieY = this.susiePos.coordinates[this.posForSusie][1];
        console.log("X: ", this.posforSusieX)
        console.log("Y: ", this.posforSusieY)
        console.log(this.susie)
    }
    changePosForSusie(){
        this.randomPosForSusie()
        this.susie.setPosition(this.posforSusieX, this.posforSusieY)
        console.log(this.posforSusieX, this.posforSusieY)
    }
    susieWasFound(){
        console.log('susie was found')
        this.physics.pause()
        this.winText();
        this.timerPos.paused = true
    }
    winText(){
        let winText = this.add.text(100, 200, "You found Susie!\n Great job! \n\n\n Press 'A' if you want play again",{
            font: "24px monospace",
            fill: "#ffffff",
            align: "center",
            padding: { x: 10, y: 20 },
            backgroundColor: "#18AC00",
            fixedWidth: 600,
            fixedHeight: 200,
        })
            .setScrollFactor(0, 0)
            .setDepth(30);
        // let winText = this.add
        //     .text(200, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
        //         font: "18px monospace",
        //         fill: "#000000",
        //         padding: { x: 20, y: 10 },
        //         backgroundColor: "#ffffff"
        //     })
        //     .setScrollFactor(0)
        //     .setDepth(30);
    }
    timeConsole(){
        this.time.addEvent({
            delay: 1000,
            callback: () =>{
                this.timee--
                console.log(this.timee)
            },
            loop: true
            }
        )
    }
}
export default GameScene;