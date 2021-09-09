// file containing open talk deck and deck functions
import { PlayingCard, QuestionCard, CardTuple} from './PlayingCard';

// type alias for deck
export type CardDeck = {
  cards: CardTuple[][];
  title: string;
  categories: string[];
}

const openTalkSelf:CardTuple[] = [
  ['', 'Launch', 'What are your pet peeves?', 'Self'],
  ['', 'Launch', "What is the most amount of money you've spent on something you absolutely did not need at all?", 'Self'],
  ['', 'Launch', 'If you had to fight for one global cause for the rest of your life, what would it be?', 'Self'],
  ['', 'Launch', 'If you could have one superpower, what would it be?', 'Self'],
  ['', 'Launch', 'If you could only eat one thing for the rest of your life, what would it be?', 'Self'],
  ['', 'Launch', 'Which is one animal that you absolutely cannot imagine having around?', 'Self'],
  ['', 'Launch', 'Describe your morning routine.', 'Self'],
  ['', 'Launch', 'What is the best vacation you have been on?', 'Self'],
  ['', 'Launch', 'What are your thoughts on having breakfast in bed?', 'Self'],
  ['', 'Launch', 'What is one item you must have in your future home?', 'Self'],
  ['', 'Launch', 'What is one item you cannot live without?', 'Self'],
  ['', 'Launch', 'What refreshes you?', 'Self'],
  ['', 'Launch', 'What are you passionate about?', 'Self'],
  ['', 'Launch', 'What is on your bucket list?', 'Self'],
  ['', 'Dive', 'How do you deal with conflict?', 'Self'],
  ['', 'Dive', 'What is the best moment of your life?', 'Self'],
  ['', 'Dive', 'When was the last time you had a heart to heart talk?', 'Self'],
  ['', 'Dive', 'What do you admire about youself?', 'Self'],
  ['', 'Dive', 'What is your best childhood memory?', 'Self'],
  ['', 'Dive', 'What is one thing that stresses you the most, and how do you deal with the stress?', 'Self'],
  ['', 'Dive', 'What was the last thing that made you cry?', 'Self'],
  ['', 'Dive', 'What is your biggest regret?', 'Self'],
  ['', 'Dive', 'When have you felt the most proud?', 'Self'],
  ['', 'Dive', 'Describe the time you felt the most afraid.', 'Self'],
  ['', 'Dive', 'What is one area you could do better in?', 'Self'],
  ['', 'Dive', 'Do you think you have reached your potential?', 'Self'],
  ['', 'Dive', 'What is one thing you know you should have done, but never did?', 'Self'],
  ['', 'Dive', 'When have you felt like your hopes were dashed?', 'Self'],
  ['', 'Dive', 'When was the last time you felt frustrated?', 'Self'],
  ['', 'Dive', 'When was the last time you felt insecure?', 'Self'],
  ['', 'Dive', 'What makes you who are?', 'Self'],
  ['', 'Dive', 'What is one thing you find difficult to compromise on?', 'Self']
];

const openTalkClan:CardTuple[] = [
  ['', 'Launch', 'What is the best compliment you have ever received?', 'Clan'],
  ['', 'Launch', 'Do you prefer meeting many people for a meal, or one to one?', 'Clan'],
  ['', 'Launch', 'What is the most important quality you think a friend should have?', 'Clan'],
  ['', 'Launch', 'What is the most comfortable friendship you have had?', 'Clan'],
  ['', 'Launch', 'Which friend group makes you feel the most comfortable being in?', 'Clan'],
  ['', 'Launch', 'What instantly makes someone your friend?', 'Clan'],
  ['', 'Launch', 'How do you prefer to be comforted when you are upset?', 'Clan'],
  ['', 'Launch', 'What is the best gift you have ever received from your friends?', 'Clan'],
  ['', 'Launch', 'What qualities do you admire most in your friends?', 'Clan'],
  ['', 'Launch', 'What is your favourite activity to do with your friends?', 'Clan'],
  ['', 'Launch', 'Where and when did you meet your closest friends?', 'Clan'],
  ['', 'Launch', 'Are you still in contact with your first best friend?', 'Clan'],
  ['', 'Dive', 'Who do you feel most supported by?', 'Clan'],
  ['', 'Dive', 'Does your family know your friends personally? Why or why not?', 'Clan'],
  ['', 'Dive', 'Describe the most difficult friendship you have had', 'Clan'],
  ['', 'Dive', 'Do you think you are a good friend? How can you be a better friend?', 'Clan'],
  ['', 'Dive', 'What is the most embarrassing thing you have done with your friends?', 'Clan'],
  ['', 'Dive', 'How do you react when your friend has a differing opinion from you?', 'Clan'],
  ['', 'Dive', 'Do you make friends easily? Why or why not?', 'Clan'],
  ['', 'Dive', 'Describe your relationship with your family', 'Clan'],
  ['', 'Dive', 'What is your relationship like with your parents?', 'Clan'],
  ['', 'Dive', 'What was the most awkward incident between you and your friend(s)?', 'Clan'],
  ['', 'Dive', 'Do you think you are similar to your friends? Why or why not?', 'Clan'],
  ['', 'Dive', 'Can you have a working relationship with your friends? Why or why not?', 'Clan'],
  ['', 'Dive', 'When was it the hardest to forgive someone?', 'Clan']
];

