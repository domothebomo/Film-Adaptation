class Transition extends Phaser.Scene {
    constructor() {
        super('transitionScene');
    }

    create() {
        this.blip = this.sound.add("blip", {
            volume: 0.01,
        });

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.introDialogue = introDialogue[level];
        if (first_level) {
            this.introDialogue += '\n\nUse the ARROW keys to move, SPACE to interact with objects and individuals, and ESC to pause the game.';
        }
        this.introDialogue += '\n\nPress SPACE to continue';

        // UI TEXT STYLE
        this.UIConfig = {
            color: '#FFFFFF',
            fontFamily: 'Verdana',
            fontSize: '18px',
            align: 'center'
        };
        
        this.dialogueText = this.add.text(198, 66, '', this.UIConfig).setWordWrapWidth(600).setAlign('left').setOrigin(0,0);
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