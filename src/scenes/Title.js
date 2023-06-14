class Title extends Phaser.Scene {
  constructor() {
      super('titleScene');
  }

  preload() {
    // PATHS
    this.load.path = './assets/';

    // SPRITES
    this.load.image('background', './sprites/sky.png');
    this.load.image('explosion', './sprites/explosion.png');

    // AUDIO
    this.load.audio('blip', './audio/blip4.wav'); 
  }

  create() {

    // BACKGROUND SPRITES
    this.background = this.add.tileSprite(0,0, game.config.width * 2, game.config.height * 2, 'explosion').setOrigin(0,0).setScale(2,2);     
    

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
    this.titleText = this.add.text(game.config.width/2, game.config.height/2 - 150, 'Dr. Strangelove', this.TitleConfig).setOrigin(0.5,0);
    this.TitleConfig.fontSize = '25px';
    this.subtTitleText = this.add.text(game.config.width/2, game.config.height/2 - 100, 'or: How I Learned to Stop Worrying\nand Love the Bomb', this.TitleConfig).setOrigin(0.5,0);

    // PLAY BUTTON
    this.UIConfig.fontSize = '18px';
    this.playButton = this.add.rectangle(game.config.width / 2, game.config.height / 2, 200, 50, 0xbbbbbb);
    this.playButtonText = this.add.text(this.playButton.x, this.playButton.y, 'PLAY', this.UIConfig).setOrigin(0.5, 0.5);
    this.playButton.setInteractive({
      useHandCursor: true
    });
    this.playButton.on('pointerdown', () => {
      level = 0;
      this.scene.start('transitionScene');
    });

    // SCENE SELECT MODE BUTTON
    this.modeButton = this.add.rectangle(game.config.width / 2, game.config.height / 2 + 60, 200, 50, 0xbbbbbb);
    this.modeButtonText = this.add.text(this.modeButton.x, this.modeButton.y, 'SCENE SELECT', this.UIConfig).setOrigin(0.5, 0.5);
    this.modeButton.setInteractive({
      useHandCursor: true
    });
    this.modeButton.on('pointerdown', () => {
      this.scene.start('selectScene');
    });

    // CREDITS BUTTON
    this.creditsButton = this.add.rectangle(game.config.width / 2, game.config.height / 2 + 120, 200, 50, 0xbbbbbb);
    this.creditsButtonText = this.add.text(this.creditsButton.x, this.creditsButton.y, 'CREDITS', this.UIConfig).setOrigin(0.5, 0.5);
    this.creditsButton.setInteractive({
      useHandCursor: true
    });
    this.creditsButton.on('pointerdown', () => {
      this.scene.start('creditsScene');
    });

    level = 0;
    first_level = true;

  }

}