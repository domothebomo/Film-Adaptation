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
    this.load.audio('blip', './audio/blip4.wav'); // https://freesound.org/people/SoftDistortionFX/sounds/398937/
  }

  create() {

    // BACKGROUND SPRITES
    this.background = this.add.tileSprite(0,0, game.config.width * 2, game.config.height * 2, 'explosion').setOrigin(0,0).setScale(2,2);     
    

    // UI TEXT STYLE
    this.UIConfig = {
      color: '#000000',
      fontFamily: 'Verdana',
      fontSize: '15px',
      align: 'center',
      fontStyle: 'Bold'
    };

    // TITLE TEXT
    this.UIConfig.fontSize = '40px';
    this.titleText = this.add.text(game.config.width/2, game.config.height/2 - 150, 'Dr. Strangelove', this.UIConfig).setAlign('center').setOrigin(0.5,0).setFontStyle('bold');;
    this.UIConfig.fontSize = '25px';
    this.subtTitleText = this.add.text(game.config.width/2, game.config.height/2 - 100, 'or: How I Learned to Stop Worrying and Love the Bomb', this.UIConfig).setAlign('center').setOrigin(0.5,0).setFontStyle('bold');;

    // PLAY BUTTON
    
    this.UIConfig.fontSize = '15px';
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