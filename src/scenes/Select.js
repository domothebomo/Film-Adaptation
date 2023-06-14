class Select extends Phaser.Scene {
    constructor() {
        super('selectScene');
    }

    preload() {
        // PATHS
        this.load.path = './assets/';

        // SPRITES
        this.load.image('level1', './sprites/level1_screenshot.png');
        this.load.image('level2', './sprites/level2_screenshot.png');
        this.load.image('level3', './sprites/level3_screenshot.png');
    }

    create() {
        // BACKGROUND SPRITES
        this.background = this.add.tileSprite(0,0, game.config.width * 2, game.config.height * 2, 'explosion').setOrigin(0,0).setScale(2,2); 

        // CONTROLS
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // TITLE TEXT STYLE
        this.TitleConfig = {
            color: '#800000',
            fontFamily: 'Verdana',
            fontSize: '40px',
            align: 'center',
            fontStyle: 'Bold',
            strokeThickness: 3,
            stroke: '#000000'
        };

        // UI TEXT STYLE
        this.UIConfig = {
            color: '#000000',
            fontFamily: 'Verdana',
            fontSize: '15px',
            align: 'center',
            fontStyle: 'Bold'
        };
  
        // TITLE TEXT
        this.titleText = this.add.text(game.config.width/2, game.config.height/2 - 250, 'SCENE SELECT', this.TitleConfig).setAlign('center').setOrigin(0.5,0);
        this.UIConfig.fontSize = '18px';
        this.exitTip = this.add.text(15, 10, 'Press ESC to Return to Main Menu', this.UIConfig).setAlign('left').setOrigin(0,0);

        // SCENES

        // SCENE 1
        this.level1Border = this.add.rectangle(160, 350, 310, 260, '0x000000').setOrigin(0.5,0.5);
        this.level1Icon = this.add.sprite(160, 350, 'level1').setScale(0.5,0.5);
        this.level1Title = this.add.text(this.level1Icon.x, 200, 'SCENE ONE', this.UIConfig).setOrigin(0.5,0.5);
        this.level1Subtitle = this.add.text(this.level1Icon.x, 510, 'Lieutenant B. "Goldie" Goldberg\nPerform the blind duties \nof the 843rd Bomb Wing.', this.UIConfig).setOrigin(0.5,0.5).setAlign('center').setFontSize('14px');
        this.level1Icon.setInteractive({
            useHandCursor: true
        });
        this.level1Icon.on('pointerdown', () => {
            level = 0;
            this.scene.start('transitionScene');
        });

        // SCENE 2
        this.level2Border = this.add.rectangle(480, 350, 310, 260, '0x000000').setOrigin(0.5,0.5);
        this.level2Icon = this.add.sprite(480, 350, 'level2').setScale(0.5,0.5);
        this.level2Title = this.add.text(this.level2Icon.x, 200, 'SCENE TWO', this.UIConfig).setOrigin(0.5,0.5);
        this.level2Subtitle = this.add.text(this.level2Icon.x, 510, 'Group-Captain Lionel Mandrake\nSearch the battered remnants \nof a broken system.', this.UIConfig).setOrigin(0.5,0.5).setAlign('center').setFontSize('14px');
        this.level2Icon.setInteractive({
            useHandCursor: true
        });
        this.level2Icon.on('pointerdown', () => {
            level = 1;
            this.scene.start('transitionScene');
        });

        // SCENE 3
        this.level3Border = this.add.rectangle(game.config.width-160, 350, 310, 260, '0x000000').setOrigin(0.5,0.5);
        this.level3Icon = this.add.sprite(game.config.width-160, 350, 'level3').setScale(0.5,0.5);
        this.level3Title = this.add.text(this.level3Icon.x, 200, 'SCENE THREE', this.UIConfig).setOrigin(0.5,0.5);
        this.level3Subtitle = this.add.text(this.level3Icon.x, 510, 'Doctor Strangelove\nPrepare for the future \nand devolve to the past.', this.UIConfig).setOrigin(0.5,0.5).setAlign('center').setFontSize('14px');
        this.level3Icon.setInteractive({
            useHandCursor: true
        });
        this.level3Icon.on('pointerdown', () => {
            level = 2;
            this.scene.start('transitionScene');
        });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('titleScene');
        }
    }
}