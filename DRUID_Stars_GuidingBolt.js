let actor;
let profBonus;
let spellMod;
let remainingUses

let character = canvas.tokens.controlled;
    character.forEach(selected => {
        actor = selected.actor;
        profBonus = actor.data.data.prof._baseProficiency;
        spellMod = actor.data.data.abilities.cha.mod;
        remainingUses = actor.data.data.resources.primary.value;

    });

    //TODO: Account for crits.
if (remainingUses > 0) {

    let attackRoll = new Roll(`1d20 + ${profBonus} + ${spellMod}`).evaluate({async: false});
    let dmgRoll = new Roll(`4d6`).evaluate({async: false}).total;
    let updatedRemaining = remainingUses - 1
    actor.update({'data.resources.primary.value' : updatedRemaining})

    let chatHTML = `Oni summons the power of the stars and casts Guiding Bolt!<br /><br />
        <b>Attack:</b> <a class="inline-result><i class="fas fa-dice-d20></i>${attackRoll.total}</a><br />
        <b>Damage:</b> <a class="inline-result><i class="fas fa-dice-d20></i>${dmgRoll}</a><br />
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