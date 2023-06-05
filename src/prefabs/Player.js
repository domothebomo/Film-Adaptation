class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.moveSpeed = 100;

    }

    update() {
        this.direction = new Phaser.Math.Vector2(0);
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
        if (this.direction.x != 0 || this.direction.y != 0) {
            this.play('pilot_walk', true);
        } else {
            this.anims.stop();
            this.setTexture('pilot');
        }
        this.direction.normalize();
        this.setVelocity(this.moveSpeed * this.direction.x, this.moveSpeed * this.direction.y);

    }

}