// Customer cast — every character is a three-beat bit:
// lines: [order intro, escalation/weird detail, impatient (in character)]
// {color} in any line is replaced with the actual paint color name at display time.

export interface CustomerCharacter {
  lines: string[]; // [intro, funny/niche, impatient] — shown in sequence per visit
}

export const CUSTOMERS: CustomerCharacter[] = [

  // ── TRADES ──────────────────────────────────────────────────────────────
  { lines: ['Deep base. Don\'t care what it\'s called. It\'s going on a ceiling.', 'The client named her ceiling. It has a name. I\'m not saying the name.', 'My guys are eating lunch in the truck. It\'s 9 AM. That\'s a threat.'] },
  { lines: ['{color}, one gallon, and whatever you do, don\'t ask me if I\'m excited about it.', 'I\'ve painted four thousand rooms. I felt something once, in 2011.', 'The drywall guy beat me here. The drywall guy has never beaten me anywhere.'] },
  { lines: ['Gallon of {color}. The client picked it off a napkin. An actual napkin.', 'I color-matched a napkin with coffee on it once. The coffee part came out great.', 'I bill by the job, but I resent by the minute.'] },
  { lines: ['White. Trim white. Not warm white, not cool white. Trim. White.', 'Last week a homeowner asked for "white, but whiter." I quoted her double.', 'I have a ladder on my truck making everyone in this parking lot nervous.'] },
  { lines: ['{color} for a nursery. The parents want zero VOC and zero opinions from me.', 'The baby will repaint it black in fifteen years. I\'ve seen the whole cycle.', 'I\'ve got three more nurseries this week. There was a blackout last winter, I assume.'] },
  { lines: ['One gallon, eggshell. I\'m fixing another painter\'s work. Again.', 'He taped nothing. NOTHING. There\'s ceiling paint on a doorknob. HOW.', 'Every minute I\'m here, his mistakes remain on that wall. Winning.'] },
  { lines: ['Deep base, and I need it shaken like it owes you money.', 'A badly shaken can separated on me in \'19. I still see the swirls when I close my eyes.', 'The shaker\'s right there. I can hear it not shaking my paint.'] },
  { lines: ['{color}. It\'s for a garage floor. Yes, this specific fancy color. For a floor. Rich people.', 'The car that parks on it costs more than my house. The floor should dress accordingly.', 'The client tracks my location. Not the job. Me. Personally.'] },

  // ── DESIGN WORLD ─────────────────────────────────────────────────────────
  { lines: ['The client wants {color}. I want a vacation. We\'re both getting the paint.', 'I showed her sixty swatches. She picked the first one. Sixty. Swatches.', 'I have a consult at two with a couple who "love color" and own a gray house.'] },
  { lines: ['I need {color} but it has to whisper, not shout. Can paint whisper? It has to.', 'My last client said a wall was "yelling" at her. I repainted it two percent grayer. She sleeps now.', 'My phone has 41 unread texts and they are all about one bathroom.'] },
  { lines: ['{color} for a "moody library." No books. They have no books. Moody empty shelves.', 'They asked me to buy books by the foot. Seventy feet of books, in "greens and tans."', 'The bookless library must be done by Friday. The emptiness has a deadline.'] },
  { lines: ['I\'m matching {color} to a throw pillow that has been discontinued. My white whale.', 'I found the pillow on a resale site for $400. I paid it. Business expense. Emotional expense.', 'Every designer in this city is after my sources. Nobody wait behind me.'] },
  { lines: ['A warm white. I have brought light bulbs. We are going to test this properly.', 'Last time I trusted a store\'s lighting, a client\'s hallway went full margarine.', 'I can stand here holding a light bulb all day. I\'ve done it before.'] },
  { lines: ['{color}. It\'s for a gallery wall. The frames are the art. The wall is also the art. Everything is the art.', 'The actual paintings? Placeholder prints. Have been for two years. Don\'t tell anyone.', 'The homeowner thinks I know a famous artist. I need to leave before that unravels.'] },

  // ── HOMEOWNERS ON A JOURNEY ─────────────────────────────────────────────
  { lines: ['First house. First paint. First everything. {color}. Is that... how does buying work.', 'The inspector said "good bones" and my realtor said "good bones" and last night I heard the bones.', 'My dad arrives Saturday to "help." I need to be done before the helping starts.'] },
  { lines: ['We compromised on {color}. By compromised, I mean I lost.', 'She has a Pinterest board named "OUR home" and I am not on it.', 'She just texted "any updates?" It has been eleven minutes since I left.'] },
  { lines: ['I need {color} to cover what I can only describe as a crime-scene accent wall.', 'The previous owner painted it the color of a tongue. A wall. The color of a tongue.', 'Every day that wall exists, I lose a little more. Please.'] },
  { lines: ['We just closed! Everything is beige and we hate beige with our whole hearts!', 'Seven rooms of beige. The closets: beige. The garage: beige. The beige has beige.', 'The moving truck arrives in four days. The beige dies today.'] },
  { lines: ['One gallon of {color}. My wife saw it in a dream. I\'m not joking. A dream.', 'She described it to a guy at another store and he cried a little. He didn\'t have it either.', 'If this isn\'t the dream color, I return at dawn. This is my life now.'] },
  { lines: ['The HOA rejected my last three colors. This is round four. {color}. Pray.', 'The HOA president has a flagpole and binoculars. Draw your own conclusions.', 'The approval window closes Friday at five. Her window. She watches from it.'] },
  { lines: ['I\'m painting over my ex\'s "signature wall." He signed it. In paint. His name.', 'Two coats might not be enough. Emotionally. Structurally it\'s fine.', 'His name is still visible from certain angles and all of them are my couch.'] },
  { lines: ['Landlord said "any neutral." {color} is neutral if you don\'t turn the lights on.', 'The lease says neutral. It doesn\'t define neutral. I have a lawyer friend. We\'ve talked.', 'My security deposit was already doomed. This is about principle.'] },

  // ── PROFESSIONALS BRIEFLY ESCAPING THEIR LIVES ──────────────────────────
  { lines: ['I\'m a surgeon. This is the least precise thing I will do all week. I love it.', 'A wall doesn\'t have family members waiting for updates. Incredible. No stakes at all.', 'I\'m due back at four. If my pager goes off in this line, we all pretend it didn\'t.'] },
  { lines: ['ER nurse. I have painted one wall a year for six years. It\'s cheaper than therapy.', 'This year\'s wall earned it. This year\'s wall saw things.', 'I\'ve waited in worse triage than this. You\'re doing fine. Move it along though.'] },
  { lines: ['I\'m an accountant and it\'s April 16th. {color}. It\'s happening. I\'m alive.', 'I have not seen my kitchen in daylight since January. I hear it\'s nice.', 'I have exactly one day of joy budgeted. This errand is 40% of it.'] },
  { lines: ['I teach middle school. It\'s summer. {color} for MY room. Not their room. MINE.', 'A child once glued his own head to a desk in my classroom. My bedroom will know peace.', 'August is coming. Every minute in this line, September breathes down my neck.'] },
  { lines: ['I\'m a pilot. My house is beige because I\'m never in it. Today the beige falls.', 'I\'ve seen the sunrise from 40,000 feet a thousand times. My bedroom faces a fence.', 'I have a four-hour window before a red-eye. This is minute nine.'] },
  { lines: ['Lawyer. The firm said paint the office "something trustworthy." {color} it is.', 'I once won a case partly because opposing counsel\'s Zoom wall was chartreuse. I believe this.', 'I\'m billing a client for this errand under "matter preparation." Speed helps us both.'] },
  { lines: ['I\'m a therapist. My waiting room needs to say "you\'re safe" but also "we start on time."', 'A client once told me my old wall color felt "passive-aggressive." The wall. Passive-aggressive.', 'I\'m not impatient. I\'m noticing feelings of urgency and honoring them.'] },
  { lines: ['Meteorologist. Sixty percent chance I love {color}, and I\'ve never been more certain.', 'People scream at me about rain like I invented it. The wall will not scream.', 'There\'s a system moving in Thursday. My painting window is real and closing.'] },
  { lines: ['I\'m a food scientist. {color} is scientifically the most appetizing wall color. Fight me.', 'There\'s a wavelength that makes people hungrier. This is adjacent to it. My dinner parties will be legendary.', 'I have a soufflé timeline that this errand is currently inside of.'] },
  { lines: ['Software engineer. I wrote a script to pick this color. It chose {color}. I\'m scared of it.', 'The script also flagged my current wall as "deprecated." It\'s not wrong.', 'I told my standup I was "blocked on a dependency." You\'re the dependency.'] },

  // ── THE INTERNET-ADJACENT ────────────────────────────────────────────────
  { lines: ['I need {color} for my stream backdrop. Chat voted. I hate it. Democracy is a mistake.', 'Chat also voted to name my cat "Cat." I have 40,000 bosses and no help.', 'I go live in three hours and the wall needs two coats. Math is not mathing.'] },
  { lines: ['This wall is for content. The other walls are for living. {color} is for the content wall.', 'My last apartment tour got 2 million views and one comment: "wall kinda mid." So here I am.', 'The algorithm rewards consistency. I post at six. The algorithm doesn\'t care about dry time.'] },
  { lines: ['My podcast studio needs {color}. It\'s an audio podcast. I\'m aware. I\'m AWARE.', 'We have four listeners and a video setup. One listener is my mom. Two are my aunts.', 'We record tonight. Episode 340. The wall debuts to literally no one. It must be perfect.'] },
  { lines: ['I got this color off an AI. It said {color} matches my "aura." I\'m testing the machine.', 'The AI also said my current wall was "a cry for help." The machine is bold.', 'If the robot is right about the paint, I have to reevaluate several arguments I\'ve lost with it.'] },

  // ── HOBBYISTS OF INTENSITY ───────────────────────────────────────────────
  { lines: ['{color} for my game room. It must feel like a tavern in a world that doesn\'t exist.', 'My players complained the ambiance was "off." They eat string cheese over my rulebooks.', 'Session zero of the new campaign is Friday. The tavern opens on time.'] },
  { lines: ['I paint tiny soldiers. Thousands of them. Today, for once, I\'m painting something BIG.', 'I have 47 shades of gray at home in bottles the size of your thumb. This gallon terrifies me.', 'A roller. Look at this thing. It\'s a brush for GIANTS. Let\'s go, I\'m ready.'] },
  { lines: ['The listening room needs {color}. The vinyl demands warmth. The vinyl has spoken.', 'A man on a forum said this color "tightens the bass." He\'s insane. I believe him completely.', 'A record I waited eight months for arrives today. The room must be worthy.'] },
  { lines: ['My garage gym needs a color that says "get up." Current color says "lie back down."', 'I PR\'d my deadlift the day after painting my old gym. The paint lifts. This is settled science.', 'Rest day ends in 40 minutes. Then it\'s leg day and paint day. Both. I\'m built different.'] },
  { lines: ['Beekeeper. The honey shed gets {color}. The bees voted by not stinging me near the swatch.', 'Bees see ultraviolet. My shed is apparently gorgeous in a spectrum I\'ll never know. Humbling.', 'The bees don\'t rush. I don\'t rush. And yet: the smoker\'s lit, so actually, small rush.'] },
  { lines: ['My model train town needs a sky. A whole ceiling of sky. {color} is the sky now.', 'The town is called Willardsville. Population: 61 tiny people who\'ve never seen weather. Until now.', 'The mayor of Willardsville is a thumb-sized man named Gerald and even HE thinks I\'ve overthought this.'] },
  { lines: ['I restore a \'72 coupe. The garage walls must not upstage her. {color}. Supporting role only.', 'My wife calls the car "the other woman." The other woman gets a nicer room than us. Correct.', 'The car show is in three weekends and the shop needs two coats and I need one miracle.'] },

  // ── PERSONALITY DISORDERS OF THE PAINT AISLE ────────────────────────────
  { lines: ['I\'ve narrowed it to {color}. From a field of ninety-one. It took a season of my life.', 'I have a spreadsheet with a tab called "FINAL." There are nine tabs called "FINAL."', 'Do not show me another option. I am one swatch away from starting over. Protect me.'] },
  { lines: ['{color}, and before you ask: yes I\'m sure. Don\'t look at me like that. I\'M SURE.', 'I returned paint twice last month. The clerk started a punch card as a joke. Four punches.', 'Sell it to me fast, before the doubt finds me. It always finds me.'] },
  { lines: ['I wasn\'t going to paint anything today. Then I saw {color} through the window. So.', 'I own five unopened gallons from five previous moments exactly like this one.', 'My partner instituted a 24-hour waiting period for paint. What they don\'t know is I\'m here.'] },
  { lines: ['What\'s the toughest paint you have. Not the prettiest. The TOUGHEST.', 'I have three sons. My walls have taken damage that violates the Geneva Conventions.', 'They\'re home alone right now. Every second here is a second the walls are undefended.'] },
  { lines: ['One gallon of your most aggressively normal color. I\'m re-selling the house. Nobody dream here.', 'My realtor said my current colors are "a journey buyers won\'t take." My house is TOO interesting.', 'Open house Sunday. By then this home must have the personality of a saltine.'] },
  { lines: ['{color}. My neighbor painted his fence and suddenly it\'s the Sistine Chapel over there.', 'He gave a TOUR. Of a FENCE. People clapped.', 'He starts his garden wall Saturday. I will not live in the shadow of Frank\'s renaissance.'] },
  { lines: ['White. Just white. All white. My whole life is white now. It\'s called minimalism, look it up.', 'I own one chair. My guests sit on the floor. My guests stopped coming. More room for the chair.', 'This transaction has too many steps already. One color. One can. One nod. Go.'] },
  { lines: ['I want the ceiling {color}, the trim in something angrier, and an accent wall that bites.', 'A minimalist influencer told me my living room was "a lot." I added a chandelier that same day.', 'I have four more stores to visit. My vision is vast and no one van can hold it.'] },

  // ── LIFE EVENTS, HANDLED VIA PAINT ──────────────────────────────────────
  { lines: ['We got engaged Saturday! We\'re painting the bedroom {color}! We\'ve never disagreed about anything!', 'We registered for paint. Is that weird? Our friends say it\'s weird. Our friends have beige everything.', 'The engagement party is at OUR place in two weeks. Everything must scream "us." Lovingly.'] },
  { lines: ['The divorce is final and this gallon of {color} is the first decision no one can veto.', 'He said bold colors were "a lot." You know what was a lot, Kevin? The audit.', 'I have waited four years and two mediations for this wall. I can wait five more minutes. Barely.'] },
  { lines: ['Baby\'s due in six weeks. The nursery needs {color} and I need to sit down.', 'We read that babies see high contrast. Then we read they don\'t care. Then we cried a little. Hormones.', 'The baby doesn\'t know about deadlines but the baby IS one.'] },
  { lines: ['Kid left for college. I walked into his room with a roller the same afternoon. Don\'t judge me.', 'Eighteen years of "don\'t touch my stuff." The stuff is in a bin, sweetie. The walls are MINE.', 'He calls Sunday. The room must be unrecognizable by then. It\'s about the bit.'] },
  { lines: ['I retired Friday. By Monday I had opinions about paint. This is what they warned me about.', 'I managed 200 people for thirty years. Now I manage one hallway. The hallway is behind schedule.', 'I have nothing but time. That\'s the problem. I can FEEL the nothing. Hurry.'] },
  { lines: ['New city, new apartment, don\'t know anyone. But this wall? This wall\'s about to be {color}.', 'I introduced myself to a neighbor and panicked and said "I\'m painting." That\'s all. Just "I\'m painting."', 'The wall is currently the only friend I\'ve made and it\'s about to get a makeover.'] },

  // ── THE STORE-AWARE ──────────────────────────────────────────────────────
  { lines: ['Who names these colors? {color}? Who hurt the person who wrote that?', 'There\'s a color on that wall called "Second Thoughts." For a HOME. You paint your home in doubt.', 'I\'ve been reading your color names for twenty minutes. I came in for primer. Look what you\'ve done.'] },
  { lines: ['I want the color named {color} purely because of the name. Don\'t care what it looks like.', 'I once bought "Regrettable Burgundy" as a joke. Joke\'s on me. It was gorgeous. I learned nothing.', 'If the can doesn\'t say the name in big letters I\'m going to need a marker.'] },
  { lines: ['The shaker in the corner sounds like it\'s dying. I say this with love. And concern.', 'I come here mostly for the sounds, honestly. The shaker, the hammer, the little beeps. ASMR with a receipt.', 'I\'ll wait. But know that I\'m listening to everything and rating it.'] },
  { lines: ['My contractor said "go to the paint place, they\'ll know." So. Do you know? He believes in you.', 'He wrote "the blue one, but grayer, she\'ll know it when she sees it" on a napkin. I have the napkin.', 'He\'s on my roof RIGHT NOW. Unsupervised. Time is of the essence.'] },

  // ── ANIMALS' HUMANS ─────────────────────────────────────────────────────
  { lines: ['My dog ate a hole in the drywall. The patch needs {color}. The dog feels no remorse.', 'The vet said the drywall "isn\'t nutritionally concerning." Great. My WALL is concerning.', 'He\'s home alone. There are three more walls. You understand.'] },
  { lines: ['The cat knocked a full can off a shelf. I need one gallon and a new relationship with that cat.', 'The splatter is actually... kind of beautiful? No. NO. I\'m not letting the cat win.', 'She\'s planning something else. I can feel it from here. Cats know when you\'re away.'] },
  { lines: ['I\'m painting the bird room. Yes, the bird has a room. {color}. The bird prefers warm tones.', 'The parrot learned to say "nice wall" sarcastically. I didn\'t teach it sarcasm. It came factory-installed.', 'If I\'m gone too long he starts imitating the smoke alarm. For fun. Please hurry.'] },
  { lines: ['The aquarium wall needs {color}. The fish deserve a backdrop. They\'ve been through a lot.', 'We lost Gerald the pleco in March. The tank hasn\'t felt the same. A refresh honors him.', 'The new fish arrive Thursday. They will know a beautiful home. Gerald never got that.'] },

  // ── PURE CHAOS AGENTS ────────────────────────────────────────────────────
  { lines: ['I lost a bet. The bet was about geography. The wall will be {color}. I\'d rather not elaborate.', 'I said Portugal borders France with my WHOLE CHEST at trivia night, in front of everyone I love.', 'My roommate is at home with the roller and a smug little smile. Let\'s get this over with.'] },
  { lines: ['I\'m painting one wall {color} at 2 AM tonight while my family sleeps. It\'s a surprise. Probably fine.', 'Last surprise project was a hole for a fish pond. We don\'t have a pond. We have a covered hole.', 'The window of surprise closes at dawn. The paint and I have an appointment with destiny.'] },
  { lines: ['My book club is painting our host\'s den as an intervention. She knows. She\'s the one who asked. Sort of.', 'We\'ve read one book in two years. We\'re really more of a renovation cell now.', 'Eight women with strong opinions are in a den right now with no paint. Think about that.'] },
  { lines: ['I need {color} to finish a mural of my landlord as a Renaissance duke. Long story. He loves it.', 'It started as a joke. Then he saw the sketch and said "make my hands bigger." We\'re in deep now.', 'He\'s withholding January rent as "patronage." The duke must be finished by the first.'] },
  { lines: ['I\'m painting my half of the duplex {color}. Exactly my half. To the property line. To the INCH.', 'Dave knows what he did.', 'Dave is watching from his window right now. Bag the can, please. He doesn\'t get to know the color.'] },
  { lines: ['This is for a community theater set. The play is set inside a whale. Don\'t ask me anything else.', 'The director said "the whale is a metaphor." The budget is $40. The metaphor better be cheap.', 'Tech rehearsal is tonight. An actor is currently inside an unpainted whale. Go.'] },
  { lines: ['I\'m repainting the break room before corporate visits. The current color is "morale hazard" gray.', 'An auditor once described our break room as "the saddest place on the campus." We have a gym.', 'Corporate lands at nine tomorrow. The wall dries in four hours. You do this math.'] },
  { lines: ['My grandmother demands {color} for her sunroom and she has outlived three contractors who argued.', 'She\'s 96. Her last painter suggested an alternative. We don\'t know where he is now. Kidding. Mostly.', 'She\'s in the car. If I\'m not out in ten minutes she WILL come in, and no one wants that.'] },
  { lines: ['I\'m painting my home office to look exactly like my Zoom background. Ending the lie after four years.', 'My coworkers think I have a bookshelf and a plant. The plant lie ends today too. Buying a fern after this.', 'I have a meeting at three, and for the first time, the background will be REAL.'] },
  { lines: ['The escape room needs {color} for the new chamber. Theme: "1970s basement." Terrifying on purpose.', 'Customers keep escaping too fast. The new room\'s puzzle is emotional unavailability.', 'We\'re booked solid this weekend. The basement must ripen by Friday.'] },
  { lines: ['One gallon of {color}. It\'s for the doghouse. He\'s seen our house. He has expectations now.', 'We renovated last year and the dog toured the whole thing like an inspector. He knows quality.', 'He\'s a good boy with a discerning eye and winter is coming.'] },
  { lines: ['My mother-in-law visits in nine days. She has never once commented on our walls. This ends now.', 'Last visit she said the hallway was "fine." FINE. I\'ve been rebuilding my life around that word.', 'Nine days. Two coats. One shot at a raised eyebrow of approval. Move.'] },

];

export function pickCustomer(): CustomerCharacter {
  return CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
}
