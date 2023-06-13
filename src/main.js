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
            //debug: true
        }
    },
    render: {
        pixelArt: true
    },
    scale: {
        //mode: Phaser.Scale.FIT
    },
    zoom: 1.25,
    scene: [ Title, Transition, Level1 ]
}

let game = new Phaser.Game(config);
let keySPACE, keyESC, keyR;
//let highestTime = 0;
//let tutorial = false;
let level;
let first_level = true;
let introDialogue = [
    `In order to guard against surprise nuclear attack, America's Strategic Air Command maintains a large force of B-52 bombers airborne 24 hours a day. Each B-52 can deliver a nuclear bombload of 50 megatons, equal to 16 times the total explosive force of all the bombs and shells used by all the armies in World War Two. Based in America, the Airborne alert force is deployed from the Persian Gulf to the Arctic Ocean, but they have one geographical factor in common - they are all two hours from their targets inside Russia.\n\nYou are Lieutenant B. "Goldie" Goldberg, an airman of General Jack Ripper's 843rd Bomb Wing and the radio operator of one of these B-52s.`,
    `General Jack Ripper has gone mad. He has ordered Plan R, a coordinated nuclear attack on Russia, under the guise that the Russians have attacked Washington, when the reality is this attack of potentially catastrophic scale is fuelled purely by his own delusion. Burpelson Air Base has been put on Condition Red, its soldiers told that any attempts to enter the base are to be treated as attempted attack by Soviet troops, even if they are under the name and guise of Americans. And so, when the United States War Room sends a battalion to capture Ripper and force him to send the recall order that only he had the code to, a battle breaks out on the air base.\n\nYou are Group Captain Lionel Mandrake, previously trapped in Ripper's office with the psychotic general. After the last of the air base's soldiers surrender, Ripper entered the office bathroom, following which you heard a single gunshot and a loud thud. You assume the worst, and now you must learn the recall code some other way.`
]
