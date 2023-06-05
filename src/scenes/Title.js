class Title extends Phaser.Scene {
  constructor() {
      super('titleScene');
  }

  preload() {
    // PATHS
    this.load.path = './assets/';

    // SPRITES
    this.load.image('background', './sprites/sky.png');
  }

  create() {

    // BACKGROUND SPRITES
    this.background = this.add.tileSprite(0,0, game.config.width * 2, game.config.height * 2, 'background').setOrigin(0,0);    
    //this.plane = this.add.sprite(0,0, 'plane').setScale(2,2).setOrigin(0,0);  
    

    // TITLE TEXT
    this.titleText = this.add.text(game.config.width/2, game.config.height/2 - 150, 'Dr. Strangelove', {color: '#000000', fontSize: '40px'}).setAlign('center').setOrigin(0.5,0);
    this.subtTitleText = this.add.text(game.config.width/2, game.config.height/2 - 100, 'or: How I Learned to Stop Worrying and Love the Bomb', {color: '#000000',fontSize: '25px'}).setAlign('center').setOrigin(0.5,0);

    // UI TEXT STYLE
    this.UIConfig = {
      color: '#000000',
      fontFamily: 'Verdana',
      fontSize: '15px',
      align: 'center'
    };

    // PLAY BUTTON
    
    this.playButton = this.add.rectangle(game.config.width / 2, game.config.height / 2, 200, 50, 0xbbbbbb);
    this.playButtonText = this.add.text(this.playButton.x, this.playButton.y, 'PLAY', this.UIConfig).setOrigin(0.5, 0.5);
    this.playButton.setInteractive({
      useHandCursor: true
    });
    this.playButton.on('pointerdown', () => {
      this.scene.start('level1Scene');
      console.log('play');
    });

    // SCENE SELECT MODE BUTTON
    
    this.modeButton = this.add.rectangle(game.config.width / 2, game.config.height / 2 + 60, 200, 50, 0xbbbbbb);
    this.modeButtonText = this.add.text(this.modeButton.x, this.modeButton.y, 'SCENE SELECT', this.UIConfig).setOrigin(0.5, 0.5);
    this.modeButton.setInteractive({
      useHandCursor: true
    });
    this.modeButton.on('pointerdown', () => {
      //this.scene.start('playScene');
      console.log('select mode');
    });

    // CREDITS BUTTON
    
    this.creditsButton = this.add.rectangle(game.config.width / 2, game.config.height / 2 + 120, 200, 50, 0xbbbbbb);
    this.creditsButtonText = this.add.text(this.creditsButton.x, this.creditsButton.y, 'CREDITS', this.UIConfig).setOrigin(0.5, 0.5);
    this.creditsButton.setInteractive({
      useHandCursor: true
    });
    this.creditsButton.on('pointerdown', () => {
      //this.scene.start('playScene');
      console.log('credits');
    });

    // TUTORIAL BUTTON
    

    // CREDITS TEXT
    //this.UIConfig.color = '#FFFFFF';
    //this.creditsText = this.add.text(game.config.width / 2, game.config.height / 2 + 160, 'created by Dominic Fanaris', this.UIConfig).setOrigin(0.5,0.5);

  }

  update() {
    this.background.tilePositionX -= 10;
  }

}