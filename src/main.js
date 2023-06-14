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
    },
    render: {
        pixelArt: true
    },
    zoom: 1.25,
    scene: [ Title, Transition, Select, Credits, Level1, Level2, Level3 ]
}

let game = new Phaser.Game(config);
let keySPACE, keyESC, keyR;
let level;
let endMusic;
let first_level = true;
let introDialogue = [
    `In order to guard against surprise nuclear attack, America's Strategic Air Command maintains a large force of B-52 bombers airborne 24 hours a day. Each B-52 can deliver a nuclear bombload of 50 megatons, equal to 16 times the total explosive force of all the bombs and shells used by all the armies in World War Two. Based in America, the Airborne alert force is deployed from the Persian Gulf to the Arctic Ocean, but they have one geographical factor in common - they are all two hours from their targets inside Russia.\n\nYou are Lieutenant B. "Goldie" Goldberg, an airman of General Jack Ripper's 843rd Bomb Wing and the radio operator of one of these B-52s.`,
    `General Jack Ripper has gone mad. He has ordered Plan R, a coordinated nuclear attack on Russia, under the guise that the Russians have attacked Washington, when the reality is this attack of potentially catastrophic scale is fueled purely by his own delusion. Burpelson Air Base has been put on Condition Red, its soldiers told that any attempts to enter the base are to be treated as attempted attack by Soviet troops, even if they are under the name and guise of Americans. And so, when the United States War Room sends a battalion to capture Ripper and force him to send the recall order that only he had the code to, a battle breaks out on the air base.\n\nYou are Group Captain Lionel Mandrake, previously trapped in Ripper's office with the psychotic general. After the last of the air base's soldiers surrender, Ripper entered the office bathroom, followed by a single gunshot and a loud thud. You assume the worst, and now you must learn the recall code some other way.`,
    `Captain Mandrake was correct in guessing the recall code. The 843rd Bomb Wing received word to cancel the attack, and all managed to comply save for four planes, which were shot down by Russian missiles. However, in a surprising turn, the War Room learned that one of the planes thought to have been taken out was only damaged, which, if successful in its run, would activate a secret Soviet doomsday device and plunge all of humanity into radioactive terror.\n\nYou are Doctor Strangelove, a former Nazi Nuclear Scientist and current U.S. Weapons Strategist. While the Soviets scramble to intercept the last American plane, you think it may be wise to discuss with President Muffley the possibility of preserving humanity underground.`,
    `THE END`
]
