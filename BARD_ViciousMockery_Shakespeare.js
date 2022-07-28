let insulta = ["artless", "bawdy", "beslubbering", "bootless", "churlish", "cockered", "clouted", "craven", "currish", "dankish", "dissembling", "droning", "errant", "fawning", "fobbing", "froward", "frothy", "gleeking", "goatish", "gorbellied", "impertinent", "infectious", "jarring", "loggerheaded", "lumpish", "mammering", "mangled", "mewling", "paunchy", "pribbling", "puking", "puny", "qualling", "rank", "reeky", "roguish", "ruttish", "saucy", "spleeny", "spongy", "surly", "tottering", "unmuzzled", "vain", "venomed", "villainous", "warped", "wayward", "weedy", "yeasty"];
let insultb = ["base-court", "bat-fowling", "beef-witted", "beetle-headed", "boil-brained", "clapper-clawed", "clay-brained", "common-kissing", "crook-pated", "dismal-dreaming", "dizzy-eyed", "doghearted", "dread-bolted", "earth-vexing", "elf-skinned", "fat-kidneyed", "fen-sucked", "flap-mouthed", "fly-bitten", "folly-fallen", "fool-born", "full-gorged", "guts-griping", "half-faced", "hasty-witted", "hedge-born", "hell-hated", "idle-headed", "ill-breeding", "ill-nurtured", "knotty-pated", "milk-livered", "motley-minded", "onion-eyed", "plume-plucked", "pottle-deep", "pox-marked", "reeling-ripe", "rough-hewn", "rude-growing", "rump-fed", "shard-borne", "sheep-biting", "spur-galled", "swag-bellied", "tardy-gaited", "tickle-brained", "toad-spotted", "unchin-snouted", "weather-bitten"];
let insultc = ["apple-john", "baggage", "barnacle", "bladder", "boar-pig", "bugbear", "bum-bailey", "canker-blossom", "clack-dish", "clotpole", "coxcomb", "codpiece", "death-token", "dewberry", "flap-dragon", "flax-wench", "flirt-gill", "foot-licker", "fustilarian", "giglet", "gudgeon", "haggard", "harpy", "hedge-pig", "horn-beast", "hugger-mugger", "joithead", "lewdster", "lout", "maggot-pie", "malt-worm", "mammet", "measle", "minnow", "miscreant", "moldwarp", "mumble-news", "nut-hook", "pigeon-egg", "pignut", "puttock", "pumpion", "ratsbane", "scut", "skainsmate", "strumpet", "varlot", "vassal", "whey-face", "wagtail"];

let randoma = insulta[Math.floor(Math.random() * insulta.length)];
let randomb = insultb[Math.floor(Math.random() * insultb.length)];
let randomc = insultc[Math.floor(Math.random() * insultc.length)];

let insultwords = randoma.concat(' ', randomb.concat(' ', randomc));

let fullinsult = 'You '.concat(insultwords, '.');

let bardlevel = actor.data.data.classes.bard.levels;
let dmg = 0;

console.log(bardlevel);

if (bardLevel == 0) {
    return;
} else if (bardlevel < 5) {
    dmg = await new Roll(`1d4`).roll({async: true});
    dmg = dmg.total;
} else if (bardlevel < 11) {
    dmg = await new Roll(`2d4`).roll({async: true});
    dmg = dmg.total;
} else if (bardlevel < 17) {
    dmg = await new Roll(`3d4`).roll({async: true});
    dmg = dmg.total;
} else {
    dmg = await new Roll(`4d4`).roll({async: true});
    dmg = dmg.total;
}

dmg = dmg.toString()

let insultdmg = fullinsult.concat('\n', '\n'.concat(dmg, ' point(s) of psychic damage dealt.'));

ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker({token: actor}),
    content: insultdmg
});


