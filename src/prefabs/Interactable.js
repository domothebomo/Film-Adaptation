class Interactable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, dialogues) {
        super(scene, x, y, sprite);

        this.scene = scene;
        this.dialogues = this.dialogues;
        this.dialogueProgress = 0;
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
            console.log('hello');
        }

    }
}