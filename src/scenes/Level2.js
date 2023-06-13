class Level2 extends Phaser.Scene {
    constructor() {
        super('level2Scene');
    }

    preload() {
        // PATHS
        this.load.path = './assets/';

        // BOUNDS
        this.load.image('plane_hbounds', './sprites/plane_hbounds.png');
        this.load.image('plane_vbounds', './sprites/plane_vbounds.png');

        this.load.image('air_base', './sprites/air_base.png');

        // UI
        this.load.image('dialogue_box', './sprites/dialogue_box.png');

        // INTERACTABLES
        this.load.image('door', './sprites/door.png');

        // CHARACTERS
        this.load.image('mandrake', './sprites/mandrake.png');
        this.load.image('mandrake_head', './sprites/mandrake_head.png');
        this.load.image('guano', './sprites/guano.png');
        this.load.image('guano_head', './sprites/guano_head.png');

        // SPRITESHEETS
        this.load.spritesheet('mandrake_walk', './sprites/mandrake_walk.png', {frameWidth: 12, frameHeight: 28, startFrame: 0, endFrame: 1});
        this.load.spritesheet('guano_walk', './sprites/guano_walk.png', {frameWidth: 12, frameHeight: 28, startFrame: 0, endFrame: 1});

        // audio
        this.load.audio('walk2', './audio/walk2.mp3'); // https://pixabay.com/sound-effects/concrete-footsteps-6752/
    }

    create() {
        // BACKGROUND
        this.background = this.add.tileSprite(0,0, game.config.width * 2, game.config.height * 2, 'air_base').setOrigin(0,0).setScale(4,4);

        // CONTROLS 
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // ANIMATIONS
        {
            // PLAYER WALK
            if (!this.anims.exists('mandrake_walk')) {
                //console.log('yar')
                this.anims.create({
                    key: 'mandrake_walk',
                    frames: this.anims.generateFrameNumbers('mandrake_walk', {start: 0, end: 1}),
                    frameRate: 3,
                    repeat: -1
                });
            }

            // GUANO WALK
            if (!this.anims.exists('guano_walk')) {
                this.anims.create({
                    key: 'guano_walk',
                    frames: this.anims.generateFrameNumbers('guano_walk', {start: 0, end: 1}),
                    frameRate: 3,
                    repeat: -1
                });
            }
        }

        // SOUND
        {
            this.walk = this.sound.add("walk2", {
                volume: 0.2,
                loop: true
            });
        }

        // PLAYER CLASS
        this.player = new Player(this, game.config.width - 250, game.config.height - 100, 'mandrake').setDepth(1).setScale(4,4);   
        this.speakingTo = null;
        this.ending = false;

        // BOUNDS
        {
            this.bound1 = this.physics.add.sprite(-158, game.config.height - 367, 'plane_hbounds').setOrigin(0,0).setScale(4,11).setAlpha(0);
            this.physics.add.collider(this.bound1, this.player);
            this.bound1.body.immovable = true;

            this.bound2 = this.physics.add.sprite(game.config.width + 255, game.config.height - 367, 'plane_hbounds').setOrigin(0,0).setScale(4,11).setAlpha(0);
            this.physics.add.collider(this.bound2, this.player);
            this.bound2.body.immovable = true;

            this.bound3 = this.physics.add.sprite(-158, -30, 'plane_hbounds').setOrigin(0,0).setScale(4,11).setAlpha(0);
            this.physics.add.collider(this.bound3, this.player);
            this.bound3.body.immovable = true;

            this.bound4 = this.physics.add.sprite(game.config.width + 255, -30, 'plane_hbounds').setOrigin(0,0).setScale(4,11).setAlpha(0);
            this.physics.add.collider(this.bound4, this.player);
            this.bound4.body.immovable = true;

            this.bound5 = this.physics.add.sprite(-158, game.config.height + 50, 'plane_hbounds').setOrigin(0,0).setScale(4,11).setAlpha(0);
            this.physics.add.collider(this.bound5, this.player);
            this.bound5.body.immovable = true;

            this.bound6 = this.physics.add.sprite(game.config.width - 300, game.config.height*2 - 25, 'plane_hbounds').setOrigin(0,0).setScale(4,11).setAlpha(0);
            this.physics.add.collider(this.bound6, this.player);
            this.bound6.body.immovable = true;

            this.bound7 = this.physics.add.sprite(340, game.config.height - 367, 'plane_vbounds').setOrigin(0,0).setScale(4,13).setAlpha(0);
            this.physics.add.collider(this.bound7, this.player);
            this.bound7.body.immovable = true;

            this.bound8 = this.physics.add.sprite(game.config.width - 5, game.config.height - 175, 'plane_vbounds').setOrigin(0,0).setScale(4,13).setAlpha(0);
            this.physics.add.collider(this.bound8, this.player);
            this.bound8.body.immovable = true;

            this.bound9 = this.physics.add.sprite(game.config.width - 475, game.config.height - 220, 'plane_vbounds').setOrigin(0,0).setScale(9,5).setAlpha(0);
            this.physics.add.collider(this.bound9, this.player);
            this.bound9.body.immovable = true;

            // DOOR
            //this.bound9 = this.physics.add.sprite(game.config.width, game.config.height - 275, 'plane_vbounds').setOrigin(0,0).setScale(4,3).setAlpha(0);
            //this.physics.add.collider(this.bound9, this.player);
            //this.bound9.body.immovable = true;

            this.bound10 = this.physics.add.sprite(game.config.width + 254, game.config.height - 280, 'plane_vbounds').setOrigin(0,0).setScale(4,17).setAlpha(0);
            this.physics.add.collider(this.bound10, this.player);
            this.bound10.body.immovable = true;

            this.bound11 = this.physics.add.sprite(game.config.width - 200, game.config.height + 175, 'plane_vbounds').setOrigin(0,0).setScale(4,13).setAlpha(0);
            this.physics.add.collider(this.bound11, this.player);
            this.bound11.body.immovable = true;

            this.bound12 = this.physics.add.sprite(game.config.width + 430, game.config.height + 175, 'plane_vbounds').setOrigin(0,0).setScale(4,13).setAlpha(0);
            this.physics.add.collider(this.bound12, this.player);
            this.bound12.body.immovable = true;

            this.bound13 = this.physics.add.sprite(game.config.width - 200, game.config.height + 275, 'plane_hbounds').setOrigin(0,0).setScale(0.79,10).setAlpha(0);
            this.physics.add.collider(this.bound13, this.player);
            this.bound13.body.immovable = true;

            this.bound14 = this.physics.add.sprite(game.config.width + 254, game.config.height + 275, 'plane_hbounds').setOrigin(0,0).setScale(0.79,10).setAlpha(0);
            this.physics.add.collider(this.bound14, this.player);
            this.bound14.body.immovable = true;
        }

        this.officeDoor = new Interactable(this, game.config.width + 15, game.config.height - 225, 'door');

        this.shadow1 = this.add.rectangle(0,0, game.config.width*4, game.config.height, '#000000', 1);
        this.shadow2 = this.add.rectangle(game.config.width + 505,0, game.config.width, game.config.height*4, '#000000', 1);

        // DIALOGUE BOX UI
        this.dialogueBox = this.add.sprite(30, 30, 'dialogue_box').setOrigin(0,0).setScale(1,0).setDepth(2);
        this.dialogueBox.setScrollFactor(0);
        this.speakerText = this.add.text(198, 41, '', {fontSize: '18px', fontFamily: 'Verdana', fontStyle: 'bold'}).setOrigin(0,0).setAlign('left').setDepth(2);
        this.speakerText.setScrollFactor(0);
        this.dialogueText = this.add.text(198, 66, '', {fontSize: '18px', fontFamily: 'Verdana'}).setOrigin(0,0).setWordWrapWidth(600).setAlign('left').setDepth(2);
        this.dialogueText.setScrollFactor(0);
        this.objectProfile = this.add.sprite(66, 66, 'radio').setOrigin(0,0).setScale(4,0).setDepth(2);
        this.objectProfile.setScrollFactor(0);
        this.playerProfile = this.add.sprite(game.config.width - 66 - 96, 66, 'mandrake_head').setOrigin(0,0).setScale(4,0).setDepth(2);
        this.playerProfile.setScrollFactor(0);

        // CAMERA
        this.cameras.main.setBounds(0, 0, game.config.width * 2, game.config.height * 2);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, game.config.width * 2, game.config.height * 2);
    }

    update() {

        if (!this.ending) {
            // UPDATE PLAYER
            this.player.update();
        }

    }
}