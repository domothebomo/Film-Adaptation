class Level3 extends Phaser.Scene {
    constructor() {
        super('level3Scene');
    }

    preload() {
        // PATHS
        this.load.path = './assets/';

        // BOUNDS
        this.load.image('plane_hbounds', './sprites/plane_hbounds.png');
        this.load.image('plane_vbounds', './sprites/plane_vbounds.png')

        // BACKGROUND
        this.load.image('war_room', './sprites/war_room.png');

        // UI
        this.load.image('dialogue_box', './sprites/dialogue_box.png');

        // INTERACTABLES


        // CHARACTERS
        this.load.image('strangelove', './sprites/strangelove.png');
        this.load.image('strangelove_head', './sprites/strangelove_head.png');
        this.load.image('muffley', './sprites/muffley.png');
        this.load.image('muffley_head', './sprites/muffley_head.png');
        this.load.image('turgidson', './sprites/turgidson.png');
        this.load.image('turgidson_head', './sprites/turgidson_head.png');
        this.load.image('alexei', './sprites/alexei.png');
        this.load.image('alexei_head', './sprites/alexei_head.png');
        this.load.image('official', './sprites/official.png');
        this.load.image('official_head', './sprites/official_head.png');

        //SPRITESHEETS
        
        
        // AUDIO
        this.load.audio('slide', './audio/slide3.wav'); // https://pixabay.com/sound-effects/sliding-noise-v2-83483/
    }

    create() {
        // BACKGROUND
        this.background = this.add.tileSprite(0,0, game.config.width * 2, game.config.height * 2, 'war_room').setOrigin(0,0).setScale(4,4);

        // CONTROLS 
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // SOUND
        {
            this.walk = this.sound.add("slide", {
                volume: 0.2,
                loop: true
            });
            this.blip = this.sound.add("blip", {
                volume: 0.1,
            });
        }

        // DIALOGUE

        // PLAYER CLASS
        this.player = new Player(this, game.config.width - 250, game.config.height - 110, 'strangelove').setDepth(1).setScale(4,4);   
        this.speakingTo = null;
        this.ending = false;
        this.paused = false;

        // BOUNDS

        // OBJECTS

        // CHARACTERS

        // DIALOGUE BOX UI
        this.dialogueBox = this.add.sprite(30, 30, 'dialogue_box').setOrigin(0,0).setScale(1,0).setDepth(2);
        this.dialogueBox.setScrollFactor(0);
        this.speakerText = this.add.text(198, 41, '', {fontSize: '18px', fontFamily: 'Verdana', fontStyle: 'bold'}).setOrigin(0,0).setAlign('left').setDepth(2);
        this.speakerText.setScrollFactor(0);
        this.dialogueText = this.add.text(198, 66, '', {fontSize: '18px', fontFamily: 'Verdana'}).setOrigin(0,0).setWordWrapWidth(600).setAlign('left').setDepth(2);
        this.dialogueText.setScrollFactor(0);
        this.objectProfile = this.add.sprite(66, 66, 'radio').setOrigin(0,0).setScale(4,0).setDepth(2);
        this.objectProfile.setScrollFactor(0);
        this.playerProfile = this.add.sprite(game.config.width - 66 - 96, 66, 'strangelove_head').setOrigin(0,0).setScale(4,0).setDepth(2);
        this.playerProfile.setScrollFactor(0);

        // CAMERA
        this.cameras.main.setBounds(0, 0, game.config.width * 2, game.config.height * 2);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, game.config.width * 2, game.config.height * 2);
    }

    update() {
        if (!this.ending && !this.paused) {
            // UPDATE PLAYER
            this.player.update();
        }
    }



}