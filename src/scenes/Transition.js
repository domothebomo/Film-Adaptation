class Transition extends Phaser.Scene {
    constructor() {
        super('transitionScene');
    }

    create() {
        this.blip = this.sound.add("blip", {
            volume: 0.01,
        });

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // UI TEXT STYLE
        this.UIConfig = {
            color: '#FFFFFF',
            fontFamily: 'Verdana',
            fontSize: '18px',
            align: 'center'
        };

        this.dialogueText = this.add.text(198, 66, '', this.UIConfig).setWordWrapWidth(600).setAlign('left').setOrigin(0,0).setDepth(1);

        this.introDialogue = introDialogue[level];
        if (first_level) {
            this.introDialogue += '\n\nUse the ARROW keys to move, SPACE to interact with objects and individuals, and ESC to pause the game.';
        }
        if (level != 3) {
            this.introDialogue += '\n\nPress SPACE to continue';
        } else {
            this.dialogueText.setFontSize('40px').setColor('#000000').setAlign('center').setY(300).setX(game.config.width/2).setOrigin(0.5,0.5);
            this.background = this.add.sprite(0,0, 'explosion').setScale(2,2).setOrigin(0,0);
            this.transitionScreen = this.add.rectangle(0,0, game.config.width*4, game.config.height*4, '0xFFFFFF', 1).setDepth(4);
            this.tweens.add({
                targets: this.transitionScreen,
                alpha: {from: 1, to: 0},
                duration: 10000,
                onComplete: () => {

                }
            });
        }

        this.rolloutDialogue(this.introDialogue);

        first_level = false;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if (level == 0) {
                this.scene.start('level1Scene');
            } else if (level == 1) {
                this.scene.start('level2Scene');
            } else if (level == 2) {
                this.scene.start('level3Scene');
            } else {
                endMusic.stop();
                this.scene.start('titleScene');
            }
        }
    }

    rolloutDialogue(dialogue) {
        this.dialogueText.text = '';
        let lines = this.dialogueText.getWrappedText(dialogue);
        let text = lines.join('\n');

        let letterCount = 0;
        this.rollout = this.time.addEvent({
            callback: () => {
                this.dialogueText.text += text[letterCount];
                letterCount += 1;
                if (text[letterCount] != " ") {
                    //this.blip.play();
                }
            },
            repeat: text.length - 1,
            delay: 10
        });
    }
}