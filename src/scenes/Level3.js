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

        let boardDialogue = [];
        let chartDialogue = [];
        let muffleyDialogue = [];
        let turgidsonDialogue = [];
        let alexeiDialogue = [];
        let officialDialogue = [];
        {
            // COUCH
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

            chartDialogue.push(new Dialogue(this, {
                text: [
                        `*Your personal information chart, displaying scientific data for various elements and procedures regarding nuclear development*`,   
                      ],
                speaker: [` `],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            officialDialogue.push(new Dialogue(this, {
                text: [
                        `Greetings, Doctor.`,   
                      ],
                speaker: [`U.S. Official`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
            }));

            alexeiDialogue.push(new Dialogue(this, {
                text: [
                        `I can only hope my country's defenses are successful in preventing this catastrophe.`,   
                      ],
                speaker: [`Ambassador Alexei`],
                response: null,
                unlocked: true,
                onCompletion: () => {}
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

        this.turgidson = new Interactable(this, game.config.width + 350, game.config.height + 250, 'turgidson', turgidsonDialogue, 'turgidson_head').setFlipX(true);
        this.turgidson.body.setSize(12, 5);
        this.turgidson.body.setOffset(0, 23);

        this.alexei = new Interactable(this, game.config.width + 200, game.config.height + 75, 'alexei', alexeiDialogue, 'alexei_head');
        this.alexei.body.setSize(12, 5);
        this.alexei.body.setOffset(0, 23);

        this.official1 = new Interactable(this, game.config.width + 400, game.config.height - 200, 'official', officialDialogue, 'official_head');
        this.official2 = new Interactable(this, game.config.width*2 - 250, game.config.height - 100, 'official', officialDialogue, 'official_head').setFlipX(true);
        this.official3 = new Interactable(this, game.config.width*2 - 275, game.config.height + 100, 'official', officialDialogue, 'official_head').setFlipX(true);
        this.official4 = new Interactable(this, game.config.width + 275, game.config.height + 25, 'official', officialDialogue, 'official_head');
        //this.official.body.setSize(12, 5);
        //this.official.body.setOffset(0, 23);


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
            this.checkDepth(this.muffley);
            this.checkDepth(this.alexei);
            this.checkDepth(this.turgidson);

            this.board.update();
            this.chart.update();

            this.muffley.update();
            this.turgidson.update();
            this.alexei.update();
            this.official1.update();
        }
    }

    checkDepth(char) {
        if (this.player.y < char.y) {
            //this.player.setDepth(1);
            char.setDepth(3);
        } else {
            //this.player.setDepth(2);
            char.setDepth(1);
        }
    }



}