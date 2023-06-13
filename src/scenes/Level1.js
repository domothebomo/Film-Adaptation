class Level1 extends Phaser.Scene {
    constructor() {
        super('level1Scene');
    }

    preload() {
        // PATHS
        this.load.path = './assets/';

        // SPRITES

        // PLANE
        this.load.image('plane', './sprites/plane.png');
        this.load.image('plane_hbounds', './sprites/plane_hbounds.png');
        this.load.image('plane_vbounds', './sprites/plane_vbounds.png');

        // UI
        this.load.image('dialogue_box', './sprites/dialogue_box.png');
        this.load.image('radio_tip', './sprites/radio_tip.png');

        // INTERACTABLE
        this.load.image('radio', './sprites/radio.png');
        this.load.image('codebook', './sprites/codebook.png');
        this.load.image('cockpit', './sprites/cockpit.png');
        this.load.image('kong', './sprites/kong.png');

        // CHARACTERS
        this.load.image('kong_hat', './sprites/kong_hat.png');
        this.load.image('kong_head', './sprites/kong_head.png');
        this.load.image('pilot', './sprites/pilot.png');
        this.load.image('pilot_head', './sprites/pilot_head.png');

        // SPRITESHEETS
        this.load.spritesheet('pilot_walk', './sprites/pilot_walk.png', {frameWidth: 12, frameHeight: 28, startFrame: 0, endFrame: 1});

        // AUDIO
        this.load.audio('music', './audio/hummm.mp3');
        this.load.audio('ambience', './audio/plane_ambience.wav'); // https://freesound.org/s/584597/
        this.load.audio('blip', './audio/blip4.wav'); // https://freesound.org/people/SoftDistortionFX/sounds/398937/
        this.load.audio('walk', './audio/walk.wav');
        
    }

    create() {

        // BACKGROUND
        this.background = this.add.tileSprite(0,0, game.config.width * 2, game.config.height * 2, 'background').setOrigin(0,0).setScale(2,2);    
        this.plane = this.add.sprite(0,0, 'plane').setScale(4,4).setOrigin(0,0);   

        // CONTROLS
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


        // PLAYER CLASS
        this.player = new Player(this, game.config.width + 200, game.config.height + 25, 'pilot').setDepth(1).setScale(4,4);   
        this.speakingTo = null;
        this.ending = false;

        // PLANE BOUNDS
        this.upperBound = this.physics.add.sprite(game.config.width - 60, game.config.height - 16, 'plane_hbounds').setScale(4,4).setAlpha(0);
        this.physics.add.collider(this.upperBound, this.player);
        this.upperBound.body.immovable = true;

        this.lowerBound = this.physics.add.sprite(game.config.width - 60, game.config.height + 136, 'plane_hbounds').setScale(4,4).setAlpha(0);
        this.physics.add.collider(this.lowerBound, this.player);
        this.lowerBound.body.immovable = true;

        this.rightBound = this.physics.add.sprite(game.config.width + 528, game.config.height + 60, 'plane_vbounds').setScale(4,4).setAlpha(0);
        this.physics.add.collider(this.rightBound, this.player);
        this.rightBound.body.immovable = true;

        this.leftBound = this.physics.add.sprite(game.config.width - 650, game.config.height + 60, 'plane_vbounds').setScale(4,4).setAlpha(0);
        this.physics.add.collider(this.leftBound, this.player);
        this.leftBound.body.immovable = true;

        // DIALOGUE
        let radioDialogue = [];
        let codebookDialogue = [];
        let cockpitDialogue = [];
        let kongDialogue = [];
        {
            // RADIO
            radioDialogue.push(new Dialogue(this, {
                text: [
                        `BEEP BEEP BEEP BEEP BEEP BEEP`,
                        `*The CRM-114 Discriminator is flashing a new code from command, 'FGD 135'*`                      
                      ],
                speaker: ['CRM-114 Discriminator', ''],
                response: null,
                unlocked: true,
                onCompletion: () => {
                    this.codebook.dialogues[1].dialogue.unlocked = true;
                    this.codebook.dialoguesCompleted = 1;
                }
            }));
            radioDialogue.push(new Dialogue(this, {
                text: [
                        `zzz...            \nthe discriminator is silent... the code 'FGD 135' is still displayed...`                      
                      ],
                speaker: ['CRM-114 Discriminator', ''],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));
            radioDialogue.push(new Dialogue(this, {
                text: [
                        `*You send a confirmation request through the discriminator*`,
                        `CONFIRMED. RED ALERT.`,
                        `*Confirmed... you should let the major know*`                      
                      ],
                speaker: ['Goldie', 'CRM-114 Discriminator', 'Goldie'],
                response: null,
                unlocked: false,
                onCompletion: () => {
                    this.music.play();
                    this.kong.dialogues[2].dialogue.unlocked = true;
                    this.kong.dialoguesCompleted = 2;
                }
            }));
            radioDialogue.push(new Dialogue(this, {
                text: [
                        `CONFIRMED. RED ALERT.`                      
                      ],
                speaker: ['CRM-114 Discriminator'],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // CODEBOOK
            codebookDialogue.push(new Dialogue(this, {
                text: [
                        `*Your standard issue codebook, containing aircraft communications codes and their corresponding decipherings*`                      
                      ],
                speaker: ['Codebook'],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));
            codebookDialogue.push(new Dialogue(this, {
                text: [
                        `*Your standard issue codebook, containing aircraft communications codes and their corresponding decipherings*`,
                        `*You thumb through the codebook, looking for the new code's deciphering*`,
                        `FGD | 135 | Wing attack Plan R`,
                        `*Wing attack Plan R...*`,
                        `*I should radio Major Kong*`                      
                      ],
                speaker: ['Codebook', 'Goldie', 'Codebook', 'Goldie'],
                response: null,
                unlocked: false,
                onCompletion: () => {
                    this.kong.dialogues[1].dialogue.unlocked = true;
                    this.kong.dialoguesCompleted = 1;
                }
            }));
            codebookDialogue.push(new Dialogue(this, {
                text: [
                        `*The codebook is left open, the code's translation still visible*`,
                        `FGD | 135 | Wing attack Plan R`                      
                      ],
                speaker: ['Codebook'],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // COCKPIT
            cockpitDialogue.push(new Dialogue(this, {
                text: [
                        `*Shouldn't someone be flying this thing?*`                      
                      ],
                speaker: ['Cockpit'],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // MAJOR KONG
            kongDialogue.push(new Dialogue(this, {
                text: [
                        `Hi Goldie. Anything to report?`                      
                      ],
                speaker: ['Major Kong'],
                response: null,
                unlocked: true,
                onCompletion: () => {},
            }));
            kongDialogue.push(new Dialogue(this, {
                text: [
                        `*You inform Major Kong of the transmission*`,
                        `... Maybe you better get a confirmation from base.`                      
                      ],
                speaker: ['Goldie', 'Major Kong'],
                response: null,
                unlocked: false,
                onCompletion: () => {
                    this.radio.dialogues[2].dialogue.unlocked = true;
                    this.radio.dialoguesCompleted = 2;
                },
            }));
            kongDialogue.push(new Dialogue(this, {
                text: [
                        `*You inform Major Kong that the message from base has been confirmed*`,
                        `... Well boys, I reckon this is it.`,
                        `Nuclear combat toe-to-toe with the Ruskies...`
                      ],
                speaker: ['Goldie', 'Major Kong'],
                response: null,
                unlocked: false,
                
                onCompletion: () => {
                    this.ending = true;
                    this.transitionScreen = this.add.rectangle(0,0, game.config.width*4, game.config.height*4, '#000000', 1).setDepth(1);
                    this.tweens.add({
                        targets: this.transitionScreen,
                        alpha: {from: 0, to: 1},
                        duration: 5000,
                        onComplete: () => {
                            this.ominousText = this.add.text(game.config.width/2, game.config.height/2, 'TO BE CONTINUED...', {fontSize: '30px'}).setOrigin(0.5,0.5).setDepth(2);
                            this.ominousText.setScrollFactor(0);
                            this.exitTip.setColor('#FFFFFF');
                        }
                    });
                },
            }));
            
        }

        // AUDIO
        {
            this.music = this.sound.add("music", {
                volume: 0.1,
                loop: true
            });
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
        this.dialogueBox = this.add.sprite(30, 30, 'dialogue_box').setOrigin(0,0).setScale(1,0).setDepth(2);
        this.dialogueBox.setScrollFactor(0);
        this.speakerText = this.add.text(198, 41, '', {fontSize: '18px', fontFamily: 'Verdana', fontStyle: 'bold'}).setOrigin(0,0).setAlign('left').setDepth(2);
        this.speakerText.setScrollFactor(0);
        this.dialogueText = this.add.text(198, 66, '', {fontSize: '18px', fontFamily: 'Verdana'}).setOrigin(0,0).setWordWrapWidth(600).setAlign('left').setDepth(2);
        this.dialogueText.setScrollFactor(0);
        this.objectProfile = this.add.sprite(66, 66, 'radio').setOrigin(0,0).setScale(4,0).setDepth(2);
        this.objectProfile.setScrollFactor(0);
        this.playerProfile = this.add.sprite(game.config.width - 66 - 96, 66, 'pilot_head').setOrigin(0,0).setScale(4,0).setDepth(2);
        this.playerProfile.setScrollFactor(0);

        // OTHER UI
        this.exitTip = this.add.text(620, 610, 'Press ESC to exit to main menu', {color: '#000000', fontSize: '18px'}).setDepth(2);
        this.exitTip.setScrollFactor(0);

        //this.controlsTip = this.add.text(10, 10, 'Arrow keys to move, SPACE to interact with objects and progress dialogue', {color: '#000000', fontSize: '18px'}).setDepth(2);
        //this.controlsTip.setScrollFactor(0);

        this.radioTip = this.add.sprite(10, -4, 'radio_tip').setDepth(1).setOrigin(0,0).setScale(4,4);
        this.radioTip.setScrollFactor(0);
        this.radioTip.open = true;

        // INTERACTABLE OBJECTS + CHARACTERS
        this.radio = new Interactable(this, game.config.width + 390, game.config.height - 30, 'radio', radioDialogue);
        this.codebook = new Interactable(this, game.config.width + 490, game.config.height + 75, 'codebook', codebookDialogue);
        this.cockpit = new Interactable(this, game.config.width-690, game.config.height + 40, 'cockpit', cockpitDialogue);
        this.kong = new Interactable(this, game.config.width-600, game.config.height + 20, 'kong', kongDialogue, 'kong_head');

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

        if (!this.ending) {
            // UPDATE PLAYER
            this.player.update();

            // UPDATE INTERACTABLE OBJECTS + CHARACTERS
            this.radio.update();
            this.codebook.update();
            this.cockpit.update();
            this.kong.update();

            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.activateRadio();
            }
            if (this.speakingTo === null && this.radioTip.open == false) {
                this.openRadioTip();
            }
    
        }

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.ambience.stop();
            this.music.stop();
            this.scene.start('titleScene');
        }

    }

    activateRadio() {
        if (this.speakingTo === null) {
            this.kong.interactWith();
            this.closeRadioTip();
        }
    }

    closeRadioTip() {
        this.radioTip.open = false;
        this.tweens.add({
            targets: [this.radioTip],
            duration: 100,
            scaleY: {from: 4, to: 0},
            ease: 'Linear'

        });
    }

    openRadioTip() {
        this.radioTip.open = true;
        this.tweens.add({
            targets: [this.radioTip],
            duration: 100,
            scaleY: {from: 0, to: 4},
            ease: 'Linear'
        });
    }

}