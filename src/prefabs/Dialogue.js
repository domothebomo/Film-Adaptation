class Dialogue {
    constructor(scene, dialogue) {
        // Param 1: Array/Object of every dialogue box
        // Param 2: Array/Object of player response options
        this.scene = scene;
        this.dialogue = dialogue;
        this.progress = 0;
    }

    beginDialogue() {
        //console.log('wow');
        this.progress = 0;
        this.openDialogueBox();
        this.rolloutDialogue(this.dialogue.text[this.progress]);
        this.progress += 1;
        
    }

    continueDialogue() {
        if (this.scene.dialogueText.text != this.dialogue.text[this.progress - 1]) {
            //console.log('bruh')
            this.scene.dialogueText.text = this.dialogue.text[this.progress - 1];
            this.rollout.remove();
        } else {
            this.rolloutDialogue(this.dialogue.text[this.progress]);
            this.progress += 1;
        }
        //console.log(this.progress);
    }

    endDialogue() {
        if (this.scene.dialogueText.text != this.dialogue.text[this.progress - 1]) {
            //console.log('bruh')
            this.scene.dialogueText.text = this.dialogue.text[this.progress - 1];
            this.rollout.remove();
            return false;
        } else {
            this.progress = 0;
            this.closeDialogueBox();
            return true;
        };
    }

    openDialogueBox() {
        this.scene.tweens.add({
            targets: [this.scene.dialogueBox],
            duration: 200,
            scaleY: {from: 0, to: 1},
            //alpha: {from: 0, to: 1},
            ease: 'Linear'

        });
        this.scene.tweens.add({
            targets: [this.scene.playerProfile, this.scene.objectProfile],
            duration: 200,
            scaleY: {from: 0, to: 4},
            //alpha: {from: 0, to: 1},
            ease: 'Linear'

        });
    }

    closeDialogueBox() {
        this.scene.dialogueText.text = '';
        this.scene.tweens.add({
            targets: [this.scene.dialogueBox],
            duration: 100,
            scaleY: {from: 1, to: 0},
            //alpha: {from: 0, to: 1},
            ease: 'Linear'

        });
        this.scene.tweens.add({
            targets: [this.scene.playerProfile, this.scene.objectProfile],
            duration: 100,
            scaleY: {from: 4, to: 0},
            //alpha: {from: 0, to: 1},
            ease: 'Linear'

        });
    }

    rolloutDialogue(dialogue) {
        this.scene.dialogueText.text = '';
        let lines = this.scene.dialogueText.getWrappedText(dialogue);
        let text = lines.join('\n');

        let letterCount = 0;
        this.rollout = this.scene.time.addEvent({
            callback: () => {
                this.scene.dialogueText.text += text[letterCount];
                letterCount += 1;
            },
            repeat: text.length - 1,
            delay: 40
        });
        //console.log(this.rollout);
    }

}