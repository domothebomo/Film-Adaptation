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
        this.load.image('equipment1', './sprites/plane_equipment1.png');
        this.load.image('safe', './sprites/safe.png');

        // CHARACTERS
        this.load.image('kong', './sprites/kong.png');
        this.load.image('kong_hat', './sprites/kong_hat.png');
        this.load.image('kong_head', './sprites/kong_head.png');
        this.load.image('kong_hat_head', './sprites/kong_hat_head.png');
        this.load.image('pilot', './sprites/pilot.png');
        this.load.image('pilot_head', './sprites/pilot_head.png');
        this.load.image('crewmate2', './sprites/crewmate2.png');
        this.load.image('crewmate3', './sprites/crewmate3.png');
        this.load.image('blank', './sprites/blank.png');

        // SPRITESHEETS
        this.load.spritesheet('pilot_walk', './sprites/pilot_walk.png', {frameWidth: 12, frameHeight: 28, startFrame: 0, endFrame: 1});
        this.load.spritesheet('kong_walk', './sprites/kong_walk.png', {frameWidth: 12, frameHeight: 28, startFrame: 0, endFrame: 1});

        // AUDIO
        this.load.audio('music', './audio/hummm.mp3');
        this.load.audio('ambience', './audio/plane_ambience.wav'); // https://freesound.org/s/584597/
        //this.load.audio('blip', './audio/blip4.wav'); // https://freesound.org/people/SoftDistortionFX/sounds/398937/
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
        this.player = new Player(this, game.config.width + 275, game.config.height + 25, 'pilot').setDepth(1).setScale(4,4);   
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
        let crewmateDialogue = [];
        let safeDialogue = [];
        let equipmentDialogue = [];
        let radioDialogue = [];
        let codebookDialogue = [];
        let cockpitDialogue = [];
        let kongDialogue = [];
        {
            // CREWMATES
            crewmateDialogue.push(new Dialogue(this, {
                text: [
                        `*He seems busy*`                    
                      ],
                speaker: [`Goldie`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // SAFE
            safeDialogue.push(new Dialogue(this, {
                text: [
                        `*Major Kong's personal safe... Best not to touch it*`                    
                      ],
                speaker: [`Goldie`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            equipmentDialogue.push(new Dialogue(this, {
                text: [
                        `*Various equipment to manage the weapons and systems of the B-52*`,
                        `*...I think I'll stick with my radio*`                    
                      ],
                speaker: [`Goldie`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));


            // RADIO
            radioDialogue.push(new Dialogue(this, {
                text: [
                        `BEEP BEEP BEEP BEEP BEEP BEEP`,
                        `*The dials of the CRM 114 Discriminator display a new code from command*`,
                        `| F | G | D | 1 | 3 | 5 |`                     
                      ],
                speaker: ['CRM-114 Discriminator', ' ', 'CRM-114 Discriminator'],
                response: null,
                unlocked: true,
                onCompletion: () => {
                    this.codebook.dialogues[1].dialogue.unlocked = true;
                    this.codebook.dialoguesCompleted = 1;
                }
            }));
            radioDialogue.push(new Dialogue(this, {
                text: [
                        `zzz...            \nthe discriminator is silent... the previous code is still displayed...`,
                        `| F | G | D | 1 | 3 | 5 |`                      
                      ],
                speaker: [' ', 'CRM-114 Discriminator'],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));
            radioDialogue.push(new Dialogue(this, {
                text: [
                        `*You send a confirmation request through the discriminator*`,
                        `CONFIRMED. RED ALERT.`,
                        `*Confirmed... I should let the Major know*`                      
                      ],
                speaker: [' ', 'CRM-114 Discriminator', 'Goldie'],
                response: null,
                unlocked: false,
                onCompletion: () => {
                    this.music.play();
                    this.kong.dialogues[5].dialogue.unlocked = true;
                    this.kong.dialoguesCompleted = 5;
                    this.kong.setTexture('kong_hat');
                    this.kong.profile = 'kong_hat_head';
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
                speaker: [' '],
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
                        `*I should use my radio to inform Major Kong*`                      
                      ],
                speaker: [' ', ' ', 'Codebook', 'Goldie'],
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
                speaker: [' ', 'Codebook'],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // COCKPIT
            cockpitDialogue.push(new Dialogue(this, {
                text: [
                        `*Shouldn't someone be flying this thing?*`                      
                      ],
                speaker: ['Goldie'],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // MAJOR KONG
            kongDialogue.push(new Dialogue(this, {
                text: [
                        `Anything to report, Goldie?`,
                        `No sir.`                      
                      ],
                speaker: ['Major Kong', 'Goldie'],
                response: null,
                unlocked: true,
                onCompletion: () => {},
            }));
            kongDialogue.push(new Dialogue(this, {
                text: [
                        `Major Kong... I know you'll think this is crazy, but I just got a message from base over the CRM 114. It decodes as Wing attack Plan R. R for Romeo.`,
                        `Goldie... did you say Wing attack Plan R?`,
                        `Yes sir, I have.`,
                        `Goldie, how many times have I told you guys that I don't want no horsin' around on the airplane?`,
                        `I'm not horsin' around, sir, thats how it decodes!`,
                        `Well I've been to one world fair, a picnic, and a rodeo and that's the stupidest thing I ever heard come over a set of earphones!`,
                        `You sure you got today's code?`,
                        `Yes sir, it is.`,
                        `Oh there's just gotta be something wrong... wait a second, I'm coming back.`                  
                      ],
                speaker: ['Goldie', 'Major Kong', 'Goldie', 'Major Kong', 'Goldie', 'Major Kong', '', 'Goldie', 'Major Kong'],
                response: null,
                unlocked: false,
                onCompletion: () => {
                    //this.radio.dialogues[2].dialogue.unlocked = true;
                    //this.radio.dialoguesCompleted = 2;
                    this.kong.setVelocity(200, 0);
                    this.kong.anims.play('kong_walk');
                    this.time.addEvent({
                        callback: () => {
                            this.kong.setVelocity(0,0);
                            this.kong.anims.stop();
                            this.kong.setTexture('kong');
                            this.kong.dialogues[3].dialogue.unlocked = true;
                            this.kong.dialoguesCompleted = 3;
                        },
                        repeat: 0,
                        delay: 4500
                    })

                },
            }));
            kongDialogue.push(new Dialogue(this, {
                text: [
                        `There's just gotta be something wrong...`                      
                      ],
                speaker: ['Major Kong'],
                response: null,
                unlocked: true,
                onCompletion: () => {},
            }));
            kongDialogue.push(new Dialogue(this, {
                text: [
                        `*the Major looks at the CRM 114's code, then down to the codebook's translation`,
                        `*He looks back at the CRM 114, tracing the code with his finger, then looks at the codebook once more, his finger tracing the translation...*`,
                        `*...Major Kong spends a great deal of time looking back and forth from the codebook to the CRM 114...*`,
                        `...Maybe you'd better get a confirmation from base.`,
                        `Yes sir.`                      
                      ],
                speaker: [' ', ' ', ' ', 'Major Kong', 'Goldie'],
                response: null,
                unlocked: false,
                onCompletion: () => {
                    this.radio.dialogues[2].dialogue.unlocked = true;
                    this.radio.dialoguesCompleted = 2;
                    this.kong.setVelocity(-200, 0);
                    this.kong.anims.play('kong_walk');
                    this.kong.setFlipX(true);
                    this.time.addEvent({
                        callback: () => {
                            this.kong.setVelocity(0,0);
                            this.kong.anims.stop();
                            this.kong.setTexture('kong');
                            this.kong.setFlipX(true);
                        },
                        repeat: 0,
                        delay: 4500
                    })
                },
            }));
            kongDialogue.push(new Dialogue(this, {
                text: [
                        `...`                      
                      ],
                speaker: ['Major Kong'],
                response: null,
                unlocked: true,
                onCompletion: () => {},
            }));
            kongDialogue.push(new Dialogue(this, {
                text: [
                        `*As you turn to inform the Major, you watch as he opens a safe next to the cockpit and dons his fierce ten-gallon hat*`,
                        `Major Kong, message from base confirmed.`,
                        `... Well boys, I reckon this is it.`,
                        `Nuclear combat toe-to-toe with the Ruskies...`,
                        `...`,
                        `Look boys. I ain't much of a hand at making speeches...`,
                        `...But I got a pretty fair idea that somethin' doggone important is going on back there...`,
                        `...And I've got a fair idea of the kind of... personal emotions that some of you fellas may be thinking.`,
                        `Heck, I reckon you wouldn't even be human beings if you didn't have some pretty strong personal feelings about nuclear combat.`,
                        `But I want you to remember one thing.`,
                        `The folks back home is counting on ya, and by golly, we ain't about to let 'em down.`,
                        `...Tell ya somethin' else.`,
                        `If this thing turns out to be half as important as I figure it just might be, I'd say that you're all in line for some important promotions and personal citations when this thing's over with.`,
                        `And that goes for every last one of ya, regardless of your race, color or your creed.`,
                        `Now let's get this thing on the hump! We got some flyin' to do!`
                      ],
                speaker: [' ', 'Goldie', 'Major Kong'],
                response: null,
                unlocked: false,
                
                onCompletion: () => {
                    this.ending = true;
                    this.transitionScreen = this.add.rectangle(0,0, game.config.width*4, game.config.height*4, '#000000', 1).setDepth(2);
                    this.tweens.add({
                        targets: this.transitionScreen,
                        alpha: {from: 0, to: 1},
                        duration: 5000,
                        onComplete: () => {
                            this.music.loop = false;
                            this.ambience.stop();
                            level += 1;
                            this.scene.start('transitionScene');
                        }
                    });
                    this.tweens.add({
                        targets: this.music,
                        volume: {from: 0.1, to: 0},
                        duration: 5000,
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

        // INTERACTABLE OBJECTS
        this.radio = new Interactable(this, game.config.width + 390, game.config.height - 30, 'radio', radioDialogue);
        this.codebook = new Interactable(this, game.config.width + 490, game.config.height + 75, 'codebook', codebookDialogue);
        this.cockpit = new Interactable(this, game.config.width-690, game.config.height + 40, 'cockpit', cockpitDialogue).setAlpha(0);
        this.equipment1 = new Interactable(this, game.config.width, game.config.height - 30, 'equipment1', equipmentDialogue, 'blank');
        this.safe = new Interactable(this, game.config.width - 500, game.config.height - 25, 'safe', safeDialogue);

        // CHARACTERS
        this.kong = new Interactable(this, game.config.width-600, game.config.height + 20, 'kong', kongDialogue, 'kong_head').setDepth(1);
        this.kong.body.setSize(12, 5);
        this.kong.body.setOffset(0, 23);
        this.lothar = new Interactable(this, game.config.width + 100, game.config.height - 20, 'crewmate2', crewmateDialogue, 'blank').setDepth(1);
        this.lothar.setFlipX(true);
        this.ace = new Interactable(this, game.config.width - 125, game.config.height - 20, 'crewmate3', crewmateDialogue, 'blank').setDepth(1);

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

            // KONG WALK
            if (!this.anims.exists('kong_walk')) {
                this.anims.create({
                    key: 'kong_walk',
                    frames: this.anims.generateFrameNumbers('kong_walk', {start: 0, end: 1}),
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
            this.lothar.update();
            this.ace.update();
            this.safe.update();
            this.equipment1.update();

            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.activateRadio();
            }
            if (this.speakingTo === null && this.radioTip.open == false) {
                this.openRadioTip();
            }

            this.checkDepth();
    
        }

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.ambience.stop();
            this.music.stop();
            this.scene.start('titleScene');
        }

    }

    checkDepth() {
        if (this.player.y < this.kong.y) {
            this.player.setDepth(1);
            this.kong.setDepth(2);
        } else {
            this.player.setDepth(2);
            this.kong.setDepth(1);
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