// ~1000 unique customer characters.
// lines: [order-related intro, funny/niche to character, impatient in-character]
// {color} in any line is replaced with the actual paint color name at display time.

export interface CustomerCharacter {
  lines: string[]; // [intro, funny/niche, impatient] — shown in sequence per visit
}

export const CUSTOMERS: CustomerCharacter[] = [

  // ── CONTRACTORS & TRADESPEOPLE ───────────────────────────────────────────

  { lines: ['Deep base, darkest tint, full bathroom. Let\'s move.', 'I watched a homeowner spend forty minutes between two whites. Both wrong anyway.', 'My crew\'s been in a parking lot for twenty minutes.'] },
  { lines: ['{color}. Client picked it. I wouldn\'t have. One gallon.', 'The name doesn\'t matter. Coverage matters.', 'Got three jobs today. This is now the slow one.'] },
  { lines: ['Gray base, semi-gloss, kitchen. Standard.', 'I can tell by the sheen if it was mixed right. Usually isn\'t.', 'I don\'t need small talk. I need paint.'] },
  { lines: ['White base, two gallons. Don\'t need a bag.', 'I repaint this same house every three years. Owner has terrible taste.', 'Clock is running. Not yours. Mine.'] },
  { lines: ['Gallon of deep base. Whatever tint is fastest.', 'Last apprentice I had called in sick on a tile day. Now I work alone.', 'If I miss this window I lose the whole afternoon.'] },
  { lines: ['One gallon, eggshell. Bedroom, north-facing, needs to pop.', 'I\'ve painted more square footage than you\'ve walked in your life, probably.', 'I\'m not trying to be rude. I just have somewhere to be.'] },
  { lines: ['Deep base. {color}. Accent wall, client is very specific.', 'Client wants it done before her mother visits. Her mother won\'t notice.', 'Been waiting since before you opened, pretty sure.'] },
  { lines: ['One gallon, flat finish, ceiling white. Quick.', 'The most expensive project I ever did used the cheapest paint. Still haven\'t told the owner.', 'My apprentice is sitting in the truck. He\'ll learn patience.'] },
  { lines: ['Gray base, satin, whole first floor. Four gallons eventually, starting with one.', 'I painted the inside of a lighthouse once. Very weird acoustics.', 'I have a 9 AM that\'s already a 9:30.'] },
  { lines: ['White base, semi-gloss. Trim and doors.', 'People always want to watch. Nobody ever wants to help.', 'I stop charging by the hour when I leave, so.'] },
  { lines: ['One can of the deep base. Client is doing a feature wall.', 'Feature walls were trendy, then gone, now back. I just paint them.', 'I billed her for travel time already. Be quick or I\'ll bill her again.'] },
  { lines: ['Gallon of eggshell white. Rental unit, nothing fancy.', 'Rental paint and primary home paint are the same paint. Don\'t let anyone tell you different.', 'The tenant moves in Thursday. Today is Tuesday.'] },
  { lines: ['Gray base, {color}. Master bath.', 'Bathroom jobs are always the last to get painted and the first to get criticized.', 'I have four bathrooms this week. You\'re bathroom two.'] },
  { lines: ['White base, satin. New construction touch-up.', 'I\'ve spent more time matching paint on new construction than actually painting.', 'Builder\'s breathing down my neck. Now I\'m breathing down yours.'] },
  { lines: ['One gallon flat. Living room, very tall ceilings.', 'Tall ceilings attract clients who want things done yesterday.', 'If I don\'t get up that ladder by noon I lose the light.'] },
  { lines: ['Two gallons white. Apartment flip.', 'White. Every time. Sell faster, they say. They\'re right.', 'New owners want possession Friday. It\'s Wednesday.'] },
  { lines: ['{color}. Garage floor paint, actually — wrong department, I know.', 'I\'ve never met a homeowner who didn\'t underestimate how much garage floor they have.', 'I\'m in the wrong place but I\'m here now.'] },
  { lines: ['Gray base. One gallon. Exterior accent.', 'Exterior jobs mean the weather decides more than the client does.', 'Rain\'s coming Thursday. Need to be done Wednesday.'] },
  { lines: ['White base. It\'s for the stairwell. A stairwell, yes.', 'Stairwells are the worst. No room, weird angles, everyone walking through.', 'The family has been using the back door for three weeks. Today is the day.'] },
  { lines: ['Deep base, one gallon. Kid\'s room, very opinionated eight-year-old picked it.', 'I\'ve painted murals, feature walls, a chalkboard ceiling. Never again on the ceiling.', 'The kid gets home from school at 3. I need to be done by 2:30.'] },

  // ── INTERIOR DESIGNERS ──────────────────────────────────────────────────

  { lines: ['The client requested {color}. Between us, I\'d have gone warmer.', 'I lost a commission once because the client\'s dog growled at my swatch book. True story.', 'I have a consultation in forty minutes across town.'] },
  { lines: ['{color} for the living room. We\'re pairing it with natural linen and aged brass.', 'Aged brass is having a moment. It was having a moment five years ago too. Moments are long.', 'My client texts me every twelve minutes. I need to have answers.'] },
  { lines: ['Deep base for the library wall. Floor to ceiling shelves, very moody.', 'People always want libraries now. Nobody reads, but they want the room.', 'The photoshoot is Saturday. The wall needs to be dry by Friday.'] },
  { lines: ['I need something that reads as blush but isn\'t technically pink. You know?', 'Clients say "not pink" and then show me something very pink on their phone.', 'I have four clients on hold right now. Literally, on a call, on hold.'] },
  { lines: ['White for the whole unit. But a warm white. Specific warm white.', 'Warm whites and cool whites have ended more client relationships than any other design decision.', 'I should have become an architect. Architects blame the engineers.'] },
  { lines: ['{color}. The client found it on a blog from 2019. We found it.', 'Everything eventually becomes a tile or a paint color. Everything.', 'The install crew is already there. I\'m fetching paint. This is my life now.'] },
  { lines: ['Gray base. But a green-gray. I\'ll know it when I see it mixed.', 'I once had a client return paint three times. She now hires a different designer.', 'My schedule is already a fiction. Let\'s not add to it.'] },
  { lines: ['Deep base for the entryway. First impression matters enormously.', 'I have clients who\'ve repainted their entryways six times. I don\'t judge. I invoice.', 'The contractor finishes the plaster today. I need to be right behind him.'] },
  { lines: ['Satin for the dining room. {color}.', 'Satin in a dining room catches candlelight better. I tell clients this. It\'s true.', 'Dinner party is Friday. I need the room to be done by Thursday.'] },
  { lines: ['One gallon. Testing a color before I commit the whole room.', 'I have a rule: never commit without a test swatch. Clients hate this rule until they\'re glad they followed it.', 'I\'ve been testing for three weeks. My client is starting to notice.'] },

  // ── HOME STAGERS ────────────────────────────────────────────────────────

  { lines: ['White base. Listing goes live Thursday. Everything must be neutral.', 'I once staged a home that sold in four hours. The sellers cried. I did not. I billed.', 'Photographer arrives tomorrow morning at 9.'] },
  { lines: ['{color}. One wall in the primary suite. Draws the eye.', 'The trick is to make the buyer think they already live here before they sign anything.', 'We\'re on market Friday. I have four properties after this one.'] },
  { lines: ['Light gray, satin. All the main spaces. Neutral sells.', 'Staging is theater. The paint is the backdrop. Nobody notices it until it\'s wrong.', 'The sellers are still living in the house. No, they should not be there when I\'m there.'] },

  // ── ARCHITECTS ──────────────────────────────────────────────────────────

  { lines: ['I specified {color} in the drawings. The contractor sent me here instead of ordering it.', 'I spent fourteen years learning to specify exactly what I want. And yet.', 'The site meeting is in two hours and I\'d like to have paint in hand.'] },
  { lines: ['White base. The whole structure is white. It\'s a principle.', 'The clients wanted color. We talked them out of it. They\'re grateful now.', 'I have five projects open right now and this is somehow the most immediate.'] },
  { lines: ['Deep base, one gallon. The utility core is getting an accent treatment.', 'People think architects only care about form. We care about form and finish.', 'I\'ve been waiting patiently. Patiently is almost over.'] },

  // ── NEW HOMEOWNERS ──────────────────────────────────────────────────────

  { lines: ['I just bought my first house and {color} feels like the right start.', 'I measured the room four times. I\'m still not confident about the gallon math.', 'My parents are coming to help me paint this weekend. They\'re already judging my color choice.'] },
  { lines: ['We close Friday and I want to paint before we move in. Is that crazy?', 'Everyone says paint before you move in. Nobody says when to buy the paint before you close.', 'The movers are booked for Saturday. Today is Wednesday. Math is hard.'] },
  { lines: ['First house. {color} for the kitchen. I\'ve been staring at swatches for a month.', 'I didn\'t expect homeownership to feel like a series of decisions you didn\'t know you were making.', 'The kitchen is the first room and it needs to be done first. Philosophically.'] },
  { lines: ['We bought a fixer-upper. This is the first of many trips, I think.', 'Fixer-upper means the inspection found twelve things and we pretended that was fine.', 'My spouse is at home currently discovering the third thing we didn\'t know was wrong.'] },
  { lines: ['White base. Brand new condo. I want it to feel like mine.', 'The previous owner painted everything beige. Every wall, every ceiling. Even the closets.', 'I have a painting party tomorrow. My friends think it\'ll be fun. It won\'t be.'] },
  { lines: ['We bought a Victorian. Everything is going to be {color}, eventually.', 'The Victorian has eight rooms. I came in for one gallon and I\'ll be back seven times.', 'My contractor said "good bones." I\'m learning what that means.'] },
  { lines: ['Light gray for the nursery. Baby\'s not here yet but the walls are.', 'We didn\'t find out the sex so we went with a gender-neutral gray. Very deliberate.', 'The due date is in three weeks. Please understand my situation.'] },
  { lines: ['We\'re finally painting. We\'ve lived here two years with builder beige.', 'Two years of planning and we landed on {color}. It feels like it took that long.', 'We have six gallons to do. This is the last one, I promise myself.'] },
  { lines: ['It\'s a rental we just bought. Current tenants move out Friday. New ones move in Monday.', 'Owning a rental is passive income, they said.', 'I have roughly 56 hours to make this place look like a different place.'] },
  { lines: ['This is my first time buying paint. I think I\'m doing this right?', 'Online reviews say one gallon covers 400 square feet. My room is 160. Is one gallon too much?', 'I borrowed my neighbor\'s ladder. She wants it back tonight.'] },

  // ── EMPTY NESTERS ───────────────────────────────────────────────────────

  { lines: ['My last kid left for college. We\'re repainting everything. Starting with {color}.', 'Three kids, three rooms, three decades of "I don\'t like that color." Gone.', 'We\'ve earned this. Twenty-two years. We get to choose the color now.'] },
  { lines: ['The bedroom has been beige since 1998. Not anymore.', 'My husband doesn\'t care what color it is as long as he doesn\'t have to help.', 'I have the whole week to myself for the first time since the Clinton administration.'] },
  { lines: ['We\'re turning the playroom into an office. {color} it is.', 'The playroom has been a playroom for twenty years. I\'m not sentimental. Mostly.', 'I have time now. This is me having time. It still feels weird.'] },

  // ── RECENTLY DIVORCED ───────────────────────────────────────────────────

  { lines: ['Paint is the first thing I\'m changing. {color}. My choice. Only mine.', 'She hated color on walls. I love color on walls. I have walls now.', 'I\'ve been waiting to do this for seven years. A few more minutes is fine.'] },
  { lines: ['Everything is getting repainted. Everything. I\'m starting fresh.', 'The house is mine in the settlement. I\'m repainting it the way I always wanted.', 'My attorney took long enough. I can wait.'] },
  { lines: ['He kept the furniture. I kept the house. I\'m redecorating.', '{color} for the bedroom. He hated bold colors. He doesn\'t live here.', 'I have nowhere to be. This is a treat I\'m giving myself.'] },

  // ── RECENTLY RETIRED ────────────────────────────────────────────────────

  { lines: ['I have literally all the time in the world. But I still want to get this done today.', 'Forty years in finance. I\'ve earned a wall the color I want.', 'I\'m not in a rush. But I am in a very light rush.'] },
  { lines: ['My wife gave me a project list. Paint is item three. I finished items one and two this morning.', 'Retirement is very much like having homework, but the homework is your house.', 'I\'m moving at a leisure pace. An efficient leisure pace.'] },
  { lines: ['{color} for the sunroom. I\'m going to sit in it all day and I want it to be exactly right.', 'I spent my career optimizing other people\'s things. Now I optimize my sunroom.', 'I\'m not pressed for time. I\'m just... present.'] },

  // ── NEW PARENTS ────────────────────────────────────────────────────────

  { lines: ['Nursery. {color}. We\'ve deliberated for three months.', 'The baby has opinions already. Somehow. About the crib. Imagine what\'s coming.', 'My wife sent me because I kept second-guessing colors at home. Same thing is happening here.'] },
  { lines: ['I\'m on paternity leave and painting the nursery counts as leave, right?', 'The baby doesn\'t care about the color. We know this. We care anyway.', 'She\'s napping. I have approximately ninety minutes.'] },
  { lines: ['Light green for the nursery. Calming. We read about calming.', 'We read everything. So much. There are contradictory studies about nursery color.', 'The baby doesn\'t sleep and I haven\'t either and I just need the paint.'] },

  // ── DOCTORS ────────────────────────────────────────────────────────────

  { lines: ['I\'m between rounds. My wife texted me {color} and I\'m getting it.', 'I\'ve made decisions today that actually mattered. This is a relief.', 'I have twenty minutes before I need to be back. The universe allows twenty minutes.'] },
  { lines: ['White walls at work. White walls at home was starting to feel clinical.', 'My therapist suggested something in the "warm spectrum" for the bedroom. So here I am.', 'I got paged twice in the parking lot. Still here. Committed.'] },
  { lines: ['I\'m a pediatrician. I wanted the waiting room to feel warmer. {color}.', 'Children respond to color. Adults pretend they don\'t.', 'I have six appointments after this. I scheduled this like a procedure. Fifteen minutes.'] },

  // ── NURSES ─────────────────────────────────────────────────────────────

  { lines: ['Night shift. I\'m painting on my day off. This is what days off look like now.', 'I care for people all night. My house gets to be cared for too.', 'I drove here on three hours of sleep. Please don\'t make me wait long.'] },
  { lines: ['{color} for the living room. I\'ve been looking at it for six months.', 'I\'m very patient with difficult situations. I have less patience for paint stores, somehow.', 'I work twelve-hour shifts. I\'m home for the next forty-eight. This gallon matters.'] },

  // ── TEACHERS ───────────────────────────────────────────────────────────

  { lines: ['Summer project. {color}. I\'ve been planning this since March.', 'I graded two hundred essays this year. I deserve a bedroom I love.', 'Summer is eleven weeks. Week one is mine. I\'m using it well.'] },
  { lines: ['I\'m repainting my classroom. The school approved the color. Eventually.', 'It took three committee meetings to approve paint. That\'s public education.', 'The custodian is waiting for me. I\'m causing a scheduling problem.'] },
  { lines: ['{color} for the kitchen. A teacher\'s salary means I do this myself.', 'I teach twelve-year-olds to be human. I can figure out paint.', 'I\'m on a prep period. Forty-two minutes left. I did the math.'] },

  // ── LAWYERS ────────────────────────────────────────────────────────────

  { lines: ['My firm is renovating. I said I\'d handle the paint since I was passing by.', 'I bill four hundred an hour. Choosing paint should take four minutes.', 'Every minute I spend here is a minute I\'m not billing. Do with that what you will.'] },
  { lines: ['{color}. My office. I negotiated the color into my lease. It\'s in writing.', 'I have the contract right here if you want to read the clause about wall paint.', 'I have a deposition at two. I\'m not missing the deposition.'] },
  { lines: ['Home office needs to look authoritative. Something deep. {color} perhaps.', 'I once argued a case via Zoom from a room painted seafoam green. I still won.', 'I\'m billing this errand as "client development." Functionally.'] },

  // ── ACCOUNTANTS ────────────────────────────────────────────────────────

  { lines: ['It\'s April. This is the first non-work thing I\'ve done since January.', 'Paint, unlike taxes, has no extensions. I\'m at your mercy.', 'I\'m doing this before I talk myself out of it with a cost-benefit analysis.'] },
  { lines: ['{color}. I modeled four scenarios. This had the best long-term ROI on resale.', 'I have a spreadsheet for this. Four tabs. Don\'t worry about it.', 'I promised myself I\'d stop doing spreadsheets for personal decisions. I didn\'t.'] },

  // ── PROGRAMMERS ────────────────────────────────────────────────────────

  { lines: ['My apartment has been the same since I moved in. I\'m fixing that. {color}.', 'I wrote a script to compare paint colors. It recommended this one.', 'I\'ve been in a rabbit hole of color theory forums for a week. Just tell me if this is a good choice.'] },
  { lines: ['White walls everywhere. My home office looks like a data center.', 'I spend twelve hours a day looking at a screen. I should own at least one good wall.', 'I have a PR open that\'s been in review for three days. I\'m channeling that energy here.'] },
  { lines: ['{color}. My pair programmer voted against it. I overrode.', 'We do democratic decisions at work. I don\'t do democratic decisions at home.', 'My standup is in thirty minutes. I\'m going to be in the parking lot. It\'s fine. It\'s remote.'] },

  // ── DESIGNERS (GRAPHIC/UX/PRODUCT) ──────────────────────────────────────

  { lines: ['I have very strong opinions about this. {color} is correct. I know this.', 'I spent ten years making color decisions for other people\'s brands. My walls can be whatever I want.', 'I can\'t leave until this is done. It would bother me in a way I can\'t explain.'] },
  { lines: ['The hex value is #5C7A9B. Please tell me if that matches {color}.', 'I sent the hex to three people before coming here. Two said yes, one said no.', 'The one who said no has questionable taste. I\'m here.'] },
  { lines: ['{color}. I built a mood board. I have it on my phone. Do you want to see it?', 'Nobody at work wants to see the mood board. You might not either. I\'m showing you anyway.', 'I have a client call in twenty. This has to happen first.'] },

  // ── WRITERS ────────────────────────────────────────────────────────────

  { lines: ['I\'m a novelist. The writing room needs to feel right. {color} might do it.', 'My last book had a character who obsessed over wall color. That was research, I told myself.', 'I\'ve been "about to start" this painting project for three chapters now.'] },
  { lines: ['{color} for the study. Virginia Woolf said a room of one\'s own. Mine needs the right atmosphere.', 'I have strong feelings about the relationship between color and productivity. They\'re all in the book.', 'My deadline is looming. Painting feels productive. I know it isn\'t. I\'m doing it anyway.'] },
  { lines: ['I\'m a journalist. I\'m here. I\'m observing. The paint is also for my apartment.', 'I interviewed a paint chemist once. The color naming industry is fascinating and deeply weird.', 'I\'m on a deadline that moved twice. This moved down the priority list. It moved back up today.'] },

  // ── CHEFS ──────────────────────────────────────────────────────────────

  { lines: ['Kitchen renovation. {color} for the walls. My kitchen, finally my way.', 'I spend twelve hours in other people\'s kitchens. My kitchen is my sanctuary.', 'My sous chef is running prep. I have a window. A literal, physical window.'] },
  { lines: ['The restaurant is getting a facelift. Ambiance matters. {color}.', 'I care as much about how the space looks as how the food tastes. Both are wrong sometimes.', 'Service starts at five. I need to be back by three. Do the math.'] },
  { lines: ['White for the kitchen. Cleanest background for what I do.', 'I once worked in a kitchen painted dark green. It affected everything. Trust me.', 'I\'m a morning person. It\'s 7 AM. This is fine. This is when things should happen.'] },

  // ── BARTENDERS ─────────────────────────────────────────────────────────

  { lines: ['Bar renovation. {color} for the back wall. Mood lighting will handle the rest.', 'Bars are 80% lighting and 20% paint. But the paint has to hold up.', 'I open at noon. It\'s 9 AM. I have time, but not a lot of it.'] },
  { lines: ['We\'re redoing the whole place. Starting with what people see first.', 'I\'ve served enough people to know they notice more than they let on.', 'My bartender is taking inventory alone right now. He\'s judging me via text.'] },

  // ── BARISTAS ───────────────────────────────────────────────────────────

  { lines: ['I\'m doing my apartment with leftover time and very little money. {color} is within budget.', 'I spend all day making things beautiful for strangers. My apartment gets some attention.', 'I open the café in two hours. This has to happen now.'] },
  { lines: ['We\'re repainting the café. The vibe has been wrong for six months.', 'Vibe is everything. The color is part of the vibe. The vibe is off.', 'The regulars are already asking about it. The regulars notice everything.'] },

  // ── RESTAURATEURS ──────────────────────────────────────────────────────

  { lines: ['Restaurant\'s getting repainted. Soft launch is next Friday.', 'I\'ve rebranded twice. Paint is the cheapest rebrand.', 'I had a Yelp review once that specifically complained about the wall color. This is for that.'] },
  { lines: ['{color} for the private dining room. I want people to feel something in there.', 'The private dining room is where people celebrate important things. I take that seriously.', 'The event is Saturday. Friday is final coat. This is Tuesday\'s errand.'] },

  // ── FIREFIGHTERS ───────────────────────────────────────────────────────

  { lines: ['Day off project. {color} for the kitchen. Wife\'s been waiting a year.', 'At work we move fast. At home I apparently move at a different speed.', 'I promised this would be done before shift Thursday. Technically still true.'] },
  { lines: ['Firehouse is getting a refresh. Something that hides fingerprints.', 'Twenty-four men, one station, zero people who agree on color. I was volunteered.', 'The captain needs me back by noon. Captain doesn\'t wait.'] },

  // ── POLICE OFFICERS ────────────────────────────────────────────────────

  { lines: ['Home project. Just got off a double. {color}.', 'My sergeant paints houses in retirement. I\'m getting a head start.', 'I\'m in civilian clothes but I still have the same energy. Just so you know.'] },
  { lines: ['Garage gets a coat. Something that covers concrete and lasts.', 'I\'ve been meaning to do this since the department moved buildings. That was four years ago.', 'My day off has a schedule. You\'re currently on it.'] },

  // ── MILITARY / VETERANS ─────────────────────────────────────────────────

  { lines: ['Just got out. First house. Painting it myself. Starting with {color}.', 'They didn\'t prepare me for paint selection in the service. Should have.', 'I\'ve been in line here for less time than I\'ve waited for a lot of things. I\'m fine.'] },
  { lines: ['Whole house needs updating. Government housing had a very specific palette.', 'I can patch, prime, and paint a barracks room in under two hours. Let\'s see how this goes.', 'I\'m patient. But I\'m also very efficient. Just observing, is all.'] },

  // ── PILOTS ─────────────────────────────────────────────────────────────

  { lines: ['Layover home. My wife sent me for {color}. I have four hours.', 'I\'ve been to thirty-seven countries. My own bedroom has been beige for six years.', 'My next flight is at 8 PM. I\'m on a schedule. I\'m always on a schedule.'] },
  { lines: ['I never get to be home long enough to care about what it looks like. Changing that.', 'The interior of an Airbus is gray. I want at least one room that isn\'t.', 'Wheels up at 6. Do your math.'] },

  // ── FLIGHT ATTENDANTS ───────────────────────────────────────────────────

  { lines: ['I\'m home for four days. Painting is what I do when I\'m home.', 'Hotel rooms have made me appreciate a wall I actually chose.', 'My commuter flight is Tuesday. I\'m fitting a gallon in the schedule.'] },

  // ── REAL ESTATE AGENTS ──────────────────────────────────────────────────

  { lines: ['I tell every seller: paint first, photograph second. Here\'s me following my own advice.', '{color}. Neutral but warm. Shows well.', 'Open house is Sunday. This is Friday. This is fine.'] },
  { lines: ['Buyers notice paint even when they say they don\'t. Especially when they say they don\'t.', 'I\'ve sold four homes this month. My own place still has the previous owner\'s color choices.', 'I have a showing at noon. This is the gap. This is my gap.'] },

  // ── THERAPISTS ─────────────────────────────────────────────────────────

  { lines: ['Color affects mood. I know this professionally. {color} is a considered choice.', 'I help people work through decisions all day. This one took me a month.', 'I\'m comfortable with discomfort. But I\'m still waiting, technically.'] },
  { lines: ['The office needs to feel safe. Color is part of that. A calm, warm, credible color.', 'I once had a client who painted their walls to cope. I recommended it. It helped.', 'I have a session at two. I scheduled buffer. Buffer is now in use.'] },

  // ── SOCIAL WORKERS ─────────────────────────────────────────────────────

  { lines: ['Home visit tomorrow. I want my own place to feel like a relief to come back to.', '{color}. Something that says "welcome home" to me, not to a client.', 'I give a lot. My walls can give a little back.'] },

  // ── LIBRARIANS ─────────────────────────────────────────────────────────

  { lines: ['The library is repainting the reading room. Finally. It\'s been the same since the 80s.', '{color} for the children\'s section. Colors for children should be intentional.', 'The board approved it three months ago. We\'re doing it now. Bureaucracy moves at its own speed.'] },
  { lines: ['I\'m quiet at work. I can be assertive here. {color}, please.', 'Librarians are not inherently soft-spoken. We just respect context.', 'I\'ve been patient. Very patient. Professionally patient. That has a limit.'] },

  // ── PROFESSORS ─────────────────────────────────────────────────────────

  { lines: ['The department approved a repaint. I was given a budget and autonomy. Dangerous combination.', '{color}. I\'ve justified it academically to myself. That\'s enough.', 'Office hours ended at noon. I have a faculty meeting at three. This is what the middle looks like.'] },
  { lines: ['My lecture hall has been the same color since I was a student there. It\'s time.', 'I teach a color theory course. That makes this worse, not easier.', 'I have forty-seven unread emails. The paint feels more solvable.'] },

  // ── SCIENTISTS ─────────────────────────────────────────────────────────

  { lines: ['I ran a sample analysis on compatible wall colors for my apartment lighting. {color} won.', 'The error margin in color perception under different light is significant. I accounted for that.', 'I\'ve been methodical about this. The methodology included being here.'] },
  { lines: ['Lab walls are institutional green. I can\'t go home to more institutional.', '{color}. The wavelength falls in the range I find least visually tiring.', 'My experiment finishes in four hours. I\'d like to have paint before then.'] },

  // ── VETERINARIANS ──────────────────────────────────────────────────────

  { lines: ['Animals don\'t care about wall color. I\'ve started caring for myself.', '{color}. The vet clinic is getting a warmup. It\'s a bit sterile.', 'I just worked on a Great Dane for two hours. Whatever you need from me, I can handle.'] },

  // ── DENTISTS ───────────────────────────────────────────────────────────

  { lines: ['I know my office looks clinical. That\'s about to change.', '{color} for the waiting room. Something that says "this won\'t hurt" without lying.', 'People\'s blood pressure goes up 10 points in a waiting room. Color helps. Studies exist.'] },

  // ── PHARMACISTS ────────────────────────────────────────────────────────

  { lines: ['Everything in my day is very precise. Paint color included.', '{color}. I looked at the pigment data before deciding.', 'I\'m on my lunch break. Thirty-seven minutes remaining.'] },

  // ── FINANCIAL ADVISORS ──────────────────────────────────────────────────

  { lines: ['I modeled the resale impact of wall color on property value. This choice is strategic.', '{color}. Expected return: improved quality of daily living. That counts.', 'I have a two o\'clock. It\'s twelve forty-five. I\'m efficient. This should be efficient.'] },

  // ── STOCK TRADERS ──────────────────────────────────────────────────────

  { lines: ['Markets close at four. I\'m here now. This is what four PM looks like.', '{color}. I make thirty decisions an hour at work. This took me two weeks. I\'m aware.', 'Quick in, quick out. Apply that to all situations.'] },

  // ── STARTUP FOUNDERS ────────────────────────────────────────────────────

  { lines: ['Office space is finally real enough to deserve paint. {color}.', 'We bootstrapped. I\'m literally doing this myself. That\'s the brand.', 'I have a Series A meeting at 3. What I\'m doing here is probably not that different.'] },
  { lines: ['New office. Needs to say "serious but approachable."', 'Our last space was painted "hustle" by the co-working gods. This one is ours.', 'I\'m the CEO, CFO, and currently, head of facilities.'] },

  // ── SMALL BUSINESS OWNERS ───────────────────────────────────────────────

  { lines: ['Shop refresh. I want it to feel like walking in makes you want to stay.', '{color}. I watched what colors made my customers linger. This is based on data.', 'I open at ten. I have to be there by nine-thirty. It\'s eight-fifty.'] },
  { lines: ['New location. First impression is everything for a small business.', 'I did this for the first location. Second location gets the same attention.', 'My employee is opening for me this once. She\'s probably already texting.'] },

  // ── FRANCHISE OWNERS ────────────────────────────────────────────────────

  { lines: ['Corporate approved the color. I just have to get it. {color}.', 'Corporate chose this. I wouldn\'t have. But here I am, very franchise.', 'Inspection is next week. Walls need to pass. They\'ll pass.'] },

  // ── MUSICIANS ──────────────────────────────────────────────────────────

  { lines: ['Recording studio gets a new look. Acoustic foam doesn\'t need to be in an ugly room.', '{color} for the live room. Energy matters.', 'Session starts at seven. It\'s four. I have time. Not unlimited time.'] },
  { lines: ['I\'m a music teacher. The studio at home should feel inspiring.', 'I tell my students the space you practice in affects how you play. I mean it.', 'Lesson at five. This needs to happen first.'] },
  { lines: ['Band rehearsal space. The guys voted. This is not the color I would have chosen.', 'Democratic decisions in creative spaces produce beige results. We went with {color} instead.', 'Rehearsal is tonight. Walls are wet. They\'ll deal with the smell.'] },

  // ── ARTISTS ────────────────────────────────────────────────────────────

  { lines: ['My studio walls need to be neutral so they don\'t compete with the work.', '{color} reads as neutral under my daylight bulbs. I tested it twice.', 'I\'m on a deadline for a show. The irony of spending time on the room is not lost on me.'] },
  { lines: ['I need a wall I can project colors onto without interference. {color} is closest.', 'I am an artist. This is taking too long. Those two facts are related.', 'The opening is in two weeks. The studio needs to be done in one.'] },
  { lines: ['White for the gallery space. Clean, neutral, nothing that fights the work.', 'Gallery white isn\'t just white. It\'s a specific white. This might be that white.', 'The install is Thursday. This is Monday. I\'m fine. I\'m very fine.'] },

  // ── PHOTOGRAPHERS ──────────────────────────────────────────────────────

  { lines: ['I need a backdrop wall. {color}. It has to work under continuous daylight AND flash.', 'I\'ve tested seven colors in this room under different exposures. This is the one.', 'I have a client shoot Saturday. Friday is touch-up day. Today is paint day.'] },
  { lines: ['My studio wall needs to not create color casts. Very specific requirement.', 'In my profession, wrong color choices cause me actual, professional problems.', 'The client booked a specific background. I need this today.'] },

  // ── FILMMAKERS ─────────────────────────────────────────────────────────

  { lines: ['We\'re painting the production office. Something that doesn\'t read on camera.', '{color}. DP approved it. That\'s saying something.', 'We\'re in pre-production. Everything is technically a fire.'] },

  // ── ATHLETES ───────────────────────────────────────────────────────────

  { lines: ['Home gym is getting painted. Something that says go.', '{color} for the gym wall. The energy in that room needs to change.', 'I train at six. It\'s five. This is cutting it very close.'] },
  { lines: ['My sports team donated time to paint a community center. I got sent for supplies.', 'Forty volunteers are standing around with brushes right now. Waiting. For me.', 'I\'ve run marathons. I can handle a paint store. Barely.'] },

  // ── GAMERS ─────────────────────────────────────────────────────────────

  { lines: ['My gaming setup needs a background wall that doesn\'t look terrible on stream.', '{color}. It tested well under my ring light. I did a stream test.', 'My community noticed the wall. It has twelve thousand opinions about the wall.'] },
  { lines: ['I\'m building the ultimate setup room. {color} is part of the vision.', 'I have a forty-three-inch monitor and a green wall. Chromakey effect is unfortunate.', 'Server goes back up at 9. I need to be home by 8:55.'] },

  // ── STREAMERS / CONTENT CREATORS ────────────────────────────────────────

  { lines: ['Background for my YouTube setup. It shows up in every video. It needs to be right.', 'My thumbnail CTR went up 12% when I changed my background. This is business.', 'I have a video due tomorrow. Painting is technically prep work.'] },
  { lines: ['I need something that pops on camera without screaming.', 'My subscribers voted. This was second. First place was wrong. I overruled them.', 'I\'m not worried about time. I\'m worried about dry time. Can I film tonight?'] },

  // ── INFLUENCERS ────────────────────────────────────────────────────────

  { lines: ['The whole aesthetic of my feed needs to shift. This wall is the pivot.', '{color} but make it content. That\'s the brief I gave myself.', 'My engagement is down 8% this month. A new backdrop is a pivot strategy.'] },
  { lines: ['I need the wall to tell a story. Not too loud. A visual whisper.', 'I\'ve shot two hundred posts in this apartment. The wall needs to evolve.', 'My posting schedule doesn\'t pause. Neither can I.'] },

  // ── PODCASTERS ─────────────────────────────────────────────────────────

  { lines: ['Nobody sees my recording room but I know it looks bad on Zoom. {color}.', 'My podcast is audio-only but my video calls are not. The wall matters more than people think.', 'I record Tuesdays. Today is Monday. Very tight but fine.'] },

  // ── HOBBYIST: D&D PLAYERS ───────────────────────────────────────────────

  { lines: ['I\'m building a game room. It has to feel like a tavern. {color} is the tavern wall.', 'I spent six months planning this campaign room. The wall is the last piece.', 'Game night is Friday. Today is Tuesday. I have three days and two more sessions.'] },
  { lines: ['The dungeon master room deserves atmosphere. This is atmosphere.', 'My players complained about the lighting. They haven\'t seen the wall yet.', 'I canceled a session for this. The party will not forgive easily.'] },

  // ── HOBBYIST: BOARD GAMES ───────────────────────────────────────────────

  { lines: ['Game room repaint. My friends don\'t know yet. It\'ll be a reveal.', '{color}. I tested it against the light in that room for two weeks.', 'Board game night is every other Thursday. This Thursday is a reveal night.'] },

  // ── HOBBYIST: VINYL/RECORD COLLECTORS ───────────────────────────────────

  { lines: ['My listening room needs to match the vibe of my collection. {color} matches.', 'Records deserve a room they feel at home in. This is the room.', 'I bought seventy records this month. The room should cost something too.'] },

  // ── HOBBYIST: CLASSIC CAR RESTORATION ──────────────────────────────────

  { lines: ['My garage has been bare concrete for twenty years. Not anymore. {color}.', 'I restore cars. Everything in my life is either done right or redone.', 'The car goes back in the garage Sunday. Epoxy needs four days to cure.'] },
  { lines: ['This isn\'t for a house. It\'s for the shop. The shop is my house, basically.', 'My wife says I spend more time in the garage than in the home. She\'s right.', 'The show is in three weekends. I want the space right before then.'] },

  // ── HOBBYIST: GARDENERS ────────────────────────────────────────────────

  { lines: ['Painting the potting shed. It needs to feel like it belongs in the garden.', '{color} for the shed. Something earthy. Something that belongs outside.', 'The plants don\'t wait. Neither should paint.'] },
  { lines: ['My sunroom doubles as a greenhouse. The wall color affects the plants, I\'m convinced.', 'I know that sounds like something a plant person would say. I\'m a plant person.', 'I have forty-three plants that are having better mornings than I am.'] },

  // ── HOBBYIST: WOODWORKERS ───────────────────────────────────────────────

  { lines: ['Painting the workshop. {color}. Function first, then it can look good too.', 'I built the cabinets. I should be able to paint the walls.', 'My drill press has been running since 6 AM. I stepped out to get paint. Quick trip.'] },
  { lines: ['Shop walls. High-contrast helps me see dust. {color} might work.', 'I spent six hours choosing the right wood grain. The paint took four minutes.', 'The project needs to be done by the weekend. The paint is the last variable.'] },

  // ── HOBBYIST: MINIATURE PAINTING / WARHAMMER ────────────────────────────

  { lines: ['My hobby room needs good lighting and a neutral wall. {color} for the wall.', 'I paint figures that are thirty millimeters tall. My wall color is not going to intimidate me.', 'I have a tournament in two weeks. The room comes last.'] },
  { lines: ['Dedicated hobby room means dedicated wall. This is dedication.', 'My brush collection has more variety than my paint choices. I\'m fixing that.', 'I\'ve been undercoating models for three hours. I earned a break. A quick break.'] },

  // ── HOBBYIST: HOME BREWING ──────────────────────────────────────────────

  { lines: ['Basement brewery upgrade. {color} for the walls. Temperature-stable environment.', 'My beer is better than most craft options locally. The room can be too.', 'Fermentation won\'t wait. But the paint might. I\'m prioritizing.'] },

  // ── HOBBYIST: AMATEUR ASTRONOMERS ───────────────────────────────────────

  { lines: ['Observatory shed. {color}. Light-absorption is the goal.', 'Any stray light in a viewing space is a problem. The wall color matters to astronomers.', 'Meteor shower is Thursday. I\'m not missing it.'] },

  // ── HOBBYIST: RUNNERS ──────────────────────────────────────────────────

  { lines: ['Home gym wall. Something energizing but not panicked.', '{color}. I\'ve thought about this on several long runs.', 'My marathon is in eight weeks. This is what taper madness looks like.'] },

  // ── HOBBYIST: CYCLISTS ─────────────────────────────────────────────────

  { lines: ['Bike storage room gets a proper look. {color}.', 'My bikes are worth more than my furniture. The room should reflect that.', 'Club ride is at 6 AM Saturday. I need to be home and painting before noon today.'] },

  // ── HOBBYIST: CLIMBERS ─────────────────────────────────────────────────

  { lines: ['Home wall setup. The wood wall for the holds is set. Now the surround needs paint.', '{color} behind the climbing wall. It peeks through around the edges.', 'My forearms are wrecked and I\'m holding a paint can. This is fine.'] },

  // ── HOBBYIST: BIRDWATCHERS ──────────────────────────────────────────────

  { lines: ['I\'m painting the blind at the back of the property. Needs to blend.', 'The color can\'t spook the birds. Matte, earth tones. {color} seemed right.', 'Shorebird season starts Thursday. I\'d like the blind done by Wednesday.'] },

  // ── HOBBYIST: FISHERMEN ────────────────────────────────────────────────

  { lines: ['Fishing cabin gets a refresh. Nothing fancy. {color} seemed honest.', 'A fishing cabin that looks too nice feels dishonest. Just a little better than it was.', 'Season opener is Saturday. I\'d rather be at the lake. I\'m aware.'] },

  // ── HOBBYIST: HUNTERS ──────────────────────────────────────────────────

  { lines: ['Mudroom and gear storage. Functional color. Hides everything.', '{color}. Dark enough to hide the mud. You understand.', 'Season ends Friday. My wife said I could do whatever project I wanted after. This is it.'] },

  // ── HOBBYIST: COSPLAYERS ────────────────────────────────────────────────

  { lines: ['Photo backdrop for costume shoots. {color} works under studio lighting.', 'I spent more on the costume than the wall. The wall still has to be right.', 'The convention is in two weeks. This is the last prop on the list.'] },

  // ── HOBBYIST: HOME COOKS / FOODIES ──────────────────────────────────────

  { lines: ['Kitchen renovation. Food should have a beautiful background. {color}.', 'I take a lot of food photos. The wall shows up constantly.', 'Dinner party is Saturday. I want to have photos taken in a room that looks right.'] },

  // ── COLLECTORS (GENERAL) ───────────────────────────────────────────────

  { lines: ['Display room for my collection. The wall needs to set off the pieces without competing.', '{color}. I tested it with a swatch next to my collection. It works.', 'I\'ve been waiting to do this for two years. Literally. Two years.'] },

  // ── PERSONALITY: PERFECTIONIST ──────────────────────────────────────────

  { lines: ['I\'ve compared forty-seven samples. {color} is empirically the right choice.', 'If I come back tomorrow with a different one don\'t mention this visit.', 'I know exactly what I want. I\'ve known for three months. I just needed to be sure I was sure.'] },
  { lines: ['The undertones matter. Cool or warm can ruin an entire room.', 'I asked four friends. I discounted two of their opinions. The other two agreed with me.', 'I\'ll know if it\'s wrong and I will come back and it will be fine but I\'ll be upset.'] },
  { lines: ['{color}. I matched it to the trim, the flooring, the fabric, and the morning light.', 'Matching everything is not obsessive. It\'s comprehensive.', 'I have everything accounted for except this one thing. This is the last variable.'] },

  // ── PERSONALITY: OVERTHINKER ────────────────────────────────────────────

  { lines: ['I picked {color} and then I unpicked it and then I picked it again.', 'What if the color is right but I\'m the wrong person for the room? Ignore that.', 'I\'ve been in this store twice before. I left both times. I\'m staying this time.'] },
  { lines: ['How do you know when a color is done? Like done-done? Paint is permanent.', 'I know it\'s not actually permanent. But it feels permanent.', 'I\'m going to do it. I just want to stand here for one more second.'] },
  { lines: ['Is anyone else doing this room? Should I ask my partner again?', '{color}. Unless it\'s the wrong {color}. I looked at seventeen options.', 'My therapist says I need to act on decisions more quickly. I\'m practicing. On paint.'] },

  // ── PERSONALITY: IMPULSE BUYER ──────────────────────────────────────────

  { lines: ['I wasn\'t planning to paint today but here I am. {color} spoke to me.', 'I saw this on a reel this morning and decided by noon. Very fast arc.', 'My partner doesn\'t know yet. I\'ll frame it as a surprise refresh.'] },
  { lines: ['I passed by and thought, you know what, today\'s the day.', 'I own three unopened gallons at home from previous sudden decisions. Those were different.', 'I have no plan and no prep and this is definitely happening today.'] },

  // ── PERSONALITY: BARGAIN HUNTER ────────────────────────────────────────

  { lines: ['What\'s your best price on gallons? I\'m asking for a reason.', 'I\'m buying {color} but if there\'s a version that\'s slightly less I\'d like to see it.', 'I\'m not cheap, I\'m strategic. There\'s a difference.'] },
  { lines: ['I brought a coupon. For your competitor. Can you match it?', 'The paint itself is non-negotiable. The price I\'m a little flexible on.', 'I\'ve been to two other stores. This is my third stop. I know the market.'] },

  // ── PERSONALITY: LUXURY-SEEKER ──────────────────────────────────────────

  { lines: ['I need the best version of {color} that exists. Not the regular.', 'I redid the whole house last year. This is a touch-up for a room I got slightly wrong.', 'My contractor only works with premium products. So do I. We\'re in alignment.'] },
  { lines: ['Quality is nonnegotiable. The rest is negotiable. Quality is not.', 'I spent twice what I needed to on everything else in this house. The paint should match.', 'I\'m not in a rush because I don\'t rush things I care about. But I\'m almost in a rush.'] },

  // ── PERSONALITY: MINIMALIST ────────────────────────────────────────────

  { lines: ['White. The purest white. That\'s it.', 'I don\'t need options. I need white.', 'One gallon. One color. One wall. Actually all the walls. Still one color.'] },
  { lines: ['Less is more. That\'s not a design choice, that\'s a philosophy.', 'I\'ve been simplifying for three years. The walls come last.', 'I\'m here for one thing. I know what it is. Let\'s do it.'] },

  // ── PERSONALITY: MAXIMALIST ────────────────────────────────────────────

  { lines: ['I\'m doing an accent wall AND a ceiling AND a trim all different. {color} is just the first.', 'More is more. I\'ve heard the other argument. I\'ve rejected it.', 'I have six colors on a list. This is number three. We\'re progressing.'] },
  { lines: ['Bold. I want it bold. {color} is bold. Good.', 'My design philosophy: if you can see it, it should be intentional.', 'I have more to do after this. Keep moving.'] },

  // ── PERSONALITY: ECO-CONSCIOUS ──────────────────────────────────────────

  { lines: ['Low VOC. That\'s the requirement. Everything else is secondary.', 'I have a baby and a dog and a conscience. Low VOC is non-negotiable.', 'I\'ve looked at the ingredient list. You\'d be surprised what\'s in standard paint.'] },
  { lines: ['{color}. I want to confirm the environmental profile before I commit.', 'Sustainable choices take longer. I\'m fine with that. Usually.', 'I brought my own stirring stick. From a previous batch. I know.'] },

  // ── PERSONALITY: NOSTALGIC ─────────────────────────────────────────────

  { lines: ['This was the color of my grandmother\'s parlor. I\'m finding it again.', 'I know the exact color I\'m looking for. I\'ve been looking for fifteen years.', 'If it\'s exactly right I might get a little emotional. I\'m warning you.'] },
  { lines: ['{color}. My childhood bedroom was this color. I\'m going back.', 'Some colors carry memory. This one has mine.', 'I\'ve been meaning to do this for years. Today\'s the day.'] },

  // ── PERSONALITY: ANXIOUS ───────────────────────────────────────────────

  { lines: ['I think I\'m ready. I\'ve decided. {color}. Is that a good choice?', 'I measured. Twice. I have the number. I might need more than I think.', 'Everyone says it\'s just paint. I know. It still feels significant.'] },
  { lines: ['What if it looks completely different on the wall. It will, right? It always does.', 'I brought the swatch. I compared it to seventeen other swatches. Here I am.', 'Okay. I\'m doing it. I\'m here. This is happening. That\'s fine.'] },

  // ── PERSONALITY: UNBOTHERED ────────────────────────────────────────────

  { lines: ['Whatever\'s closest to {color} is fine. It doesn\'t have to be exact.', 'I genuinely don\'t mind waiting. This is the calmest part of my day.', 'No rush. I\'ll just be over here.'] },
  { lines: ['I\'ll take whatever covers the current color. That\'s the full brief.', 'My old color was "mistake." The new color can be anything else.', 'I\'m not here in any kind of hurry. Just here.'] },

  // ── PERSONALITY: COMPETITIVE ───────────────────────────────────────────

  { lines: ['My neighbor just repainted. I\'m going better. {color}.', 'This is not a competition. But if it were, I\'d be winning.', 'I want it done before her house is fully dry. That\'s my timeline.'] },
  { lines: ['I showed my wife the neighbor\'s paint job. We agreed we can do better.', 'Better results, less time. That\'s the objective.', 'She\'s still in the planning phase. I\'m already executing.'] },

  // ── PERSONALITY: PROCRASTINATOR ────────────────────────────────────────

  { lines: ['I\'ve been meaning to do this for two years. The motivation finally arrived.', '{color}. I picked this color eighteen months ago. I\'m finally here.', 'I moved the furniture yesterday. The walls have been waiting longer.'] },
  { lines: ['I have a system. It involves waiting until something absolutely must change.', 'The ceiling started to bother me six months ago. The walls are a bonus.', 'I made a promise. The promise was specifically for this weekend.'] },

  // ── LIFE SITUATION: MOVING TO NEW CITY ──────────────────────────────────

  { lines: ['New city, new apartment. {color} makes it feel like mine.', 'I moved cross-country with seven boxes. The walls need to do more work now.', 'I don\'t know anyone here yet. The apartment has to feel like home.'] },
  { lines: ['I relocated for work. The apartment is fine. The walls are temporary.', 'Temporary except I might be here three years. So less temporary.', 'I want this done before I get too comfortable with how it looks now.'] },

  // ── LIFE SITUATION: GOING THROUGH GRIEF ────────────────────────────────

  { lines: ['My mother had this color in her kitchen. I\'m putting it in mine.', 'Painting feels like doing something. I need to be doing something right now.', 'I\'m not in a rush. I just need to keep moving.'] },
  { lines: ['Fresh start. New color. Moving forward.', '{color}. I chose it by myself. That matters right now.', 'This is the kind of thing that takes as long as it takes.'] },

  // ── LIFE SITUATION: JUST ENGAGED ──────────────────────────────────────

  { lines: ['We just got engaged and we\'re moving in together. This is the first negotiation.', '{color}. We compromised. I got the living room, she got the bedroom.', 'The ring was easier to pick than the paint. Genuinely.'] },
  { lines: ['He said "whatever you want." That\'s not helpful and he knows it.', 'We\'ve been together four years. The color is the first thing we can\'t agree on.', 'We\'re picking it together. He\'s in the car. I\'m in here. This is the compromise.'] },

  // ── LIFE SITUATION: REDECORATING AFTER KIDS GROW UP ────────────────────

  { lines: ['The kids\' dinosaur wallpaper is finally coming down. {color} underneath.', 'The room was a nursery, then a toddler room, then a kid room, now mine again.', 'I waited fifteen years to make this room what I wanted. The paint is step one.'] },

  // ── LIFE SITUATION: DOWNSIZING ─────────────────────────────────────────

  { lines: ['New smaller place. Fresh start. {color} makes it feel like a choice.', 'Downsizing was the plan. Three kids gone, four bedrooms seemed like a lot.', 'Everything I own fits in this new space. The walls should feel intentional.'] },

  // ── LIFE SITUATION: JUST MOVED IN WITH A PARTNER ────────────────────────

  { lines: ['Moving in together. The "compromise color" process begins.', 'She has an opinion. I have an opinion. {color} is where they intersect.', 'He said he doesn\'t care. He will care when he sees it. I\'m prepared.'] },
  { lines: ['We negotiated the whole apartment. I got the kitchen color. She got the bedroom.', 'This is actually going fine. I\'m just saying that cautiously.', 'We both have to live with it so we both get input. This is democracy.'] },

  // ── LIFE SITUATION: FIRST APARTMENT ALONE ──────────────────────────────

  { lines: ['First place that\'s totally mine. {color} on the walls means I live here now.', 'I\'ve always had a roommate. This is my first solo wall.', 'I can paint any color I want. This is freedom. This is also a lot of freedom.'] },
  { lines: ['My parents said any color is fine. This is the first time in my life any color has been fine.', '{color}. Maybe something my dad wouldn\'t pick.', 'I\'m twenty-six. This is my wall. That\'s it. That\'s the whole thought.'] },

  // ── LIFE SITUATION: GOING BACK TO SCHOOL ───────────────────────────────

  { lines: ['Repainting the study before grad school starts. The room needs to feel serious.', '{color}. I need to feel like I\'m doing something productive during orientation week.', 'Classes start Monday. This is Friday. Close enough.'] },

  // ── LIFE SITUATION: CAREER CHANGE ──────────────────────────────────────

  { lines: ['New career means new home office. {color}. Fresh chapter.', 'I left finance for teaching. The walls should reflect the shift somehow.', 'I\'m reinventing. The home office is the only space I control right now.'] },

  // ── LIFE SITUATION: SOBRIETY / NEW CHAPTER ──────────────────────────────

  { lines: ['Starting fresh. The apartment needed to change. {color} first.', 'Cleaning up my life means cleaning up everything, including what I look at every day.', 'I have all the time in the world for the first time in years. This is what I\'m doing with it.'] },

  // ── LIFE SITUATION: ADULT CHILD RETURNING HOME ─────────────────────────

  { lines: ['My kid moved home. We\'re repainting her old room so it doesn\'t feel like moving backward.', 'Twenty-three, home from the city, very temporary, so she tells me.', 'She picked the color. I\'m getting it. That\'s the arrangement.'] },

  // ── LIFE SITUATION: CAREGIVER ─────────────────────────────────────────

  { lines: ['My mother moved in. We\'re making her room feel like hers.', '{color}. She described it to me. I found the closest match.', 'She\'s at home waiting. She\'s not impatient but I want to get back to her.'] },

  // ── LIFE SITUATION: WORKING FROM HOME ──────────────────────────────────

  { lines: ['The home office has been a bedroom converted by willpower. {color} makes it real.', 'I\'ve been on video calls with this wall for two years. Everybody has opinions. I\'m fixing it.', 'I have a meeting at two. The paint needs to be on the wall before that.'] },
  { lines: ['WFH turned my dining room into a conference room. At least it can look like one.', 'I asked my team what color they thought I should paint my background. I ignored them all.', 'My camera\'s on in twenty minutes. This is what crisis looks like.'] },

  // ── CULTURAL / REGIONAL ────────────────────────────────────────────────

  { lines: ['I\'m from a place where walls are either white or family.', '{color}. My family will have opinions. My family\'s opinions are decorating advice.', 'I sent the swatch to my mother. She called back immediately. She approves.'] },
  { lines: ['In my country we don\'t name paint colors like this. {color} took me a moment.', 'I read the color names on the wall for twenty minutes. They\'re very creative.', 'I\'m not complaining. I just need to understand the system.'] },
  { lines: ['My grandmother painted her house twice in forty years. I change colors more than that.', '{color}. She would have said I\'m being extravagant. She\'d be right.', 'I called her before coming. She said "whatever makes you happy." She means it.'] },
  { lines: ['I moved here from abroad. I\'m told this color is trendy. I\'m going with it.', 'At home, the walls tell you their color. Here, you choose it. This is still strange to me.', 'I\'ve been in this country three years. My apartment still looks like a guest room.'] },
  { lines: ['Back home the walls are thicker and the colors are warmer. I\'m approximating.', '{color}. The closest thing I found to what I\'m going for.', 'I miss the architecture. The paint helps a little.'] },
  { lines: ['I\'m Southern and I have opinions about paint that I\'ve been waiting to share.', '{color} is a bold choice and I respect it. My grandmother would have agreed.', 'I don\'t complain about waiting. I just notice it.'] },
  { lines: ['I\'m from the Pacific Northwest. Everything I own is either gray or a tree.', '{color} is the most colorful thing in my home. I\'m leaning into it.', 'It rains nine months of the year where I\'m from. This is not rushing me.'] },
  { lines: ['New York energy, new city. I move fast. Let\'s match pace.', '{color}. I picked it on the subway. I had a screenshot. This is it.', 'In New York this would already be done. I\'m adjusting.'] },
  { lines: ['I\'m from Texas. The room I\'m painting is large. Everything is.', '{color}. Big room, big statement, big state.', 'I drove forty-five minutes to get here. That\'s nothing. That\'s my commute on a good day.'] },
  { lines: ['Midwest nice means I won\'t tell you how long I\'ve been waiting. But I notice.', '{color}. Safe choice. Good choice. Fine choice.', 'I\'m not going to cause a scene. I want you to know I thought about it.'] },

  // ── GENERATIONAL: GEN Z ────────────────────────────────────────────────

  { lines: ['My FYP has been full of home painting content. I\'m manifesting this wall.', '{color}. The algorithm knew before I did.', 'I\'m going to document the process. I hope the dry time is photogenic.'] },
  { lines: ['Low income, high vision. {color} is the affordable luxury I can control.', 'I don\'t own the apartment but I own the energy in it. Temporarily.', 'My landlord said I can paint as long as I paint it back. I will absolutely not paint it back.'] },
  { lines: ['The rental is bleak. {color} is my protest against beige.', 'Beige is a landlord\'s way of saying "you\'re temporary." I disagree.', 'I have a class at four but this is a priority.'] },

  // ── GENERATIONAL: MILLENNIAL ───────────────────────────────────────────

  { lines: ['Finally buying paint instead of renting a wall that someone else painted badly.', '{color}. I\'ve owned things before. This one is a wall.', 'I bought the house in my thirties, which is apparently late, according to everyone.'] },
  { lines: ['I\'ve been a renter for fifteen years. First house. This is it.', 'My rent for one year is what this house cost in 1995. I\'m not thinking about that.', 'I have a lot of projects. This is the emotionally first one.'] },
  { lines: ['I budgeted for this paint on a spreadsheet. The spreadsheet said okay.', '{color}. It was in my Pinterest board from 2018. I kept the board.', 'I have student loans and a mortgage and I am here buying paint joyfully.'] },

  // ── GENERATIONAL: BOOMER ──────────────────────────────────────────────

  { lines: ['I\'ve painted this house five times in forty years. I know what I\'m doing.', '{color}. My wife likes it. That\'s my quality control.', 'I just need to get in and out. I\'ve done this before.'] },
  { lines: ['Back when I bought this house it cost what people spend on a car now.', 'The market has changed. The paint has not, in my view.', 'I\'m not in a hurry, I just have a project that won\'t finish itself.'] },
  { lines: ['I raised kids in this house and now I\'m repainting their rooms as offices.', '{color} for the new library. My wife calls it the library. I call it the third bedroom.', 'At my age I do things when I decide to do them. Today I decided.'] },

  // ── GENERATIONAL: SILENT GENERATION ───────────────────────────────────

  { lines: ['My son suggested this color. I came to see if I agree.', 'I\'ve been maintaining this house since before the neighborhood was fully built.', 'I don\'t complain. I just wait until things are done correctly.'] },

  // ── SPECIFIC SITUATIONS ─────────────────────────────────────────────────

  { lines: ['I Googled "best paint color for insomnia" and {color} kept appearing.', 'I know that sounds like something I made up. There\'s a study. I have it on my phone.', 'I haven\'t slept well in years. The walls are a hypothesis.'] },
  { lines: ['My cat knocked over a can in the living room. We\'re starting over.', '{color}. Over the old color, which the cat chose in the worst possible way.', 'The cat is fine. The rug is not fine.'] },
  { lines: ['I watched a renovation show and now I want to renovate everything.', '{color} is step one. It escalates from here, probably.', 'I watched seventeen episodes in a weekend and I\'m making decisions now.'] },
  { lines: ['My therapist said make something concrete. I\'m making a wall.', '{color}. Something tangible. Something I can point to.', 'Concrete progress. She\'ll ask about it Wednesday.'] },
  { lines: ['I threw a dart at a paint swatch collection. That\'s how I picked {color}.', 'I don\'t love the method but I love that I made a choice. Progress.', 'The dart landed on this. I\'m standing by it.'] },
  { lines: ['I\'m repainting because I lost a bet. {color}. My roommate won.', 'I said the team wouldn\'t cover the spread. They covered. So here I am.', 'A bet\'s a bet. I\'m a person of my word.'] },
  { lines: ['My paint color consultation with an AI recommended {color}. I want to see if the AI was right.', 'The AI was very confident. Oddly confident. I\'m testing the confidence.', 'If the AI is wrong, that\'s a conversation.'] },
  { lines: ['I\'m repainting because my neighbor said my choice was "safe." I\'ll show them safe.', '{color} is not safe. This is a statement.', 'I am genuinely not going to let this go until the wall is done.'] },
  { lines: ['I\'m doing this alone and I\'m fine about it.', '{color}. I picked it. I like it. It doesn\'t need committee approval.', 'This is me doing something for myself. It\'s going fine.'] },
  { lines: ['My housewarming is in two weeks and I want one room to be done.', '{color}. The entry. First impressions are made in three seconds. I\'ve read this.', 'Two weeks sounds like a lot until you count the dry time.'] },
  { lines: ['The bedroom has been incomplete since we moved in. Today is the day.', '{color}. Finally. I said finally out loud this morning.', 'Today is the day I made myself say today is the day.'] },
  { lines: ['I made a vision board. The wall is on the vision board. This is me living it.', '{color}. Exactly {color}. The board is quite specific.', 'The board doesn\'t lie. The board is always right. The board was right about the job, too.'] },
  { lines: ['We had a water leak. Repainted everything. Fresh start by accident.', '{color}. Something better than what was there before the leak.', 'Insurance covered the dry-out. Not the paint. I\'m here.'] },
  { lines: ['I\'m staging my own house to sell it. {color} for the main room.', 'I watched four hours of staging tutorials. I could host them now.', 'The listing photos are Thursday. Today is Tuesday. My timeline is very thin.'] },
  { lines: ['I\'m doing this to flip the house. {color} for broad appeal.', 'Broad appeal means nothing so specific it alienates anyone.', 'I close on the flip in six weeks. Week one starts now.'] },
  { lines: ['My partner and I designed it together. I came to buy it.', '{color}. She had the vision. I have the car. Good system.', 'She\'s at home preparing the walls. She moves faster than I do. I\'m keeping up.'] },
  { lines: ['I\'m the third generation to live in this house. I\'m finally changing the color.', '{color}. My grandmother would have called it extravagant. My father would have said fine.', 'Some changes take a generation. This one took three.'] },
  { lines: ['I painted my first apartment fourteen years ago and I still have the same splotch on my elbow.', '{color}. New apartment, new splotch.', 'I\'m wearing my paint clothes. I came prepared.'] },

  // ── SEASONAL / OCCASION ─────────────────────────────────────────────────

  { lines: ['Spring cleaning became spring repainting. It escalated.', '{color}. It feels like spring in paint form.', 'The rest of the house is clean. The walls have to match.'] },
  { lines: ['Hosting Thanksgiving. The dining room needs to look intentional before Thursday.', '{color}. Something warm. Something that says "yes, I planned this."', 'I have eleven people coming. They\'ll notice if the paint isn\'t dry.'] },
  { lines: ['Holiday party in two weeks. Living room gets a refresh.', '{color}. I want a backdrop that reads well in photos.', 'I started holiday prep in October. The paint is the November item.'] },
  { lines: ['New year, new color. I do this every two years. It\'s a tradition now.', '{color}. I have my usual rules: not what I had before, not what a magazine said.', 'New year energy means I need to do this today. Today is January.'] },
  { lines: ['Summer project. I have three months. Starting with the hardest room.', '{color}. I told myself this summer would be different. It is.', 'I have the whole summer and I\'m still a little anxious about the schedule.'] },
  { lines: ['Tax refund paint run. One of my annual traditions.', '{color}. The government returns my money. The money goes into my walls.', 'Annual tradition means I\'ve done this before. I\'m efficient at it.'] },

  // ── MORE TRADESPEOPLE VARIANTS ──────────────────────────────────────────

  { lines: ['Tile job next door is done. I\'m right behind them. {color}.', 'Trades have an order. I\'m respecting the order. Barely.', 'The tile guy is already at his next job. I\'m trying to match his pace.'] },
  { lines: ['We do a lot of property management work. This is one of seven this month.', '{color}. They all get this color. That\'s the portfolio palette.', 'Seven properties this month means I don\'t have time to be second in line.'] },
  { lines: ['Historic property. They approved this color. Took six months.', '{color}. Historic commission approved it. I have the letter if you need it.', 'The window for exterior painting is weather-dependent. The weather is cooperating today.'] },
  { lines: ['I\'m a painting contractor. I did not expect to be fetching my own supplies today.', 'My supply runner called in. Here I am. In line.', 'This is not my usual experience. I acknowledge that.'] },

  // ── MORE DESIGN TYPES ───────────────────────────────────────────────────

  { lines: ['I\'m writing a design book. This color is going in chapter seven.', '{color}. Chapter seven is about tension. This color creates productive tension.', 'My editor wants the manuscript in four months. I\'m living my research.'] },
  { lines: ['My design firm does commercial spaces. This is for my own home. Very different.', 'I advise people on color every day. My own house is white. Don\'t read into that.', 'I took a day off from client projects. This is what I do with it.'] },
  { lines: ['I\'m a color consultant. This is the most personally I\'ve ever agonized over a choice.', '{color}. After three hours of deliberation, which is embarrassing given my expertise.', 'The cobbler\'s kids, right. Or something like that.'] },

  // ── MORE PROFESSIONALS ──────────────────────────────────────────────────

  { lines: ['I\'m an ER nurse. I\'ve handled more urgent things before breakfast.', '{color}. I picked it on a break. I\'m confident.', 'I work twelve-hour shifts. I\'m not unfamiliar with waiting.'] },
  { lines: ['I\'m a high school principal. The school is getting repainted over break.', 'I approve the color, then someone else does it. Today is the exception.', 'School resumes Monday. This is Friday. Perfectly fine.'] },
  { lines: ['Civil engineer here. I\'ve reviewed projects that took fifteen years to approve.', '{color}. I appreciate a decision with clear parameters.', 'I\'m not worried about time. The structure will hold.'] },
  { lines: ['I\'m a structural engineer. Walls are my business, in a sense.', '{color}. The color won\'t affect the load-bearing properties. I checked.', 'I\'m efficient professionally. I\'m working on being efficient personally.'] },
  { lines: ['I\'m a marine biologist. I came from the field. I smell like the ocean.', '{color}. It reminds me of a specific species I study. Don\'t ask which one.', 'I\'m here on shore time. Shore time is finite.'] },
  { lines: ['I\'m a botanist. I research plant pigmentation. Choosing wall pigments is both ironic and calming.', '{color}. I know the chemical basis of that color. It\'s an interesting one.', 'I\'m between field seasons. This is my productivity.'] },
  { lines: ['Archaeologist. I\'ve been on a dig for three months. I just need a normal errand.', '{color}. I\'ve been looking at brown for a season. Anything else feels radical.', 'In the field we wait for permits, weather, funding. This is the fastest thing in my life.'] },
  { lines: ['I\'m a museum curator. I spend all day controlling color. This is supposed to be easier.', '{color}. Gallery conditions are different from home conditions. I\'m adjusting expectations.', 'Exhibitions take years to plan. Paint takes days. The irony is not lost on me.'] },
  { lines: ['I\'m an urban planner. I think about how spaces make people feel professionally.', '{color}. It meets the criteria: warm, legible, not aggressive.', 'Planning commission meets quarterly. You can imagine my patience level.'] },
  { lines: ['I\'m a translator. I can tell you what the name of this color means in four languages.', '{color}. In Portuguese that\'s almost poetic.', 'I\'m waiting. In several languages.'] },
  { lines: ['I\'m a diplomat. I navigate much harder negotiations daily.', '{color}. I selected it by consensus with my partner. Took three rounds.', 'This is the most informal process I\'ve been in for months. I find it relaxing.'] },
  { lines: ['I\'m a local city councilmember. I get to vote on bigger things. Today I vote alone.', '{color}. I represent a district. The district doesn\'t need to know about this.', 'I\'m used to public comment periods. This feels quick by comparison.'] },
  { lines: ['I\'m an actuary. I calculate risk. The risk of choosing the wrong paint color is measurable.', '{color}. The expected regret is low. I ran the numbers.', 'Statistically I should have moved through the line faster by now.'] },
  { lines: ['I\'m a geologist. I\'ve been looking at rock colors for twenty years.', '{color}. Reminds me of a formation in New Mexico. Good association.', 'I work on geological timescales. But I also have a dentist appointment at three.'] },
  { lines: ['I\'m a cartographer. Precision matters to me. {color} is precisely what I want.', 'I can tell you exactly where in the color space this sits.', 'I have every other step of this project mapped. This is the one gap.'] },
  { lines: ['I\'m a zookeeper. The primate enclosure is getting a refresh. Color theory applies.', '{color}. It tested well with the animals. No aggression responses.', 'Feeding time is at two. I need to be back before that.'] },
  { lines: ['I\'m a park ranger. I\'m off duty. I don\'t look it, I know.', '{color} for my cabin. It should blend with the environment it\'s in.', 'I\'m used to very quiet spaces. This is not that.'] },
  { lines: ['I\'m an astronomer. The observatory walls need to absorb light, not reflect it.', '{color}. Matte. Maximum absorption. This is a technical requirement.', 'I work nights. This is my morning. It\'s very early for everyone else.'] },
  { lines: ['I\'m a pharmacist. Every patient I see knows exactly what they need. I don\'t, for paint.', '{color}. I\'ve been in more waiting rooms than I can count. Now I\'m in one.', 'I dispense medication in order. I understand queuing.'] },
  { lines: ['I\'m a food scientist. I study color perception in consumer products.', '{color}. The wavelength falls within the most appetite-stimulating range. Kitchen wall.', 'My lab is twenty minutes away. I have a narrow window.'] },

  // ── QUIRKY & SPECIFIC ──────────────────────────────────────────────────

  { lines: ['I only paint in the third week of every month. Today is that week.', '{color}. The third week of each month is for doing things I\'ve been avoiding.', 'I\'ve already done laundry, groceries, and a dentist appointment. This is the last item.'] },
  { lines: ['I name the colors in rooms I repaint. {color} is a great name already.', 'The previous color in this room I called "confused gray." It was time.', 'I have a ceremony when I finish painting. You don\'t need to know the details.'] },
  { lines: ['I\'ve taken before and after photos of every room I\'ve ever painted. This will be number eleven.', '{color}. I know the exact angle I\'ll shoot from. I scouted it.', 'I\'ve been planning the before photo for three weeks. I took it this morning.'] },
  { lines: ['I restore old houses and this one needs something period-appropriate. {color} is close.', 'It\'s not exactly what they would have used in 1902 but it\'s the closest available commercially.', 'History doesn\'t rush. I\'m going to try to match that.'] },
  { lines: ['I collect paint chips. I\'ve never actually used most of them. {color} is going on the wall.', 'I have six hundred paint chips in a binder at home. Today one becomes real.', 'I almost couldn\'t decide because I love having the chip.'] },
  { lines: ['I run a bed and breakfast. Every room tells a story. {color} is chapter six.', 'My guests rate the rooms. The reviews mention the paint. I read every one.', 'Checkout is at eleven. Guests arrive at three. I have four hours.'] },
  { lines: ['I run a yoga studio. The walls should breathe.', '{color}. It should feel like an exhale.', 'The five AM class already happened. This is the between time.'] },
  { lines: ['I teach pottery. My studio looks like everything exploded. The walls are not the problem.', '{color}. It won\'t show clay. That\'s my main criterion.', 'I have afternoon classes. The morning is mine.'] },
  { lines: ['I run a dog grooming salon. The walls need to be cheerful and wipeable.', '{color}. Semi-gloss, because obviously.', 'I have a golden retriever coming in at one. The walls should be done before that.'] },
  { lines: ['I\'m a florist. The workroom walls are going to be covered anyway. But I want it right underneath.', '{color}. Like a good base coat. The flowers will do the rest.', 'I open at seven. It\'s six. I\'m efficient.'] },
  { lines: ['I manage an escape room. Atmosphere is everything. {color} for the mystery chamber.', 'The players shouldn\'t notice the paint. They should only feel it.', 'We have bookings starting at eleven. I need this done.'] },
  { lines: ['I run a recording studio. Every room is acoustically treated. The paint is the last layer.', '{color}. It won\'t affect the sound. But it affects how artists feel, which affects the sound.', 'Session in four hours. I move fast when I have to.'] },
  { lines: ['I design fonts. I see spacing and weight in everything. Paint color included.', '{color}. The visual weight of this color is exactly what the room needs.', 'I\'m on a deadline that isn\'t really a deadline but feels like one.'] },
  { lines: ['I\'m a competitive baker. My kitchen needs to feel like a competition.', '{color}. It should say "I take this seriously."', 'The regional round is in two months. My kitchen should be ready before then.'] },
  { lines: ['I\'m a theatrical lighting designer. I know exactly what this color does under different temperatures.', '{color}. I brought a lighting swatch. I tested this.', 'Tech rehearsal starts Thursday. I have today and Wednesday.'] },
  { lines: ['I\'m a sommelier. Color tells a story before you even taste.', '{color}. It has complexity. I respect complexity.', 'The tasting room must be done before Saturday\'s event.'] },
  { lines: ['I do corporate team building. The conference room needs to feel collaborative.', '{color}. Research suggests it facilitates open dialogue.', 'Training session starts Monday. I\'m doing the room over the weekend.'] },
  { lines: ['I\'m a speechwriter. Words matter. Color names matter. {color} is a good name.', 'I once wrote a speech with the line "the color of a decision." This is practice.', 'I have a first draft due tonight. This is the last thing before I start.'] },
  { lines: ['I\'m an event planner. I\'ve staged a hundred rooms. Now I\'m doing one for myself.', '{color}. I would have recommended this to a client.', 'My event is Saturday. This is Monday. I\'m ahead of schedule, technically.'] },
  { lines: ['I\'m a grief counselor. Creating beauty feels important.', '{color}. Spaces that hold people need warmth.', 'I make space for others all day. The paint is for me.'] },
  { lines: ['I\'m a stand-up comedian. I\'ll probably write a bit about this line.', '{color}. The name alone is worth something.', 'I have a set tonight. This is my afternoon, apparently.'] },
  { lines: ['I\'m a radio DJ. The studio is getting a makeover.', '{color}. It reads well on the live stream. I checked.', 'Morning show tomorrow. I need this to be done.'] },
  { lines: ['I\'m a dog trainer. Calm environments produce calmer animals.', '{color}. Muted. Not exciting. That\'s the point.', 'I have a reactive dog in at two. I don\'t want to rush, but I\'m about to.'] },
  { lines: ['I teach martial arts. The dojo gets a refresh. Discipline includes the space.', '{color}. The space should feel focused.', 'Evening class at six. I have until then.'] },
  { lines: ['I\'m a travel blogger. My home base never gets the attention it deserves.', '{color}. I\'ve stayed in enough hotels to know what makes a room feel right.', 'I fly out Thursday. I want the room done before I leave.'] },
  { lines: ['I\'m a professional organizer. I\'ve cleared the room. Now the walls.', '{color}. The right backdrop makes organized spaces sing.', 'The client reveal is Saturday. I need this wall done first.'] },
  { lines: ['I\'m a forensic accountant. I look for patterns. {color} has a pattern I appreciate.', 'I notice when things are off. Off is not the goal.', 'I work efficiently. I expect the same.'] },
  { lines: ['I\'m a clinical psychologist. The office color affects patient outcomes. I\'m not kidding.', '{color}. Specifically chosen to be non-threatening but not dismissive.', 'First patient is at nine. It\'s eight. The paint needs to be dry.'] },
  { lines: ['I lecture on environmental psychology. Color perception is my field.', 'I know more about this than seems useful in a paint store.', 'I\'m treating this as fieldwork. That doesn\'t mean I\'m in no hurry.'] },
  { lines: ['I\'m a professional cuddler. The space has to feel safe and warm.', '{color}. Absolutely not clinical. Not at all.', 'I have clients coming Tuesday. This is Sunday. Good margin.'] },
  { lines: ['I\'m a life coach. I tell people to take decisive action. This is mine.', '{color}. I decided in thirty seconds. That\'s my whole philosophy.', 'I\'m not waiting much longer. That would be inconsistent with my brand.'] },
  { lines: ['I\'m a NICU nurse. I came straight from the ward. I need something soft for home.', '{color}. Something that isn\'t monitors and overhead lights.', 'I\'m decompressing. This errand is the transition.'] },
  { lines: ['I build custom furniture. Every piece I make has a home. This paint is for that home.', '{color}. The piece deserves a backdrop that does it justice.', 'The piece delivers Friday. The wall needs to be ready before it arrives.'] },
  { lines: ['I\'m a costume designer. I think about what colors say about people.', '{color} says something interesting. I\'m not sure what yet.', 'Production starts in two weeks. My own home is last on the list but it\'s on the list.'] },
  { lines: ['I work at an animal shelter. The cat room gets new paint. The cats don\'t care. I do.', '{color}. Something that says "you\'re going to be okay."', 'Adoption event Saturday. I want the room right for that.'] },
  { lines: ['I manage a ski resort. The lodge is getting a winter refresh.', '{color}. It should feel like après-ski. You know the feeling.', 'Season opens in three weeks. Lodge needs to be done in two.'] },
  { lines: ['I run a wine bar. The back room is becoming a tasting room.', '{color}. Wine-adjacent colors. Serious colors.', 'The first private tasting is Friday. Today is Tuesday.'] },
  { lines: ['I\'m a competitive crossword constructor. The clue would be "paint choice."', '{color}. Five letters. Perfect, actually.', 'My puzzle is due Thursday. This is Tuesday\'s errand.'] },
  { lines: ['I\'m a chess coach. I think several moves ahead. This choice is move one.', '{color}. The endgame is a room that feels like thinking.', 'My lesson is in forty-five minutes. I planned for this exactly.'] },
  { lines: ['I keep bees. The honey house needs a visual refresh.', '{color}. The bees won\'t notice. My visitors will.', 'The hives don\'t care about schedules. I\'m learning from them.'] },
  { lines: ['I\'m a court reporter. I transcribe all day. Coming here is the most spontaneous thing I\'ve done.', '{color}. Chosen without a verbatim record. This is freedom.', 'I have a morning session tomorrow. Day off today.'] },
  { lines: ['I run a tattoo studio. The walls are part of the art.', '{color}. Dark enough to let the artwork on the walls breathe.', 'Walk-ins start at noon. I\'m finishing this first.'] },
  { lines: ['I\'m a meteorologist. I predict weather for a living. I cannot predict how this will look.', '{color}. Fifty percent chance I love it. Fifty percent chance I repaint.', 'No severe weather today. I cleared my schedule.'] },
  { lines: ['I work in tech support. I help people solve problems they created. This is my problem I created.', '{color}. Have you tried turning it off and on — no. The paint is the solution.', 'I\'ve been on hold a lot in my life. I hold my ground.'] },
  { lines: ['I\'m a librarian who also DJs on weekends. The studio needs to feel like both.', '{color}. Quiet enough for one world. Dark enough for the other.', 'I have a set Saturday. The room needs to be ready by then.'] },
  { lines: ['I drive for a rideshare company. I\'m between rides. This is the window.', '{color}. Three-minute window. Actually fifteen. I\'m being dramatic.', 'Surge pricing starts at five. I want to be back on the road.'] },

  // ── MORE MISC ──────────────────────────────────────────────────────────

  { lines: ['My roommate bet me I wouldn\'t actually do it. I\'m doing it.', '{color}. An extremely mature choice, despite the bet.', 'She gets home at six. I want to be painting when she walks in.'] },
  { lines: ['My lease says "approved neutral tones." I\'m interpreting that liberally.', '{color}. That\'s technically neutral. Technically.', 'I move out in fourteen months. I\'m working with what I have.'] },
  { lines: ['I just binge-watched six renovation shows. I feel like a professional.', '{color}. The show said it was trending. I believe the show.', 'I have a brush and a weekend. That\'s the whole plan.'] },
  { lines: ['My partner moved out and left his paint behind. I\'m covering it.', '{color}. Nothing nostalgic about it. That\'s the point.', 'I should have done this sooner. Doing it now.'] },
  { lines: ['I accidentally got paint on the wall trying to touch up a scratch. Now I\'m here.', '{color}. A scratch became a touch-up became a feature wall. I\'m leaning in.', 'The scratch is still visible under the touch-up. The feature wall is the solution.'] },
  { lines: ['I host a book club. The reading room needs to feel literary.', '{color}. It says something about the kind of books I host.', 'We meet the first Tuesday. This is Thursday. I have five days.'] },
  { lines: ['I rewatched a movie I love and the character\'s apartment color stayed with me.', '{color}. It\'s approximately the right shade. I\'ll know it on the wall.', 'I\'m trying to recreate a feeling from a film. Bear with me.'] },
  { lines: ['I just got a promotion. The home office is being updated to match.', '{color}. Senior-level walls.', 'I start the new role Monday. The room needs to be ready.'] },
  { lines: ['I\'m converting my garage into a studio. Phase one: paint.', '{color}. The whole space is getting reconsidered, wall by wall.', 'The equipment delivery is next week. The paint goes in this week.'] },
  { lines: ['I\'m doing a social media challenge. Day three is "change something." This is day three.', '{color}. The challenge said small change. This feels like the right size.', 'I need to post the before photo today. I need to be home for that.'] },
  { lines: ['I made a promise on New Year\'s. It\'s currently October. But it\'s happening.', '{color}. Better late than not at all.', 'I have three months until New Year\'s to make good use of this.'] },
  { lines: ['My building is selling units and I want mine to appraise well.', '{color}. Broad appeal. Not too personal. Strategic.', 'The appraiser comes Thursday. Tuesday is my day.'] },
  { lines: ['I bought the house as an investment. Now I actually want to live in it.', '{color}. It shifted from investment to home somewhere in month three.', 'I have a plumber coming and a painter not coming because I\'m the painter.'] },
  { lines: ['I watched a video essay about color psychology. Now I\'m here.', '{color}. The essay was forty-seven minutes. I watched it twice.', 'It\'s been three hours since the video. I\'m decisive when I have information.'] },
  { lines: ['I\'m painting a mural wall. The background goes first. {color} for the background.', 'The mural will be visible in two feet. The background still matters.', 'My muralist arrives tomorrow. The background needs to be dry.'] },
  { lines: ['I\'m a night owl who finally decided to use a full Saturday.', '{color}. It\'s eleven AM and I\'ve been awake for four hours. Record.', 'I had coffee. I made a decision. Here I am.'] },
  { lines: ['I painted rooms professionally in college. I\'m applying those skills to my own place.', '{color}. Four years of other people\'s colors. Now mine.', 'Muscle memory says go fast. I\'m trying to be deliberate.'] },
  { lines: ['This is my first project where I\'m not following someone else\'s instructions.', '{color}. I picked it alone. I like it alone.', 'It\'s just a wall but it feels like something.'] },
  { lines: ['I started a renovation and got to the walls last. Three months later.', '{color}. Everything else is done. The walls were waiting.', 'My contractor is long gone. I\'m the contractor now.'] },
  { lines: ['I moved furniture to paint five days ago. The room has been inaccessible for five days.', '{color}. The furniture is still in the middle of the room. Today is the day.', 'My family uses the other entrance. They\'re not complaining yet.'] },
  { lines: ['I have a color memory. I can\'t explain it. I know this is the one.', '{color}. I\'ve seen it in my mind for months. Now it\'s in front of me.', 'I just need to confirm and I\'m done. Please.'] },
  { lines: ['I spent three years abroad. Coming back, I want my house to feel like mine again.', '{color}. Something I chose. Not what I left.', 'I\'ve waited longer than this for smaller things. But I\'m back now.'] },
  { lines: ['I lived in a white apartment for two years. I swore when I owned I\'d have color.', '{color}. I own now. The white era is over.', 'The boxes are still in some rooms. The bedroom is getting painted first.'] },
  { lines: ['I\'m a morning person. I\'ve already walked the dog, made breakfast, and read the news.', '{color}. The efficient choice, made efficiently.', 'I\'m planning to have two coats on by lunch.'] },
  { lines: ['I was on hold with the insurance company for an hour. Now I\'m here. This is my afternoon.', '{color}. A decision I can actually complete.', 'I need a win today. This is a win I can control.'] },
  { lines: ['My teenager picked the color. I\'m here buying it. I think it\'s bold.', '{color}. They have vision. I have a credit card. Partnership.', 'They\'re home right now, asking me where I am. That\'s what sixteen is.'] },
  { lines: ['My teenager refuses to come to the store. I\'m describing the color over text.', '{color}. She just sent me three emojis. I\'m interpreting those as approval.', 'She\'s waiting. I\'m here. Please.'] },
  { lines: ['We moved to this house for the school district. Now we\'re making it feel like home.', '{color}. The school is fine. The paint is the second priority.', 'School starts in three weeks. We want the house ready.'] },
  { lines: ['I foster dogs. The room they stay in gets cleaned, freshened, repainted.', '{color}. It should feel calm for them on day one.', 'I have a new placement coming Thursday. That\'s my hard deadline.'] },
  { lines: ['I inherited this house. It was my uncle\'s. I\'m respecting the structure, updating the look.', '{color}. He would have liked this, I think. He had good taste.', 'I\'m taking my time because that feels right. But I\'m also, you know. In line.'] },
  { lines: ['My sister is visiting in three weeks and her first comment will be about the walls. I\'m ready.', '{color}. She\'ll say it\'s nice and I\'ll know she means it.', 'Three weeks sounds like a lot but one of them is for dry time.'] },
  { lines: ['I called my mother before buying. She said "ask someone who works there." Here I am.', '{color}. I\'m following advice. It feels right.', 'She\'s waiting for my callback. Efficient visit preferred.'] },
  { lines: ['I don\'t know what I\'m doing but I watched enough videos to feel like I might.', '{color}. The video said prep is 70% of the job. I prepped yesterday.', 'The video was forty minutes. My attention span was thirty. I\'ll figure out the rest.'] },
  { lines: ['I just got back from a color retreat. It changed how I see everything.', '{color}. The retreat said this color is transformative. I believe the retreat.', 'The retreat recommended decisive action. I\'m taking it.'] },
  { lines: ['I write a home improvement blog. My credibility is on the line with this room.', '{color}. The post goes live when it\'s done. The comments will be unforgiving.', 'My readers have strong opinions. I\'m aware. Here I am.'] },
  { lines: ['I promised my kids we\'d do their rooms before school. All three.', '{color}. Room one. Two more after this.', 'School starts in a week. We\'re doing all three by Sunday.'] },
  { lines: ['I signed up for a "do one scary thing a week" challenge. Picking paint counts.', '{color}. Bold choice. Scary in a manageable way.', 'The challenge posts on Sunday. I need photographic evidence by Saturday.'] },
  { lines: ['I\'m repainting over my ex\'s choice. Symbolic and also practical.', '{color}. Everything about this color is a fresh start.', 'I have people coming over this weekend. I want it done.'] },
  { lines: ['I haven\'t painted in fifteen years. It\'s like riding a bike, right?', '{color}. I assume the technique hasn\'t changed much.', 'My back is already braced for this. Let\'s not add waiting to the discomfort.'] },
  { lines: ['I\'m turning sixty this month. I\'m getting my house exactly how I want it.', '{color}. Sixty years of opinions. This is my winner.', 'The decade changes. The house changes with it.'] },
  { lines: ['I came back from a sabbatical with a list. Paint is item seven.', '{color}. The sabbatical was for perspective. This is perspective applied.', 'Items one through six took three months. Seven should take a weekend.'] },
  { lines: ['My friends are buying houses. I\'m renting. I\'m making the most of it.', '{color}. Renters deserve beautiful spaces too.', 'I move in two years anyway. The wall can be beautiful for two years.'] },
  { lines: ['I read an article that said repainting improves mental health outcomes. I\'m testing that.', '{color}. Hypothesis: I\'ll feel better. Study size: one room.', 'The article said the effect is immediate. I\'d like to test that soon.'] },
  { lines: ['My dog passed away. I\'m repainting her room. Making it something new.', '{color}. She loved the window in that room. I want it to still feel good.', 'I\'m moving at my own pace today. Just let me.'] },
  { lines: ['I\'m joining my neighbor\'s home renovation competition. Informal. But competitive.', '{color}. Whatever she\'s doing, this is better. I assume.', 'We compare progress on Sundays. This Sunday is soon.'] },
  { lines: ['I won a home improvement gift card. This is how I\'m using it.', '{color}. Someone else\'s money, my walls. Good outcome.', 'I\'ve been carrying this card for eight months. Today is its day.'] },

];

export function pickCustomer(): CustomerCharacter {
  return CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
}