const openTalkLove:CardTuple[] = [
  ['', 'Launch', 'What is your love language?', 'Love'],
  ['', 'Launch', 'What is the first thing you notice when you meet a person?', 'Love'],
  ['', 'Launch', 'What does love mean to you?', 'Love'],
  ['', 'Launch', 'How ready for a relationship are you?', 'Love'],
  ['', 'Launch', 'What would you feel if you had to break up or get married tomorrow?', 'Love'],
  ['', 'Launch', 'How long do you think you would need to know someone before marrying them?', 'Love'],
  ['', 'Launch', 'Can you go a week without contacting your partner or crush? Why or why not?', 'Love'],
  ['', 'Launch', 'How would you resolve conflict in a relationship?', 'Love'],
  ['', 'Launch', 'What is your opinion on love at first sight?', 'Love'],
  ['', 'Launch', 'Describe your ideal partner', 'Love'],
  ['', 'Launch', 'Do you believe in soulmates?', 'Love'],
  ['', 'Launch', 'Describe your first crush', 'Love'],
  ['', 'Launch', 'How did you first meet your partner?', 'Love'],
  ['', 'Dive', 'What is the biggest compromise you have had to make in your relationship?', 'Love'],
  ['', 'Dive', 'Are you comfortable in your current relationship?', 'Love'],
  ['', 'Dive', 'What do you admire the most in a person?', 'Love'],
  ['', 'Dive', 'Have you felt like you could live with someone forever?', 'Love'],
  ['', 'Dive', 'What would you do if your family disapproves of your partner or crush?', 'Love'],
  ['', 'Dive', 'What are you most afraid of letting your partner or crush know about you?', 'Love'],
  ['', 'Dive', 'What could be improved on in your relationship?', 'Love'],
  ['', 'Dive', 'Have you ever lied to your partner or crush? If yes, what for?', 'Love'],
  ['', 'Dive', 'What was the best moment in your relationship?', 'Love'],
  ['', 'Dive', 'What are your thoughts on starting your own family?', 'Love']
]

const openTalkFun:CardTuple[] = [
  ['', '\u200b', 'If you had to choose, what animal will you ride on for the rest of your life?', 'Fun'],
  ['', '\u200b', 'What is the most important item in your pencil case?', 'Fun'],
  ['', '\u200b', 'How often do you eat your favourite food?', 'Fun'],
  ['', '\u200b', 'What is your favourite TV series?', 'Fun'],
  ['', '\u200b', 'What is the nicest sounding name you have ever heard?', 'Fun'],
  ['', '\u200b', 'Given the opportunity, what is one musical instrument you would like to learn?', 'Fun'],
  ['', '\u200b', 'If you had the chance to teleport to any country for a day, where would you go? Why?', 'Fun'],
  ['', '\u200b', 'Describe the most dramatic moment of your life.', 'Fun'],
  ['', '\u200b', 'If you could eliminate one food so no one could eat it ever again, what would you destroy?', 'Fun'],
  ['', '\u200b', 'What two things do you consider yourself to be very bad at?', 'Fun']
]

export const openTalkDeck:CardDeck = {
  cards: [openTalkSelf, openTalkClan, openTalkLove, openTalkFun],
  title: "open talk",
  categories: ['Self', 'Clan', 'Love', 'Fun']
}
// converts 2-dim array of tuples into 2-dim array of PlayingCards
export function parseDeck(deckString:CardTuple[][]):PlayingCard[][] {

    let parsed:PlayingCard[][] = [];
    for (let i = 0; i < deckString.length; i++) {
        let category:PlayingCard[] = [];
        for (let j = 0; j < deckString[i].length; j++) {
            let cardString:CardTuple = deckString[i][j];
            let card:PlayingCard = new QuestionCard(cardString[0], cardString[1], cardString[2], cardString[3]);
            category.push(card);
        }
        parsed.push(category);
    }
    return parsed;
}

export function shuffleDeck(deck:PlayingCard[][]):PlayingCard[][] {

  let shuffledDeck:PlayingCard[][] = [];
  
  for (let pile of deck) {
    shuffledDeck.push(shuffle(pile));
  }
  return shuffledDeck;
}

export function shuffle(pile:PlayingCard[]):PlayingCard[] {
  var currentIndex = pile.length,  randomIndex;
  let shuffledPile = pile;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledPile[currentIndex], shuffledPile[randomIndex]] = [
      shuffledPile[randomIndex], shuffledPile[currentIndex]];
  }
  return shuffledPile;
}

export function flatten(cards:CardTuple[][]):CardTuple[] {
  return cards.reduce((accumulator, value) => accumulator.concat(value), []);
}