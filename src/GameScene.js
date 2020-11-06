import { Scene } from 'phaser';

class GameScene extends Scene{
    constructor() {
        super('game');
        this.oldRoomForSusie = null;
        this.oldCoordForSusie = null;
    }
//
//------ Preload
//
    preload(){
        this.load.image('menu', 'assets/star.png');

    }
//
//------ Create
//
    create(){
        console.log('scena gry')
        this.roomsData = this.cache.json.get('coordData'); // ładowanie całego JSONa do zmiennej
        this.roomsNumbers = this.cache.json.get('roomNumbers') //
//
//------ Wywoływanie funkcji
//
        this.createMap();
        this.createPlayer();
        this.createCursors();
        this.createCamera();
        this.physics.add.collider(this.player, this.worldLayer);
        this.createSusie();
        this.timerPos = this.time.addEvent({ //timer od zmiany pozycji susie
            delay: 3000,
            callback: () => {
                this.changeSusiePos();
            },
            loop: true,
            paused: false
        });

        //TODO: Stworzyć jsona z koordynatami tabliczki i numerem sali żeby dodać fora który nada wszystkie numerki
        this.roomNumbers()
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
            //this.scene.start('main-menu')
            //this.timee = 1000
            console.log(this.player.body.position)
            //this.randomPosForSusie();
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(speed);

    }
//
//------ Funkcja tworząca mapę
//
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
//
//------ Funkcja tworząca gracza
//
    createPlayer(){
        this.player = this.physics.add.sprite(250, 400, 'star')
    }
//
//------ Funkcja tworząca kamerę śledzącą gracza
//
    createCamera(){
        this.cameras.main.roundPixels = true;
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
    }
//
//------ Funkcja tworząca kursory i dodatkowe klawisze
//
    createCursors(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
//
//------ Funkcja tworząca Susie
//
    createSusie(){
        this.randomRoomForSusie()

        this.susie = this.physics.add.sprite(this.susiePosX, this.susiePosY, 'susie')
        this.physics.add.collider(this.player, this.susie, this.susieWasFound, null, this)
    }
//
//------ Funkcja losująca salę
//
    randomRoomForSusie(){
        if(this.oldRoomForSusie === null) // jeśli nie ma starej pozycji to losujemy obecną i przypisujemy ją dodatkowo do starej
        {
            this.roomForSusie = Math.floor(Math.random() * this.roomsData.length);
            this.oldRoomForSusie = this.roomForSusie
        }else { // jeśli jest stara pozycja to losujemy nową dopóki będzie inna niż stara.
            do {
                this.roomForSusie = Math.floor(Math.random() * this.roomsData.length);
            }while (this.oldRoomForSusie === this.roomForSusie)
            this.oldRoomForSusie = this.roomForSusie
        }
        console.log(this.roomForSusie)
        this.randomCoordForSusie()
    }
//
//------ Funkcja losująca koordynaty w sali
//
    randomCoordForSusie(){
        if(this.oldCoordForSusie === null) // jeśli nie ma starych koordów to losujemy obecne i przypisujemy je dodatkowo do starych
        {
            this.coordForSusie = Math.floor(Math.random() * this.roomsData[this.roomForSusie].coordinates.length);
            this.oldCoordForSusie = this.coordForSusie
        }else { // jeśli jest stara pozycja to losujemy nową dopóki będzie inna niż stara.
            do {
                this.coordForSusie = Math.floor(Math.random() * this.roomsData[this.roomForSusie].coordinates.length);
            }while (this.oldCoordForSusie === this.coordForSusie)
            this.oldCoordForSusie = this.coordForSusie
        }
        this.susiePosX = this.roomsData[this.roomForSusie].coordinates[this.coordForSusie].x
        this.susiePosY = this.roomsData[this.roomForSusie].coordinates[this.coordForSusie].y
    }
    changeSusiePos(){
        this.randomRoomForSusie()
        this.susie.setPosition(this.susiePosX, this.susiePosY)
        console.log(this.susiePosX, this.susiePosY)
        console.log('nowy room',this.roomForSusie,'stary room', this.oldRoomForSusie)
    }
    susieWasFound(){
        console.log('susie was found')
        this.physics.pause()
        this.winText();
        this.timerPos.paused = true
    }
//
//------ Funkcja wyświetlająca tekst po odnalezieniu Susie
//
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
    }
//
//------ Funkcja dodająca numer sali na podstawie danych z pliku 'roomNumbers.json'
//
    roomNumbers(){
        for(let i=0; i < this.roomsNumbers.length; i++){
            let rooms = this.add.text(this.roomsNumbers[i].tableCoord.x, this.roomsNumbers[i].tableCoord.y, this.roomsNumbers[i].salaID,{
                font: "18px monospace",
                backgroundColor: "#6B6E6E"
            })
        }
        // let rooomNumber = this.add.text(x,y, number, {
        //     font: "18px monospace",
        //     backgroundColor: "#6B6E6E" // dodać kiedyś grafikę tabliczki
        // })
//
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