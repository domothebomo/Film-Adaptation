// Class for interactable sprites. All objects and characters the player can initiate dialogue with use this class
//
class Interactable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, dialogues, profile) {
        super(scene, x, y, sprite);

        // SCENE SETUP
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(4,4);

        // DIALOGUE ATTRIBUTES
        this.dialogues = dialogues;
        this.dialogueProgress = 0;
        this.dialoguesCompleted = 0;
        this.speaking = false;

        if (profile) {
            this.profile = profile;
        } else {
            this.profile = sprite;
        }
        

        // PHYSICS
        this.scene.physics.add.collider(this, this.scene.player)
        this.body.immovable = true;

        // INTERACTION RADIUS
        this.interactRadius = this.scene.add.zone(this.x, this.y, this.width * 5, this.height * 5);
        this.scene.physics.world.enable(this.interactRadius);
        this.scene.physics.add.overlap(this.scene.player, this.interactRadius);
    }

    update() {

        // CHECK IF PLAYER IS WITHIN INTERACTION RADIUS
        if (this.scene.physics.world.overlap(this.scene.player, this.interactRadius)) {
            if (!this.near) {
                this.near = true;
            }
        } else {
            if (this.near) {
                this.near = false;
            }
        }

        // INITIATE DIALOGUE BETWEEN PLAYER AND THIS INTERACTABLE
        if (this.near && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.interactWith();
        }

    }

    interactWith() {
        if (!this.dialogues[this.dialoguesCompleted].dialogue.unlocked) {
            this.dialoguesCompleted -= 1;
        }

        // BEGIN DIALOGUE
        if (!this.speaking) {
            this.speaking = true;
            this.scene.player.interacting = true;
            this.dialogues[this.dialoguesCompleted].beginDialogue();
            this.scene.objectProfile.setTexture(this.profile);

        // CONTINUING DIALOGUE
        } else if (this.dialogues[this.dialoguesCompleted].progress < this.dialogues[this.dialoguesCompleted].dialogue.text.length) {
            this.dialogues[this.dialoguesCompleted].continueDialogue();

        // ENDING DIALOGUE
        } else {
            if (this.dialogues[this.dialoguesCompleted].endDialogue()) {
                this.speaking = false;
                this.scene.player.interacting = false;
                if (this.dialoguesCompleted < this.dialogues.length - 1) {
                    this.dialoguesCompleted += 1;
                }
            }
        }
    }
}