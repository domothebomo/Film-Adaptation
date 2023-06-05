class Level1 extends Phaser.Scene {
    constructor() {
        super('level1Scene');
    }

    preload() {
        this.load.path = './assets/';

        this.load.image('background', './sprites/skyline.png');
        this.load.image('dialogue_box', './sprites/dialogue_box.png');

        this.load.image('pilot', './sprites/pilot.png');
        this.load.image('pilot_head', './sprites/pilot_head.png');

        this.load.image('radio', './sprites/radio.png');

        this.load.spritesheet('pilot_walk', './sprites/pilot_walk.png', {frameWidth: 12, frameHeight: 28, startFrame: 0, endFrame: 1});
        
    }

    create() {
        //this.player = this.physics.add.sprite(game.config.width/2, game.config.height/2, 'pilot').setScale(2,2);

        this.add.tileSprite(0,0, game.config.width * 2, game.config.height * 2, 'background').setOrigin(0,0);      
        this.add.text(game.config.width/2, game.config.height/2, 'PLAY', {fontSize: '25px'});  

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.player = new Player(this, game.config.width/2, game.config.height/2, 'pilot').setScale(4,4);
        

        // DIALOGUE
        let radioDialogue = [];
        {
            // RADIO
            //let radioDialogue = [];
            radioDialogue.push[new Dialogue(this, {
                text: `BEEP, BEEP, BEEP`,
                response: null,
                unlocked: true,
                end: false
            })];
        }

        this.dialogueBox = this.add.sprite(30, 30, 'dialogue_box').setOrigin(0,0).setScale(1,1);
        this.dialogueBox.setScrollFactor(0);
        this.dialogueText = this.add.text(198, 66, 'BEEP', {fontSize: '25px'}).setOrigin(0,0).setWordWrapWidth(491).setAlign('left');
        this.playerProfile = this.add.sprite(66, 66, 'pilot_head').setOrigin(0,0).setFlipX(true).setScale(4,4);
        this.objectProfile = this.add.sprite(game.config.width - 66 - 96, 66, 'radio').setOrigin(0,0).setScale(4,4);

        //this.add.sprite(game.config.width/2 - 400, game.config.height/2 + 100, 'pilot_head').setScale(4,4);
        this.radio = new Interactable(this, game.config.width/2 - 400, game.config.height/2 + 100, 'radio', radioDialogue);
        //this.radioZone = this.add.zone(this.radio.x, this.radio.y, this.radio.height * 2, this.radio.width * 2);
        //this.physics.add.overlap(this.player, this.radioZone, () => {console.log('hi')});

        this.cameras.main.setBounds(0, 0, game.config.width * 2, game.config.height * 2);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, game.config.width * 2, game.config.height * 2);

        {
            // PLAYER WALK
            if (!this.anims.exists('pilot_walk')) {
                this.anims.create({
                    key: 'pilot_walk',
                    frames: this.anims.generateFrameNumbers('pilot_walk', {start: 0, end: 1}),
                    frameRate: 3,
                    repeat: -1
                });
            }
        }
        //this.player.play('pilot_walk');
        //this.player.pause('pilot_walk');
        //this.player.anims.pause();
        //console.log(this.player);
        //this.player.texture.frames.key = 'pilot';
        //this.player.setTexture('pilot');
    }

    update() {
        this.player.update();
        this.radio.update();

        //this.dialogueBox.x = 30;
        //this.dialogueBox.y = 30;
    }

}