// The Player Class: Controls movement and attributes specific to the player character
//
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        
        // SCENE SETUP
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // PHYSICS + HITBOX
        this.body.setCollideWorldBounds(true);
        this.body.setSize(12, 5);
        this.body.setOffset(0, 23);

        // USER CONTROLS
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        // ATTRIBUTES
        this.moveSpeed = 200;
        this.interacting = false;
        this.walking = false;

    }

    update() {

        // PLAYER MOVEMENT
        this.direction = new Phaser.Math.Vector2(0);
        if (!this.interacting) {
            if (this.cursors.left.isDown) {
                this.direction.x = -1;
                this.flipX = true;
            } else if (this.cursors.right.isDown) {
                this.direction.x = 1;
                this.flipX = false;
            }
            if (this.cursors.up.isDown) {
                this.direction.y = -1;
            } else if (this.cursors.down.isDown) {
                this.direction.y = 1;
            }
            this.direction.normalize();
        }
        // MOVEMENT ANIMATIONS
        if (this.direction.x != 0 || this.direction.y != 0) {
            this.handleAnim();
            if (!this.walking) {
                this.scene.walk.play();
                this.walking = true;
            }
        } else {
            this.anims.stop();
            this.handleTexture()
            if (this.walking) {
                this.scene.walk.stop();
                this.walking = false;
            }
        }
        this.setVelocity(this.moveSpeed * this.direction.x, this.moveSpeed * this.direction.y);

    }

    // Animation depends on scene
    handleAnim() {
        switch (level) {
            case 0:
                this.play('pilot_walk', true);
                break;
            case 1:
                this.play('mandrake_walk', true);
                break;
        }
    }
    // Texture depends on scene
    handleTexture() {
        switch (level) {
            case 0:
                this.setTexture('pilot');
                break;
            case 1:
                this.setTexture('mandrake');
                break;
        }
    }

}