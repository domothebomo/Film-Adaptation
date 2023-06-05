class Interactable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, dialogues) {
        super(scene, x, y, sprite);

        this.scene = scene;
        this.dialogues = dialogues;
        this.dialogueProgress = 0;
        this.dialoguesCompleted = 0;
        this.speaking = false;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(4,4);
        this.scene.physics.add.collider(this, this.scene.player)
        this.body.immovable = true;

        this.interactRadius = this.scene.add.zone(this.x, this.y, this.height * 5, this.width * 5);
        this.scene.physics.world.enable(this.interactRadius);
        //this.scene.physics.add.overlap(this.scene.player, this.interactRadius, () => {console.log('bruh')});

        //this.on('overlapstart', () => {console.log('hi')});
        //this.on('overlapend', () => {console.log('bye')});
        this.scene.physics.add.overlap(this.scene.player, this.interactRadius);

        //console.log(this.dialogues[this.dialoguesCompleted]);
    }

    update() {

        if (this.scene.physics.world.overlap(this.scene.player, this.interactRadius)) {
            if (!this.near) {
                this.near = true;
                //console.log('hi');
            }
        } else {
            if (this.near) {
                this.near = false;
                //console.log('bye');
            }
        }
        if (this.near && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            //console.log('hello');
            if (!this.speaking) {
                //console.log('hello');
                this.speaking = true;
                this.scene.player.interacting = true;
                this.dialogues[this.dialoguesCompleted].beginDialogue();
                //this.dialogueProgress += 1;
            } else if (this.dialogues[this.dialoguesCompleted].progress < this.dialogues[this.dialoguesCompleted].dialogue.text.length) {
                //console.log('i see');
                this.dialogues[this.dialoguesCompleted].continueDialogue();
                //this.dialogueProgress += 1;
            } else {
                //console.log('bye');
                //this.speaking = false;
                if (this.dialogues[this.dialoguesCompleted].endDialogue()) {
                    this.speaking = false;
                    this.scene.player.interacting = false;
                    if (this.dialoguesCompleted < this.dialogues.length - 1) {
                        this.dialoguesCompleted += 1;
                    }
                }
                //this.dialogueProgress = 0;
                // if (this.dialoguesCompleted < this.dialogues.length - 1) {
                //     this.dialoguesCompleted += 1;
                // }
            }
        }

    }
}