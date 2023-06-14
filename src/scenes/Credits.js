class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // BACKGROUND SPRITES
        //this.background = this.add.tileSprite(0,0, game.config.width * 2, game.config.height * 2, 'explosion').setOrigin(0,0).setScale(2,2); 

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // UI TEXT STYLE
        this.UIConfig = {
            color: '#FFFFFF',
            fontFamily: 'Verdana',
            fontSize: '15px',
            align: 'center',
            fontStyle: 'Bold'
        };
  
        // TITLE TEXT
        this.UIConfig.fontSize = '40px';
        this.titleText = this.add.text(game.config.width/2, game.config.height/2 - 250, 'CREDITS', this.UIConfig).setAlign('center').setOrigin(0.5,0).setFontStyle('bold');
        this.UIConfig.fontSize = '18px';
        this.exitTip = this.add.text(15, 10, 'Press ESC to Return to Main Menu', this.UIConfig).setAlign('left').setOrigin(0,0);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('titleScene');
        }
    }
}