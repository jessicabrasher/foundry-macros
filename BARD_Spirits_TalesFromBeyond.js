//Tales from Beyond Macro

let actor;
let remainingUses;
let spiritTales
let spiritRoll;
let spiritFlavor
let chatHTML;
let bardLevel;

let character = canvas.tokens.controlled;

    character.forEach(selected => {
        actor = selected.actor;
        remainingUses = actor.data.data.resources.primary.value;
        bardLevel = actor.data.data.classes.bard.levels;
    });

spiritTales = {
     1 : `Tale of the Clever Animal. For the next 10 minutes, whenever the target makes an Intelligence, a Wisdom, or a Charisma check, the target can roll an extra die immediately after rolling the d20 and add the extra die's number to the check. The extra die is the same type as your Bardic Inspiration die.`,
     2 : `Tale of the Renowned Duelist. You make a melee spell attack against the target. On a hit, the target takes force damage equal to two rolls of your Bardic Inspiration die + your Charisma modifier.`,
     3 : `Tale of the Beloved Friends. The target and another creature of its choice it can see within 5 feet of it gains temporary hit points equal to a roll of your Bardic Inspiration die + your Charisma modifier.`,
     4 : `Tale of the Runaway. The target can immediately use its reaction to teleport up to 30 feet to an unoccupied space it can see. When the target teleports, it can choose a number of creatures it can see within 30 feet of it up to your Charisma modifier (minimum of 0) to immediately use the same reaction.`,
     5 : `Tale of the Avenger. For 1 minute, any creature that hits the target with a melee attack takes force damage equal to a roll of your Bardic Inspiration die.`,
     6 : `Tale of the Traveler. The target gains temporary hit points equal to a roll of your Bardic Inspiration die + your bard level. While it has these temporary hit points, the target's walking speed increases by 10 feet and it gains a +1 bonus to its AC.`,
     7 : `Tale of the Beguiler. The target must succeed on a Wisdom saving throw or take psychic damage equal to two rolls of your Bardic Inspiration die, and the target is incapacitated until the end of its next turn.`,
     8 : `Tale of the Phantom. The target becomes invisible until the end of its next turn or until it hits a creature with an attack. If the target hits a creature with an attack during this invisibility, the creature it hits takes necrotic damage equal to a roll of your Bardic Inspiration die and is frightened of the target until the end of the frightened creature's next turn.`,
     9 : `Tale of the Brute. Each creature of the target's choice it can see within 30 feet of it must make a Strength saving throw. On a failed save, a creature takes thunder damage equal to three rolls of your Bardic Inspiration die and is knocked prone. A creature that succeeds on its saving throw takes half as much damage and isn't knocked prone.`,
    10 : `Tale of the Dragon. The target spews fire from the mouth in a 30-foot cone. Each creature in that area must make a Dexterity saving throw, taking fire damage equal to four rolls of your Bardic Inspiration die on a failed save, or half as much damage on a successful one.`,
    11 : `Tale of the Angel. The target regains hit points equal to two rolls of your Bardic Inspiration die + your Charisma modifier, and you end one condition from the following list affecting the target: blinded, deafened, paralyzed, petrified, or poisoned.`,
    12 : `Tale of the Mind-Bender. You evoke an incomprehensible fable from an otherworldly being. The target must succeed on an Intelligence saving throw or take psychic damage equal to three rolls of your Bardic Inspiration die and be stunned until the end of its next turn.`
}


console.log(spiritTales[spiritRoll]);

if (remainingUses > 0) {
    //todo - fix to reflect proper die.
    if (bardLevel = 0) {
        return;
    } else if (bardLevel < 5) {
        spiritRoll = new Roll(`1d6`).evaluate({async: false}).total;
    } else if (bardLevel < 10) {
        spiritRoll = new Roll(`1d8`).evaluate({async: false}).total;
    } else if (bardLevel < 15) {
        spiritRoll = new Roll(`1d10`).evaluate({async: false}).total;
    } else {
        spiritRoll = new Roll(`1d12`).evaluate({async: false}).total;
    }

    spiritFlavor = spiritTales[spiritRoll];
    let updatedRemaining = remainingUses - 1;
    actor.update({'data.resources.primary.value' : updatedRemaining});

    chatHTML = `<b class="fas fa-dice-d20">Tales From Beyond</b><br /><br /><i>Ammonite closes her eyes as whisps of spirit forms emerge from the skull in her hand and encompass her. Her eyes roll back as a disembodied voice begins to tell a tale.</i><br /><br />${spiritFlavor}`

    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({token: actor}),
        content: chatHTML
    })

} else {
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({token: actor}),
        content: 'No more bardic inspiration remain to use this feature.'
    })
}