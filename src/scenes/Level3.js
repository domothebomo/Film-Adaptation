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
        this.load.image('chart', './sprites/chart.png');
        this.load.image('vending_machine', './sprites/vending_machine.png');
        this.load.image('blank', './sprites/blank.png');

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
        this.load.spritesheet('alexei_walk', './sprites/alexei_walk.png', {frameWidth: 12, frameHeight: 28, startFrame: 0, endFrame: 1});
        this.load.spritesheet('strangelove_stand', './sprites/strangelove_stand.png', {frameWidth: 18, frameHeight: 28, startFrame: 0, endFrame: 4});
        
        // AUDIO
        this.load.audio('slide', './audio/slide3.wav');
        this.load.audio('walk', './audio/walk2.mp3');
        this.load.audio('end_music', './audio/wellmeetagain.mp3');
        this.load.audio('rumble', './audio/rumble.wav');
    }

    create() {
        // BACKGROUND
        this.background = this.add.tileSprite(0,0, game.config.width * 2, game.config.height * 2, 'war_room').setOrigin(0,0).setScale(4,4);

        // CONTROLS 
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // ANIMATIONS
        {
            // ALEXEI WALK
            if (!this.anims.exists('alexei_walk')) {
                this.anims.create({
                    key: 'alexei_walk',
                    frames: this.anims.generateFrameNumbers('alexei_walk', {start: 0, end: 1}),
                    frameRate: 3,
                    repeat: -1
                });
            }
            // STRANGELOVE STAND
            if (!this.anims.exists('strangelove_stand')) {
                this.anims.create({
                    key: 'strangelove_stand',
                    frames: this.anims.generateFrameNumbers('strangelove_stand', {start: 0, end: 4}),
                    frameRate: 5,
                    repeat: 0
                });
            }
        }

        // SOUND
        {
            this.walk = this.sound.add("slide", {
                volume: 0.2,
                loop: true
            });
            this.walk2 = this.sound.add("walk", {
                volume: 0.2,
                loop: true
            });
            this.blip = this.sound.add("blip", {
                volume: 0.1,
            });
            this.rumble = this.sound.add("rumble", {
                volume: 1,
            });
            endMusic = this.sound.add("end_music", {
                volume: 0.1,
            });
        }

        // DIALOGUE

        let boardDialogue = [];
        let chartDialogue = [];
        let muffleyDialogue = [];
        let turgidsonDialogue = [];
        let alexeiDialogue = [];
        let officialDialogue = [];
        {
            // Big Board
            boardDialogue.push(new Dialogue(this, {
                text: [
                        `*The Great Big Board of the War Room, showcasing a map of the Earth and relevant military data*`,
                        `*It's currently displaying the recall proceedings of the 843rd Bomb Wing. All but four planes are shown retreating Russia, three of which are known to be shot down, while the fourth is currently unaccounted for*`          
                      ],
                speaker: [` `, ` `],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // CHART
            chartDialogue.push(new Dialogue(this, {
                text: [
                        `*Your personal information chart, displaying scientific data for various elements and procedures regarding nuclear development*`,   
                      ],
                speaker: [` `],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));
            chartDialogue.push(new Dialogue(this, {
                text: [
                        `*Your personal information chart, displaying scientific data for various elements and procedures regarding nuclear development*`,
                        `*You look up Cobalt Thorium G, the material used in the Soviet doomsday device*`,
                        `COBALT THORIUM G - RADIOACTIVE HALF-LIFE OF 93 YEARS`   
                      ],
                speaker: [` `, ` `, ` `],
                response: null,
                unlocked: false,
                onCompletion: () => {
                    this.muffley.dialogues[2].dialogue.unlocked = true;
                    this.muffley.dialoguesCompleted = 2;
                }
            }));

            // OFFICIALS
            officialDialogue.push(new Dialogue(this, {
                text: [
                        `Greetings, Doctor.`,   
                      ],
                speaker: [`U.S. Official`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // AMBASSADOR ALEXEI
            alexeiDialogue.push(new Dialogue(this, {
                text: [
                        `I can only hope my country's defenses are successful in preventing this catastrophe.`,   
                      ],
                speaker: [`Ambassador Alexei`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));
            alexeiDialogue.push(new Dialogue(this, {
                text: [
                        `I must confess, you have an astonishingly good idea there, Doctor.`, 
                        `Thank you, sir...`  
                      ],
                speaker: [`Ambassador Alexei`, `Dr. Strangelove`],
                response: null,
                unlocked: false,
                onCompletion: () => {}
            }));
            alexeiDialogue.push(new Dialogue(this, {
                text: [
                        `*SNAP*`, 
                        `*The Ambassadar seems to be fumbling with a pocketwatch held up towards the Big Board when he notices you*`,
                        `Ah, Dr. Stranglove. I wish you good luck on your project.`  
                      ],
                speaker: [` `, ` `, `Ambassador Alexei`],
                response: null,
                unlocked: false,
                onCompletion: () => {}
            }));
            alexeiDialogue.push(new Dialogue(this, {
                text: [
                        `I wish you good luck on your project, Dr. Strangelove.`  
                      ],
                speaker: [`Ambassador Alexei`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // GENERAL TURGIDSON
            turgidsonDialogue.push(new Dialogue(this, {
                text: [
                        `Ohhh I bet my boys in the Wing are flyin' true as ever right now!`,
                        `...Hopefully not too well...`   
                      ],
                speaker: [`General Turgidson`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));
            turgidsonDialogue.push(new Dialogue(this, {
                text: [
                        `Doctor... you mentioned the uh... ratio of ten women to each man... now wouln't that necessitate the abandonment of the so-called monogamous sexual relationship, I mean, as far as men were concerned?`,
                        `Regrettably, yes... but it is a sacrifice required for the future of the human race... I hasten to add that since each man will be required to do prodigious... service along these lines... the women will have to be selected for their sexual characteristics, which will have to be of a highly stimulatiing nature.`,                         
                        `I think we ought to look at this from the military point of view. I mean, supposing the Ruskies stashed away some big bombs, see, and we didn't? When they come out in 100 years, they could take over!`,    
                        `*The Ambassador rolls his eyes, before exiting the conversation*`
                    ],
                speaker: [`General Turgidson`, `Dr. Strangelove`, `General Turgidson`, ` `],
                response: null,
                unlocked: false,
                onCompletion: () => {
                    this.alexei.dialogues[2].dialogue.unlocked = true;
                    this.alexei.dialoguesCompleted = 2;
                    
                    this.alexei.setVelocity(-200, 0);
                    this.alexei.setFlipX(true);
                    this.alexei.play('alexei_walk');
                    this.walk2.play();
                    this.time.addEvent({
                        callback: () => {
                            this.speakingTo = null;
                            this.walk2.stop();
                            this.alexei.setVelocity(0,0);
                            this.alexei.anims.stop();
                            this.alexei.setTexture('alexei');
                        },
                        repeat: 0,
                        delay: 2500
                    })
                }
            }));
            turgidsonDialogue.push(new Dialogue(this, {
                text: [
                        `In fact, they might even try an immediate sneak attack so they could take over our mine shaft space!`,  
                        `I think it'd be extremely naive of us, Mr. President, to imagine that these new developments are gonna cause any change in Soviet expansionist policy!`,
                        `I mean, we must be increasingly on the alert! To prevent them from taking over other mine shaft space, in order to breed more prodigiously than we do, thus, knocking us out through superior numbers when we emerge!`,
                        `MR. PRESIDENT, WE MUST NOT ALLOW, A MINE SHAFT GAP!!!`,
                        `SIR!!!`
                      ],
                speaker: [`General Turgidson`, ``, ``, ``, `Dr. Strangelove`],
                response: null,
                unlocked: true,
                onCompletion: () => {
                    this.paused = true;
                    this.player.setVelocity(200, -200);
                    this.player.setFlipX(false);
                    this.walk.play();
                    this.time.addEvent({
                        callback: () => {
                            this.speakingTo = null;
                            this.walk.stop();
                            this.player.setVelocity(0,0);
                            this.player.play('strangelove_stand');
                            this.walk2.play();
                            this.player.on('animationcomplete', () => {
                                this.walk2.stop();
                                this.paused = false;
                                this.muffley.dialogues[4].dialogue.unlocked = true;
                                this.muffley.dialoguesCompleted = 4;
                                this.muffley.interactWith();
                            });
                        },
                        repeat: 0,
                        delay: 500
                    })
                }
            }));

            // PRESIDENT MUFFLEY
            muffleyDialogue.push(new Dialogue(this, {
                text: [
                        `Mr. President, I would not rule out the chance to preserve a nucleus of human specimens...`,
                        `It would be quite easy... hee... hee... at the bottom of some of our deeper mine shafts...`,
                        `The radioactivity would never pentrate a mine some thousands of feet deep...`,
                        `And in a matter of weeks, sufficient improvements in dwelling space could easily be provided...`,
                        `...How long would you have to stay down there?`,
                        `Well, that's, you know...`,
                        `A moment, please...`   
                      ],
                speaker: [`Dr. Strangelove`, ``, ``, ``, `President Muffley`, `Dr. Strangelove`],
                response: null,
                unlocked: true,
                onCompletion: () => {
                    this.chart.dialogues[1].dialogue.unlocked = true;
                    this.chart.dialoguesCompleted = 1;
                }
            }));
            muffleyDialogue.push(new Dialogue(this, {
                text: [
                        `...How long would you have to stay down there?`,
                        `Well, that's, you know...`,
                        `A moment, please...`   
                      ],
                speaker: [`President Muffley`, `Dr. Strangelove`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));
            muffleyDialogue.push(new Dialogue(this, {
                text: [
                        `...How long would you have to stay down there?`,
                        `I would think that... possibly... one hundred years...`, 
                        `You mean people could actually stay down there for a hundred years?`,
                        `It would not be difficult, Mein F-... hee, I'm sorry, Mr. President...`,
                        `Nuclear reactors could provide power almost indefinitely... greenhouses could maintain plant life... animals could be bred and SLAUGHTERED...`,
                        `A quick survey would have to be made of all the available mine sites in the country... but I would guess that a dwelling space for several hundred thousand of our people could easily be provided.`,
                        `...Well I would hate to have to decide... who stays up... and who goes down.`,
                        `Well, that would not be necessary, Mr. President. It could easily be accomplished with a computer... and the computer could be set and programmed to accept factors from youth, health, sexual fertility, intelligence, and a cross section of necessary skills.`,
                        `Of course, it would be absolutely vital that our top government and military men be included, to foster and impart the required principles of leadership and tradition.`,
                        `Naturally, they would breed prodigiously, eh... there would be much time and little to do, hee hee...`,
                        `...But with the proper breeding techniques and a ratio of... say... ten females to each male... I would guess that they could then work their way back to the present gross national product within, say, 20 years.`,
                        `...I see...`  
                    ],
                speaker: [`President Muffley`, `Dr. Strangelove`, `President Muffley`, `Dr. Strangelove`, ``, ``, `President Muffley`, `Dr. Strangelove`, ``, ``, ``, `President Muffley`],
                response: null,
                unlocked: false,
                onCompletion: () => {
                    this.turgidson.dialogues[1].dialogue.unlocked = true;
                    this.turgidson.dialoguesCompleted = 1;
                    this.alexei.dialogues[1].dialogue.unlocked = true;
                    this.alexei.dialoguesCompleted = 1;
                }
            }));
            muffleyDialogue.push(new Dialogue(this, {
                text: [
                        `*The president is silent, seemingly pondering your proposed plan*`  
                      ],
                speaker: [` `],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));
            muffleyDialogue.push(new Dialogue(this, {
                text: [
                        `I have a plan...`,
                        `...`,
                        `I CAN WALK!!!!`  
                      ],
                speaker: [`Dr. Strangelove`],
                response: null,
                unlocked: false,
                onCompletion: () => {
                    endMusic.play();
                    this.rumble.play();
                    this.ending = true;
                    this.transitionScreen = this.add.rectangle(0,0, game.config.width*4, game.config.height*4, '0xFFFFFF', 1).setDepth(4);
                    this.tweens.add({
                        targets: this.transitionScreen,
                        alpha: {from: 0, to: 1},
                        duration: 10000,
                        onComplete: () => {
                            level += 1;
                            this.scene.start('transitionScene');
                        }
                    });
                }
            }));
        }

        // PLAYER CLASS
        this.player = new Player(this, game.config.width + 100, 180, 'strangelove').setScale(4,4).setDepth(2);   
        this.player.body.setSize(18, 8);
        this.player.body.setOffset(0, 20);
        this.speakingTo = null;
        this.ending = false;
        this.paused = false;

        // BOUNDS
        {
            this.bound1 = this.physics.add.sprite(0, 45, 'plane_hbounds').setOrigin(0,0).setScale(10,11).setAlpha(0);
            this.physics.add.collider(this.bound1, this.player);
            this.bound1.body.immovable = true;

            this.bound1 = this.physics.add.sprite(0, game.config.height*2 - 130, 'plane_hbounds').setOrigin(0,0).setScale(10,11).setAlpha(0);
            this.physics.add.collider(this.bound1, this.player);
            this.bound1.body.immovable = true;

            this.bound3 = this.physics.add.sprite(115, 45, 'plane_vbounds').setOrigin(0,0).setScale(10,35).setAlpha(0);
            this.physics.add.collider(this.bound3, this.player);
            this.bound3.body.immovable = true;

            this.bound3 = this.physics.add.sprite(game.config.width*2 - 195, 45, 'plane_vbounds').setOrigin(0,0).setScale(10,35).setAlpha(0);
            this.physics.add.collider(this.bound3, this.player);
            this.bound3.body.immovable = true;

            this.tableBound = this.physics.add.sprite(game.config.width/2 + 120, game.config.height/2 - 70, 'plane_hbounds').setOrigin(0,0).setScale(2.475,49).setAlpha(0);
            this.physics.add.collider(this.tableBound, this.player);
            this.tableBound.body.immovable = true;
        }

        // OBJECTS
        this.board = new Interactable(this, game.config.width - 100, 115, 'plane_hbounds', boardDialogue, 'blank').setAlpha(0);
        this.chart = new Interactable(this, game.config.width + 330, game.config.height - 75, 'chart', chartDialogue, 'blank');

        // CHARACTERS
        this.muffley = new Interactable(this, game.config.width + 550, game.config.height + 250, 'muffley', muffleyDialogue, 'muffley_head').setFlipX(true);
        this.muffley.body.setSize(12, 5);
        this.muffley.body.setOffset(0, 23);

        this.turgidson = new Interactable(this, game.config.width + 350, game.config.height + 250, 'turgidson', turgidsonDialogue, 'turgidson_head');
        this.turgidson.body.setSize(12, 5);
        this.turgidson.body.setOffset(0, 23);

        this.alexei = new Interactable(this, game.config.width + 200, game.config.height + 75, 'alexei', alexeiDialogue, 'alexei_head');
        this.alexei.body.setSize(12, 5);
        this.alexei.body.setOffset(0, 23);

        this.official1 = new Interactable(this, game.config.width + 400, game.config.height - 200, 'official', officialDialogue, 'official_head');
        this.official2 = new Interactable(this, game.config.width*2 - 250, game.config.height - 100, 'official', officialDialogue, 'official_head').setFlipX(true);
        this.official3 = new Interactable(this, game.config.width*2 - 275, game.config.height + 100, 'official', officialDialogue, 'official_head').setFlipX(true);
        this.official4 = new Interactable(this, game.config.width + 275, game.config.height + 25, 'official', officialDialogue, 'official_head');


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

        this.createPauseMenu();
    }

    update() {
        if (!this.ending && !this.paused) {
            this.updatePlayer();

            this.updateOthers();

            if (Phaser.Input.Keyboard.JustDown(keyESC)) {
                this.pauseGame();
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyESC) && this.pauseText.alpha == 1) {
            this.unpauseGame();
        }
    }

    updatePlayer() {
        this.player.update();
        this.checkDepth(this.muffley);
        this.checkDepth(this.alexei);
        this.checkDepth(this.turgidson);
    }

    updateOthers() {
        this.board.update();
        this.chart.update();

        this.muffley.update();
        this.turgidson.update();
        this.alexei.update();
        this.official1.update();
        this.official2.update();
        this.official3.update();
        this.official4.update();
    }

    createPauseMenu() {
        // UI TEXT STYLE
        this.UIConfig = {
            color: '#FFFFFF',
            fontFamily: 'Verdana',
            fontSize: '15px',
            align: 'center',
            fontStyle: 'Bold'
        };

        // 'PAUSED' TEXT
        this.UIConfig.fontSize = '40px';
        this.pauseText = this.add.text(game.config.width/2, game.config.height/2 - 100, 'PAUSED', this.UIConfig).setAlign('center').setOrigin(0.5,0).setScrollFactor(0).setDepth(5);

        // RESUME BUTTON
        this.UIConfig.fontSize = '18px';
        this.UIConfig.color = '#000000'
        this.resumeButton = this.add.rectangle(game.config.width / 2, game.config.height / 2 - 20, 200, 50, 0xbbbbbb).setScrollFactor(0).setDepth(5);
        this.resumeButtonText = this.add.text(this.resumeButton.x, this.resumeButton.y, 'RESUME', this.UIConfig).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(5);
        this.resumeButton.setInteractive({
            useHandCursor: true
        });
        this.resumeButton.on('pointerdown', () => {
            this.unpauseGame();
        });

        // RESTART BUTTON
        this.UIConfig.fontSize = '18px';
        this.UIConfig.color = '#000000'
        this.restartButton = this.add.rectangle(game.config.width / 2, game.config.height / 2 + 40, 200, 50, 0xbbbbbb).setScrollFactor(0).setDepth(5);
        this.restartButtonText = this.add.text(this.restartButton.x, this.restartButton.y, 'RESTART', this.UIConfig).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(5);
        this.restartButton.setInteractive({
            useHandCursor: true
        });
        this.restartButton.on('pointerdown', () => {
            level = 2;
            first_level = true;
            this.scene.start('transitionScene');
        });

        // QUIT BUTTON
        this.UIConfig.fontSize = '18px';
        this.UIConfig.color = '#000000'
        this.quitButton = this.add.rectangle(game.config.width / 2, game.config.height / 2 + 100, 200, 50, 0xbbbbbb).setScrollFactor(0).setDepth(5);
        this.quitButtonText = this.add.text(this.quitButton.x, this.quitButton.y, 'QUIT TO MENU', this.UIConfig).setOrigin(0.5, 0.5).setScrollFactor(0).setDepth(5);
        this.quitButton.setInteractive({
            useHandCursor: true
        });
        this.quitButton.on('pointerdown', () => {
            this.scene.start('titleScene');
        });

        // HIDE PAUSE UI
        this.pauseText.alpha = 0;
        this.resumeButton.alpha = 0;
        this.resumeButtonText.alpha = 0;
        this.restartButton.alpha = 0;
        this.restartButtonText.alpha = 0;
        this.quitButton.alpha = 0;
        this.quitButtonText.alpha = 0;
    }

    pauseGame() {
        // STOP PLAYER MOVEMENT/ANIMATIONS
        this.player.setVelocity(0,0);
        this.player.anims.stop();
        this.walk.stop();
        this.player.handleTexture();

        // SHOW PAUSE UI
        this.paused = true;
        this.pauseText.alpha = 1;
        this.resumeButton.alpha = 1;
        this.resumeButtonText.alpha = 1;
        this.restartButton.alpha = 1;
        this.restartButtonText.alpha = 1;
        this.quitButton.alpha = 1;
        this.quitButtonText.alpha = 1;
    }

    unpauseGame() {
        // HIDE PAUSE UI
        this.paused = false;
        this.pauseText.alpha = 0;
        this.resumeButton.alpha = 0;
        this.resumeButtonText.alpha = 0;
        this.restartButton.alpha = 0;
        this.restartButtonText.alpha = 0;
        this.quitButton.alpha = 0;
        this.quitButtonText.alpha = 0;
    }

    checkDepth(char) {
        if (this.player.y < char.y) {
            char.setDepth(3);
        } else {
            char.setDepth(1);
        }
    }



}