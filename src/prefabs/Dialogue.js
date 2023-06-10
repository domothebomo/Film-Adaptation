// Class for dialogue between the player and an interactable instance. Each conversation is its own instance of this class
//
class Dialogue {
    constructor(scene, dialogue) {

        // DIALOGUE OBJECT ATTRIBUTES:
        // text: The text to be displayed during dialogue
        // response: Dialogue options if player input is requested
        // unlocked: Whether this dialogue can be accessed yet
        // onCompletion: Function that triggers once dialogue finishes
        this.dialogue = dialogue;

        // OTHER ATTRIBUTES
        this.scene = scene;
        this.progress = 0;
    }

    beginDialogue() {
        this.progress = 0;
        this.openDialogueBox();
        this.rolloutDialogue(this.dialogue.text[this.progress]);
        this.progress += 1;
        
    }

    continueDialogue() {
        // CHECK IF PREVIOUS DIALOGUE IS STILL PLAYING, COMPLETE DIALOGUE IF SO
        if (this.scene.dialogueText.text != this.dialogue.text[this.progress - 1]) {
            this.scene.dialogueText.text = this.dialogue.text[this.progress - 1];
            this.rollout.remove();
        } else {
            this.rolloutDialogue(this.dialogue.text[this.progress]);
            this.progress += 1;
        }
    }

    endDialogue() {
        // CHECK IF PREVIOUS DIALOGUE IS STILL PLAYING, COMPLETE DIALOGUE IF SO
        if (this.scene.dialogueText.text != this.dialogue.text[this.progress - 1]) {
            this.scene.dialogueText.text = this.dialogue.text[this.progress - 1];
            this.rollout.remove();
            return false;
        } else {
            this.progress = 0;
            this.closeDialogueBox();
            this.dialogue.onCompletion();
            return true;
        };
    }

    openDialogueBox() {
        this.scene.tweens.add({
            targets: [this.scene.dialogueBox],
            duration: 200,
            scaleY: {from: 0, to: 1},
            ease: 'Linear'

        });
        this.scene.tweens.add({
            targets: [this.scene.playerProfile, this.scene.objectProfile],
            duration: 200,
            scaleY: {from: 0, to: 4},
            ease: 'Linear'

        });
    }

    closeDialogueBox() {
        this.scene.dialogueText.text = '';
        this.scene.tweens.add({
            targets: [this.scene.dialogueBox],
            duration: 100,
            scaleY: {from: 1, to: 0},
            ease: 'Linear'

        });
        this.scene.tweens.add({
            targets: [this.scene.playerProfile, this.scene.objectProfile],
            duration: 100,
            scaleY: {from: 4, to: 0},
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
                if (text[letterCount] != " ") {
                    this.scene.blip.play();
                }
            },
            repeat: text.length - 1,
            delay: 50
        });
    }

}