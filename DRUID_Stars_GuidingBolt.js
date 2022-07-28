let actor;
let actorName;
let profBonus;
let spellMod;
let remainingUses

let character = canvas.tokens.controlled;
    character.forEach(selected => {
        actor = selected.actor;
        actorName = actor.data.data.name;
        profBonus = actor.data.data.prof._baseProficiency;
        spellMod = actor.data.data.abilities.cha.mod;
        remainingUses = actor.data.data.resources.primary.value;

    });

    //TODO: Account for crits.
if (remainingUses > 0) {

    let twentyRoll = new Roll(`1d20`).evaluate({async: false}).total;
    let attackRoll = twentyRoll + profBonus + spellMod;
    let dmgRoll;

    if (twentyRoll == 20) {
        dmgRoll = new Roll(`8d6`).evaluate({async: false}).total;
    } else {
        dmgRoll = new Roll(`4d6`).evaluate({async: false}).total;
    }

    // let attackRoll = new Roll(`1d20 + ${profBonus} + ${spellMod}`).evaluate({async: false});
    // let dmgRoll = new Roll(`4d6`).evaluate({async: false}).total;
    let updatedRemaining = remainingUses - 1
    actor.update({'data.resources.primary.value' : updatedRemaining})

    let chatHTML = `${actorName} summons the power of the stars and casts Guiding Bolt!<br /><br />
        <b>Attack:</b> <a class="inline-result><i class="fas fa-dice-d20></i>${attackRoll}</a><br />
        <b>Damage:</b> <a class="inline-result><i class="fas fa-dice-d20></i>${dmgRoll} radiant</a><br />
        ${updatedRemaining} use(s) remain.`

    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({token: actor}),
        content: chatHTML
    })
} else {
    ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker({token: actor}),
        content: 'No more uses remain. Please use a spell slot.'
    })
}