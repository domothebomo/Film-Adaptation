class Level1 extends Phaser.Scene {
    constructor() {
        super('level1Scene');
    }

    preload() {
        // PATHS
        this.load.path = './assets/';

        // SPRITES
        this.load.image('plane', './sprites/plane.png');
        this.load.image('dialogue_box', './sprites/dialogue_box.png');

        this.load.image('pilot', './sprites/pilot.png');
        this.load.image('pilot_head', './sprites/pilot_head.png');

        this.load.image('radio', './sprites/radio.png');
        this.load.image('codebook', './sprites/codebook.png');

        // SPRITESHEETS
        this.load.spritesheet('pilot_walk', './sprites/pilot_walk.png', {frameWidth: 12, frameHeight: 28, startFrame: 0, endFrame: 1});

        // AUDIO
        this.load.audio('ambience', './audio/plane_ambience.wav'); // https://freesound.org/s/584597/
        this.load.audio('blip', './audio/blip4.wav');
        this.load.audio('walk', './audio/walk.wav');
        
    }

    create() {

        // BACKGROUND
        this.background = this.add.tileSprite(0,0, game.config.width * 2, game.config.height * 2, 'background').setOrigin(0,0).setScale(2,2);    
        this.plane = this.add.sprite(0,0, 'plane').setScale(4,4).setOrigin(0,0);   

        // CONTROLS
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // PLAYER CLASS
        this.player = new Player(this, game.config.width, game.config.height, 'pilot').setDepth(1).setScale(4,4);     

        // DIALOGUE
        let radioDialogue = [];
        let codebookDialogue = [];
        {
            // RADIO
            radioDialogue.push(new Dialogue(this, {
                text: [
                        //`BEEP, BEEP, BEEP`,
                        `BEEP BEEP BEEP BEEP BEEP BEEP`,
                        `*The radio is flashing a new code from command, 'FGD 135'*`                      
                      ],
                response: null,
                unlocked: true,
                onCompletion: () => {this.codebook.dialogues[1].dialogue.unlocked = true}
            }));
            radioDialogue.push(new Dialogue(this, {
                text: [
                        `zzz...            \nthe radio is silent... the code 'FGD 135' is still displayed...`                      
                      ],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // CODEBOOK
            codebookDialogue.push(new Dialogue(this, {
                text: [
                        `*Your standard issue codebook, containing aircraft communications codes and their corresponding decipherings*`                      
                      ],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));
            codebookDialogue.push(new Dialogue(this, {
                text: [
                        `FGD | 135 | Wing attack Plan R`                      
                      ],
                response: null,
                unlocked: false,
                onCompletion: () => {}
            }));
        }

        // AUDIO
        {
            this.ambience = this.sound.add("ambience", {
                volume: 0.1,
                loop: true
            });
            this.ambience.play();
            this.blip = this.sound.add("blip", {
                volume: 0.1,
            });
            this.walk = this.sound.add("walk", {
                volume: 0.2,
                loop: true
            });
        }

        // DIALOGUE BOX UI
        this.dialogueBox = this.add.sprite(30, 30, 'dialogue_box').setOrigin(0,0).setScale(1,0).setDepth(1);
        this.dialogueBox.setScrollFactor(0);
        this.dialogueText = this.add.text(198, 66, '', {fontSize: '20px'}).setOrigin(0,0).setWordWrapWidth(600).setAlign('left').setDepth(1);
        this.dialogueText.setScrollFactor(0);
        this.objectProfile = this.add.sprite(66, 66, 'radio').setOrigin(0,0).setScale(4,0).setDepth(1);
        this.objectProfile.setScrollFactor(0);
        this.playerProfile = this.add.sprite(game.config.width - 66 - 96, 66, 'pilot_head').setOrigin(0,0).setScale(4,0).setDepth(1);
        this.playerProfile.setScrollFactor(0);

        // OTHER UI
        this.exitTip = this.add.text(620, 610, 'Press ESC to exit to main menu', {color: '#000000', fontSize: '18px'});
        this.exitTip.setScrollFactor(0);

        // INTERACTABLE OBJECTS + CHARACTERS
        this.radio = new Interactable(this, game.config.width + 390, game.config.height - 30, 'radio', radioDialogue);
        this.codebook = new Interactable(this, game.config.width + 490, game.config.height + 75, 'codebook', codebookDialogue);

        // CAMERA
        this.cameras.main.setBounds(0, 0, game.config.width * 2, game.config.height * 2);
        this.cameras.main.startFollow(this.player, true, 0.25, 0.25);
        this.physics.world.bounds.setTo(0, 0, game.config.width * 2, game.config.height * 2);

        // ANIMATIONS
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
        
    }

    update() {
        // BACKGROUND MOVEMENT
        this.background.tilePositionX -= 10;

        // UPDATE PLAYER
        this.player.update();

        // UPDATE INTERACTABLE OBJECTS + CHARACTERS
        this.radio.update();
        this.codebook.update();

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.ambience.stop();
            this.scene.start('titleScene');
        }

    }

}