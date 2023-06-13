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
        this.load.image('notes', './sprites/notes.png');
        this.load.image('couch', './sprites/couch.png');
        this.load.image('phone1', './sprites/phone1.png');
        this.load.image('phone2', './sprites/phone2.png');
        this.load.image('phonebooth', './sprites/phonebooth.png');
        this.load.image('vending_machine', './sprites/vending_machine.png');
        this.load.image('gunrack', './sprites/gunrack.png');
        

        // CHARACTERS
        this.load.image('mandrake', './sprites/mandrake.png');
        this.load.image('mandrake_head', './sprites/mandrake_head.png');
        this.load.image('guano', './sprites/guano.png');
        this.load.image('guano_gun', './sprites/guano_gun.png');
        this.load.image('guano_head', './sprites/guano_head.png');
        this.load.image('blank', './sprites/blank.png');
        this.load.image('soldier', './sprites/soldier.png');
        this.load.image('soldier_head', './sprites/soldier_head.png');

        // SPRITESHEETS
        this.load.spritesheet('mandrake_walk', './sprites/mandrake_walk.png', {frameWidth: 12, frameHeight: 28, startFrame: 0, endFrame: 1});
        this.load.spritesheet('guano_walk', './sprites/guano_walk.png', {frameWidth: 12, frameHeight: 28, startFrame: 0, endFrame: 1});

        // audio
        this.load.audio('walk2', './audio/walk2.mp3'); // https://pixabay.com/sound-effects/concrete-footsteps-6752/
        this.load.audio('gunshot', './audio/gunshot.mp3'); // https://pixabay.com/sound-effects/single-gunshot-62-hp-37188/
        this.load.audio('equip_gun', './audio/equip_gun.mp3'); // https://pixabay.com/sound-effects/gun-chamber-round-96258/
        this.load.audio('open_door', './audio/open_door.mp3'); // https://pixabay.com/sound-effects/dorm-door-opening-6038/
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
            this.blip = this.sound.add("blip", {
                volume: 0.1,
            });
            this.gunshot = this.sound.add("gunshot", {
                volume: 0.1,
            });
            this.equip = this.sound.add("equip_gun", {
                volume: 0.1,
            });
            this.openDoor = this.sound.add("open_door", {
                volume: 0.1,
            });
        }

        let couchDialogue = [];
        let gunrackDialogue = [];
        let bathroomDialogue = [];
        let phone1Dialogue = [];
        let phone2Dialogue = [];
        let doorDialogue = [];
        let notesDialogue = [];
        let guanoDialogue = [];
        let soldierDialogue = [];
        let vendingMachineDialogue = [];
        let phoneboothDialogue = [];
        // DIALOGUE
        {
            // COUCH
            couchDialogue.push(new Dialogue(this, {
                text: [
                        `*This couch was pushed towards the window earlier for cover. It's covered in bullet holes and cotton spillings*`,
                        `*You flip the cushions and dig in the corners, looking for anything*`,
                        `*...Nothing...*`                    
                      ],
                speaker: [` `, ` `, `Mandrake`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // GUNRACK
            gunrackDialogue.push(new Dialogue(this, {
                text: [
                        `*The General has quite a few vintage weapons on display...*`,
                        `*The serial numbers seem tampered with, perhaps they hold a clue?*`,
                        `*...On closer inspection, it seems they've simply been filed down poorly.*`                    
                      ],
                speaker: [` `, `Mandrake`, ` `],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // BATHROOM
            bathroomDialogue.push(new Dialogue(this, {
                text: [
                        `*The door won't budge, somethings blocking it*`,
                        `*At the edge of the light provided by the doorway, you see blood pooling...*`,
                        `*Simply terrible, how this ended up*`                    
                      ],
                speaker: [` `, ` `, `Mandrake`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // PHONE 1
            phone1Dialogue.push(new Dialogue(this, {
                text: [
                        `*The General's red phone*`,
                        `*Nothing interesting about it*`                  
                      ],
                speaker: [` `, `Mandrake`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));
            phone1Dialogue.push(new Dialogue(this, {
                text: [
                        `*The General's red phone*`,
                        `*You pick up the phone to call SAC...*`,
                        `*The phone has no signal. It seems fried*`,
                        `Blast. Blast. Shot away, I expect by one of your men during this ridiculous fighting!`                  
                      ],
                speaker: [` `, ` `, ` `, `Mandrake`],
                response: null,
                unlocked: false,
                onCompletion: () => {}
            }));

            // PHONE 2
            phone2Dialogue.push(new Dialogue(this, {
                text: [
                        `*Another phone, this one lying on its side*`,
                        `*Guess you never know when you need two phones...*`                  
                      ],
                speaker: [` `, `Mandrake`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));
            phone2Dialogue.push(new Dialogue(this, {
                text: [
                        `*Another phone, this one lying on its side*`,
                        `*You pick up the phone to call SAC...*`,
                        `*But the phone has no wire!*`                  
                      ],
                speaker: [` `, ` `, ` `],
                response: null,
                unlocked: false,
                onCompletion: () => {}
            }));

            // DOOR
            doorDialogue.push(new Dialogue(this, {
                text: [
                        `*I musn't leave until I find the code*`                 
                      ],
                speaker: [`Mandrake`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            // NOTES
            notesDialogue.push(new Dialogue(this, {
                text: [
                        `*A handful of General Ripper's notes*`,
                        `*He seems to have scribbled the same couple of phrases over and over again, in crossword-like patterns*`,
                        `Peace on Earth... P.O.E... Purity of Essence... O.P.O.E...`,
                        `*Could this be the code?*`                 
                      ],
                speaker: [` `, ` `, `Mandrake`],
                response: null,
                unlocked: true,
                onCompletion: () => {
                    this.paused = true;
                    this.officeDoor.destroy();
                    this.officeDoor = undefined;
                    this.gunshot.play();
                    this.openDoor.play();
                    this.guano.setVelocity(-200, 0);
                    this.guano.play('guano_walk');
                    this.walk.play();
                    this.time.addEvent({
                        callback: () => {
                            this.paused = false;
                            this.walk.stop();
                            this.guano.setVelocity(0,0);
                            this.guano.anims.stop();
                            this.guano.setTexture('guano_gun');
                            //this.guano.setFlipX(true);
                            this.guano.interactWith();
                        },
                        repeat: 0,
                        delay: 1250
                    })
                }
            }));
            notesDialogue.push(new Dialogue(this, {
                text: [
                        `Peace on Earth... P.O.E... Purity of Essence... O.P.O.E...`                 
                      ],
                speaker: [`Mandrake`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            guanoDialogue.push(new Dialogue(this, {
                text: [
                        `Put your hands over your head.`,
                        `What the devil do you think you're doing, shooting your way in here? Who are you?`,
                        `I said put your hands over your head.`,
                        `What kinda suit d'you call that, fella?`,
                        `...What do you mean, suit? This happens to be an R.A.F. uniform, sir, and I am Group-Captain Lionel Mandrake. I'm General Ripper's executive officer.`,
                        `Where's General Ripper?`,
                        `He's dead. In the bathroom.`,
                        `Where's the bathroom?`,
                        `Next to you.`                 
                      ],
                speaker: [`Soldier`, `Mandrake`, `Soldier`, `Soldier`, `Mandrake`, `Soldier`, `Mandrake`, `Soldier`, `Mandrake`],
                response: null,
                unlocked: true,
                onCompletion: () => {
                    this.paused = true;
                    this.guano.setVelocity(0, 200);
                    this.guano.play('guano_walk');
                    this.walk.play();
                    this.time.addEvent({
                        callback: () => {
                            this.paused = false;
                            this.walk.stop();
                            this.guano.setVelocity(0,0);
                            this.guano.anims.stop();
                            this.guano.setTexture('guano_gun');
                            this.guano.interactWith();
                        },
                        repeat: 0,
                        delay: 1200
                    })
                }
            }));
            guanoDialogue.push(new Dialogue(this, {
                text: [
                        `*The soldier peers into the bathroom*`,
                        `Look I don't know what sort of stupid game this is you're playing, but I've got a very good idea what the recall code is and I have to get in touch with SAC headquarters immediately!`,
                        `I said put your hands over your head and keep 'em there. Go on!`,
                        `Got any witnesses?`,
                        `Witnesses!? What are you talking about, witnesses? He shot himself!`,
                        `While he was shavin', huh?`,
                        `Now look, Colonel... "Bat Guano"... if that really is your name...May I tell you that I have a very very good idea--I think, I hope, I pray--what the recall code is.`,
                        `It's some sort of recurrent theme he kept repeating, it's a variation on "Peace on Earth" or "Purity of Essence, E.O.P., O.P.E., it's one of those!"`,
                        `Put your hands up on top of your head. Start walkin'.`,
                        `Don't you know that General Ripper went as mad as a bloody march hare and sent the whole Wing to attack the Soviets, don't you know that!?`,
                        `...What are you talkin' about?`,
                        `I'll tell you what I'm talking about. I just need a telephone that's connected to SAC...`                
                      ],
                speaker: [` `, `Mandrake`, `Soldier`, `Soldier`, `Mandrake`, `Soldier`, `Mandrake`, `Mandrake`, `Colonel Guano`, `Mandrake`, `Colonel Guano`, `Mandrake`],
                response: null,
                unlocked: true,
                onCompletion: () => {
                    this.phone1.dialogues[1].dialogue.unlocked = true;
                    this.phone1.dialoguesCompleted = 1;
                    this.phone2.dialogues[1].dialogue.unlocked = true;
                    this.phone2.dialoguesCompleted = 1;
                    this.shadow1.alpha = 0;
                    this.shadow2.alpha = 0;
                }
            }));
        }

        // PLAYER CLASS
        this.player = new Player(this, game.config.width - 250, game.config.height - 110, 'mandrake').setDepth(1).setScale(4,4);   
        this.speakingTo = null;
        this.ending = false;
        this.paused = false;

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

        this.officeDoor = new Interactable(this, game.config.width + 15, game.config.height - 225, 'door', doorDialogue, 'blank');
        this.notes = new Interactable(this, game.config.width - 457, game.config.height - 140, 'notes', notesDialogue, 'blank');
        this.phone1 = new Interactable(this, game.config.width - 457, game.config.height - 200, 'phone1', phone1Dialogue, 'blank');
        this.phone2 = new Interactable(this, game.config.width - 457, game.config.height - 100, 'phone2', phone2Dialogue, 'blank');
        this.couch = new Interactable(this, game.config.width -250, game.config.height, 'couch', couchDialogue, 'blank');
        this.bathroom = new Interactable(this, game.config.width - 70, game.config.height + 90, 'couch', bathroomDialogue, 'blank').setAlpha(0);
        this.gunrack = new Interactable(this, game.config.width -200, game.config.height - 290, 'gunrack', gunrackDialogue, 'blank');
        this.vendingMachine = new Interactable(this, game.config.width -100, game.config.height + 390, 'vending_machine');
        this.phonebooth = new Interactable(this, game.config.width +350, game.config.height + 390, 'phonebooth');

        this.guano = new Interactable(this, game.config.width + 150, game.config.height - 250, 'guano', guanoDialogue, 'guano_head').setFlipX(true);
        this.guano.body.setSize(12, 5);
        this.guano.body.setOffset(0, 23);
        this.soldier1 = new Interactable(this, game.config.width + 75, game.config.height - 350, 'soldier');
        this.soldier2 = new Interactable(this, game.config.width + 150, game.config.height - 360, 'soldier').setFlipX(true);
        this.soldier3 = new Interactable(this, game.config.width + 225, game.config.height - 340, 'soldier').setFlipX(true);

        this.shadow1 = this.add.rectangle(0,0, game.config.width*4, game.config.height, '#000000', 1).setDepth(2);
        this.shadow2 = this.add.rectangle(game.config.width + 505,0, game.config.width, game.config.height*4, '#000000', 1).setDepth(2);

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

        if (!this.ending && !this.paused) {
            // UPDATE PLAYER
            this.player.update();
            this.checkDepth();

            // UPDATE INTERACTABLE OBJECTS/CHARS
            if (this.officeDoor) {
                this.officeDoor.update();
            }
            this.notes.update();
            this.phone1.update();
            this.phone2.update();
            this.couch.update();
            this.bathroom.update();
            this.gunrack.update();
            this.vendingMachine.update();
            this.phonebooth.update();
            this.guano.update()
            this.soldier1.update();
            this.soldier2.update();
            this.soldier3.update();
        }

    }

    checkDepth() {
        if (this.player.y < this.guano.y) {
            this.player.setDepth(1);
            this.guano.setDepth(2);
        } else {
            this.player.setDepth(2);
            this.guano.setDepth(1);
        }
    }
}