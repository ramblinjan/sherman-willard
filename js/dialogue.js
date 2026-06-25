// Customer banter — synchronous, fully offline, no external dependencies.
// Works as-is on GitHub Pages. LM Studio version is in git history if you
// ever want to re-enable it for local play.

export const PERSONAS = [
  {
    id: 'ganja_pro',
    label: 'Cannabis Connoisseur',
    voice: 'a deeply mellow, expert cannabis connoisseur',
  },
  {
    id: 'old_timer',
    label: 'Cranky Old-Timer',
    voice: 'a cranky elderly customer upset about paint prices',
  },
  {
    id: 'existential',
    label: 'Anxious Overthinker',
    voice: 'an anxious overthinker treating paint as a life decision',
  },
  {
    id: 'contractor',
    label: 'Gruff Contractor',
    voice: 'a gruff, no-nonsense contractor in a hurry',
  },
  {
    id: 'chatty_regular',
    label: 'Chatty Regular',
    voice: 'an over-friendly regular who overshares about their renovation',
  },
];

// Lines may contain {color} which is replaced with the order's colorName.
// ~15 per persona/phase — large enough that a session rarely repeats.
const CANNED = {
  ganja_pro: {
    WAIT: [
      'No rush, man. Time is a construct anyway.',
      'Is that {color} I see on the swatch? I had a dream about that.',
      'The wait is part of it. You know?',
      'I\'m just vibing. Take your time.',
      'Good energy in here today.',
    ],
    ORDER: [
      '{color}... dude, that name alone is worth the trip.',
      'I had a dream about this color. Like, specifically this one.',
      'Paint is just the universe deciding what it wants a wall to be.',
      'I need this for the living room. The energy in there is all wrong.',
      'The name alone, man. The name alone.',
      'Colors are just light taking its time. And this one is in no hurry.',
      'I trust the process. The process brought me here.',
      'A gallon feels right. I\'m listening to what the walls want.',
      'I didn\'t choose it. It chose me.',
      'My roommate said any color, so obviously I went with this.',
      'Good Enough? That\'s actually kind of profound when you sit with it.',
      '{color}. Yeah. That tracks completely.',
      'I\'ve been staring at the swatch for six weeks. Worth it.',
      'This is going to completely change the frequency in that room.',
      'I could feel this one from the parking lot.',
    ],
    PICKUP: [
      'This can feels like it has wisdom in it.',
      'Far out. You mixed that with intention, I can tell.',
      'Thank you. I mean that cosmically.',
      'Oh, it\'s warm from the shaker. That\'s beautiful.',
      'My walls are going to feel so understood.',
      'You know what, you\'re doing really good work. Like, really good.',
      'The vibration on this is exactly right.',
      'Heavy. It\'s heavy. That\'s good. Weight means substance.',
      'I\'m going to sit with this in the car for a minute before I drive.',
      'I could cry a little. Is that weird? Don\'t answer that.',
      'Thank you. Genuinely. For everything you do here.',
      'I\'m going to put this on the good wall. The one that matters.',
      '{color} in a can. My whole philosophy, honestly.',
      'Be well, friend. Be well.',
      'This is it. I just know.',
    ],
  },

  old_timer: {
    WAIT: [
      'How long is this going to take.',
      'There\'s a line, in case nobody noticed.',
      'In my day you walked up and they helped you.',
      'I\'ve been standing here a while.',
      'Service used to mean something.',
    ],
    ORDER: [
      'Back in my day this was a nickel a gallon.',
      'How much?! For paint?? Highway robbery.',
      'In 1962 I painted a whole house for a dollar.',
      'My wife sent me. I don\'t even know what this color is.',
      '{color}. You named a color that? In my day we called it beige.',
      'I\'ve been buying paint here since before you were born.',
      'I used to mix my own. Saved a fortune. Now everything\'s premixed.',
      'My daughter says this is the color. I say it looks brown.',
      'How long does this take? I\'ve got a doctor\'s appointment at two.',
      'Don\'t tell me about the new formula. The old formula was fine.',
      'Forty years I\'ve been painting my own house.',
      'The Gray Area. My whole life is a gray area at this point.',
      'Fine Whatever? That\'s a paint color? What happened to just calling it white.',
      'Buyer\'s Remorse. That\'s what this is every single time.',
      'I just need one gallon. I don\'t need a conversation.',
    ],
    PICKUP: [
      'This better last longer than the last batch.',
      'Robbery, plain robbery. But fine.',
      'They sure don\'t make it like they used to.',
      'About time.',
      'My arthritis is acting up. Don\'t make me carry this far.',
      'Don\'t tell me it needs a second coat. It always needs a second coat.',
      'The lid better seal. Last time the lid didn\'t seal.',
      'What\'s the return policy? In case my wife hates it.',
      'Back in my day you shook it yourself. Kept you strong.',
      'If this chips before spring I\'m coming back.',
      'Heavy. Good. At least I\'m getting something for my money.',
      'Thank you. I didn\'t mean to be difficult. It\'s the prices.',
      'Fine. Fine. This is fine.',
      'I\'ll tell my grandkids I paid this much for paint.',
      'Okay. Next time I\'m going to the other place. Same as last time.',
    ],
  },

  existential: {
    WAIT: [
      'Standing here, uncertain... this is basically my whole life.',
      'Am I even in the right line.',
      'I could leave. I\'m not going to leave. But I could.',
      'The waiting is somehow the easiest part.',
      'I\'ve been here before. Or somewhere like it. Existentially.',
    ],
    ORDER: [
      'Is any color truly the right one? Ugh. That one.',
      'I\'ve thought about this for weeks. Probably wrong.',
      'If I hate it, what does that say about me?',
      '{color}. I picked this because I couldn\'t decide. Which is a decision.',
      'I measured the wall six times. I still don\'t know if a gallon is enough.',
      'What if the color is right but the room isn\'t?',
      'Buyer\'s Remorse is the most honest name for a paint color I\'ve ever seen.',
      'Acceptable Melancholy. My therapist would have thoughts about this.',
      'I\'ll probably repaint in six months. I always repaint in six months.',
      'I need you to tell me this is the right choice. You don\'t have to mean it.',
      'Second Thoughts. Already having them. And I just walked in.',
      'What does it mean that I feel relief and dread at the same time?',
      'The Unresolved. Yes. That\'s exactly where I am right now.',
      'Just... give me a second. Okay. Okay I\'m ready.',
      'What if the lighting at home is completely different? It always is.',
    ],
    PICKUP: [
      'Now I have to live with this. Wonderful.',
      'It\'s done. No turning back. Okay. Okay.',
      'I\'ll regret this by Tuesday, won\'t I.',
      'Thank you. I think. Yes. Thank you.',
      'There\'s no way to know until it\'s on the wall, and by then it\'s on the wall.',
      'I\'m going to open it at home and not open it again for three days.',
      'This is fine. Everything is fine. The color is fine.',
      'My apartment has been the same color for four years. Change is terrifying.',
      'If I don\'t like it I\'ll just... move.',
      'The weight of it. It\'s just paint. Why does it feel like a commitment.',
      'Okay. I chose this. I made a choice. That\'s growth.',
      '{color} in physical form. I\'m holding my whole situation.',
      'I appreciate you not asking if I\'m sure. I\'m not sure.',
      'Thank you. I\'m going to be fine. Probably.',
      'I\'m going to go home and stare at it until I feel something.',
    ],
  },

  contractor: {
    WAIT: [
      'Waiting.',
      'Quick as you can.',
      'Got a crew on the clock.',
      'Ready when you are.',
      'Clock\'s ticking.',
    ],
    ORDER: [
      'One can, the usual base. Let\'s move.',
      'I got three jobs today, make it quick.',
      'Just give me the gallon, no chit-chat.',
      'Whatever mixes fastest. I\'ve got a crew waiting.',
      'Client picked it. I wouldn\'t have picked it. One gallon.',
      'Don\'t need the bag. Don\'t need the receipt. Just the paint.',
      'Deep base, darkest tint. Bathroom, no natural light.',
      'I\'ve mixed worse. Let\'s go.',
      'Decisive Red. At least they know what they want.',
      'The name doesn\'t matter. The coverage matters.',
      'Got a full living room to do by Thursday.',
      'Good. Quick. Right. Those are my three requirements.',
      'White base. Good coverage in two coats? Never mind, not your problem.',
      'Last time this took twelve minutes. Let\'s beat that.',
      '{color}. Fine. One gallon.',
    ],
    PICKUP: [
      'Good. That\'s mine. Out of your way.',
      'Mixed right? Better be. Thanks.',
      'Perfect. On to the next site.',
      'Lid on tight? Good.',
      'Appreciate the speed.',
      'Did the shaker run a full cycle? Good.',
      'Thanks. Back Thursday.',
      'No streaks if mixed right. Should be fine.',
      'You run a tight operation here.',
      'Good color. Client\'s going to hate it. Not your problem.',
      'See you next week, probably.',
      'Exactly what I needed. Nothing more.',
      'Quick and right. That\'s all I ask.',
      'Tell whoever runs this place they\'re doing it correctly.',
      'Done. Next.',
    ],
  },

  chatty_regular: {
    WAIT: [
      'I love this place, it always smells so... painty?',
      'Did you paint in here recently? Something looks different.',
      'Oh! I meant to ask — do you sell rollers too?',
      'I\'m so glad you were open, I tried three places!',
      'Hi! Almost my turn! Exciting!',
    ],
    ORDER: [
      'Oh this is for the guest bath — long story!',
      'My sister HATED the last color, can you believe it?',
      'We\'re finally redoing the den, finally!',
      'I\'ve been coming here for years. Do you remember me? I had a green phase.',
      'My husband said pick whatever I want. That\'s not helpful.',
      'We had a whole argument about accent walls. I won. So here we are.',
      '{color}! My neighbor has something similar. Well, similar-ish.',
      'I saw this on a blog. Or maybe Instagram. One of those.',
      'The kids have opinions now. They\'re seven and eight. They have opinions.',
      'I\'m also picking up something for my mother. She doesn\'t know yet.',
      'Oh I love that it\'s called that. I\'m going to tell everyone the name.',
      'The contractors are coming Friday. This is for the contractors.',
      'Last time I was in here I talked to a woman named Shirley. Is she here?',
      'Lawn Envy! My lawn IS enviable, so I feel seen by this name honestly.',
      'I feel like we\'ve met before. No? Different person? That\'s fine too.',
    ],
    PICKUP: [
      'Wait till my husband sees this, he\'ll faint!',
      'You\'re a lifesaver, truly, we should get coffee.',
      'I\'ll send you a photo when it\'s up, promise!',
      'Oh it\'s heavier than I thought. Good heavy though.',
      'My sister is going to be so jealous. She should be!',
      'Thank you so much. You have no idea what this weekend was like.',
      'I\'m going to hug you. I\'m not actually going to. But spiritually.',
      'Can I ask your name? For when I tell this story later.',
      'You know, this job seems really satisfying. Is it? It seems like it would be.',
      'I\'ll leave you a review. A good one, obviously.',
      'Okay I have to run but I\'ll be back next month for the mudroom.',
      'The mudroom is a whole other project. I won\'t get into it now.',
      'The den is going to look incredible. I just know it.',
      'Should I tip? Can you tip at a paint counter? Asking for me.',
      'Bye! Thank you! You\'re wonderful! Okay bye!',
    ],
  },
};

export function pickPersona() {
  return PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Returns a spoken line immediately — synchronous, no loading state.
// {color} in a line is replaced with the order's colorName.
export function generateLine(persona, phase, order) {
  const line = pick(CANNED[persona.id][phase]);
  return order ? line.replace('{color}', order.colorName) : line;
}
