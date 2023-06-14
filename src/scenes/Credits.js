class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {

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
            color: '#FFFFFF',
            fontFamily: 'Verdana',
            fontSize: '16px',
            align: 'center',
            fontStyle: 'Bold',
            lineSpacing: 10
        };
  
        // TITLE TEXT
        this.titleText = this.add.text(game.config.width/2, game.config.height/2 - 250, 'CREDITS', this.TitleConfig).setAlign('center').setOrigin(0.5,0).setFontStyle('bold');
        this.UIConfig.fontSize = '18px';
        this.exitTip = this.add.text(15, 10, 'Press ESC to Return to Main Menu', this.UIConfig).setAlign('left').setOrigin(0,0);
        this.UIConfig.fontSize = '16px'
        this.creditsText = this.add.text(game.config.width/2, 150, 'Developed by Dominic Fanaris\n\nMusic\nThe Bomb Run (From "Dr. Strangelove") - The City of Prague Philharmonic Orchestra\nWe\'ll Meet Again - Vera Lynn\n\nSound\ntosha73 - https://freesound.org/people/tosha73/sounds/584597/\ndaveincamas - https://freesound.org/people/daveincamas/sounds/44229/\nSoftDistortionFX - https://freesound.org/people/SoftDistortionFX/sounds/398937/\nunfa - https://freesound.org/people/unfa/sounds/258341/\nPixabay - https://pixabay.com/sound-effects/concrete-footsteps-6752/\nPixabay - https://pixabay.com/sound-effects/single-gunshot-62-hp-37188/\nPixabay - https://pixabay.com/sound-effects/dorm-door-opening-6038/\n\nAll other assets created by Dominic Fanaris', this.UIConfig).setAlign('center').setOrigin(0.5,0);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start('titleScene');
        }
    }
}