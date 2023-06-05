/**
 * Dominic Fanaris
 * Title:
 * Hours Spent:
 * 
 * 
 */

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    render: {
        pixelArt: true
    },
    scale: {
        //mode: Phaser.Scale.FIT
    },
    zoom: 1.25,
    scene: [ Title, Level1 ]
}

let game = new Phaser.Game(config);
let keySPACE, keyESC;
let highestTime = 0;
let tutorial = false;
