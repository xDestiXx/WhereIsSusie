import { Scene } from 'phaser';

class GameScene extends Scene{
    constructor() {
        super('game');
        this.oldRoomForSusie = null;
        this.oldCoordForSusie = null;
        this.playerRot = false;
        this.light = null;
    }
//
//------ Preload
//
    preload(){

    }
//
//------ Create
//
    create(){
        console.log('scena gry')
        this.roomsData = this.cache.json.get('coordData'); // ładowanie całego JSONa do zmiennej
        this.roomsNumbers = this.cache.json.get('roomNumbers') //

        // this.lights.enable();
        // this.lights.setAmbientColor(0x2C2C2C);
        //
        // this.light = this.lights.addLight(0, 0, 100).setColor(0xffffff).setIntensity(4);;
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

        //TODO: dodać do jsona info czy obrócony czy nie
        this.roomNumbers()

    }
    update(time, delta) {
        const speed = 175;
        const prevVelocity = this.player.body.velocity.clone();

        // Stop any previous movement from the last frame
        this.player.body.setVelocity(0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            this.player.body.setVelocityX(speed);
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
            console.log(this.player.x)
            //this.randomPosForSusie();
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(speed);

        //Nie działa światło, wyświetla tylko pół radiusa
        //
        // this.light.x = this.player.x;
        // this.light.y = this.player.y;
    }
//
//------ Funkcja tworząca mapę
//
    createMap(){
        this.map = this.make.tilemap({ key: "map" });
        const tiles = this.map.addTilesetImage("where-is-Susie", "tiles",32, 32, 1, 2);
        this.map.createDynamicLayer("BelowPlayer", tiles)
        // const belowLayer = this.map.createStaticLayer("BelowPlayer", tileset, 0, 0)
        this.worldLayer = this.map.createDynamicLayer("World", tiles)
        //const aboveLayer = this.map.createStaticLayer("AbovePlayer", tileset, 0, 0)
        this.map.createDynamicLayer("AbovePlayer", tiles).setDepth(10)
        //aboveLayer.setDepth(10);
        this.worldLayer.setCollisionByProperty({ collides: true });
       // this.physics.add.collider(this.player, this.worldLayer);



    }
//
//------ Funkcja tworząca gracza
//
    createPlayer(){
        this.player = this.physics.add.image(250, 400, 'star')
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

        this.susie = this.physics.add.image(this.susiePosX, this.susiePosY, 'susie').setPipeline('Light2D')
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
    }
//
//------ Funkcja
//
//     timer()
//     {
//         console.log('create');
//         // 2:30 in seconds
//         this.initialTime = 18;
//
//         text = this.add.text(32, 32, 'Countdown: ' + this.formatTime(this.initialTime));
//
//         // Each 1000 ms call onEvent
//         timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
//     }
//
//     formatTime(seconds){
//         // Minutes
//         var minutes = Math.floor(seconds/60);
//         // Seconds
//         var partInSeconds = seconds%60;
//         // Adds left zeros to seconds
//         partInSeconds = partInSeconds.toString().padStart(2,'0');
//         // Returns formated time
//         return `${minutes}:${partInSeconds}`;
//     }
//
//     function onEvent ()
//     {
//         if(this.initialTime === 0){
//             this.timedEvent.paused = true;
//         }else{
//             if(this.initialTime <= 15){
//                 text.setColor('#FF0000')
//                 text.setFontSize('22px')
//             }
//             this.initialTime -= 1; // One second
//             text.setText('Countdown: ' + formatTime(this.initialTime));
//         }
//     }
}
export default GameScene;