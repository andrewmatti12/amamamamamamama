// All of the letter wording lives here. The seven letters are kept exactly as written.
// The welcome and closing screens are written directly in index.html.
const CONTENT = {
  greeting: "My dearest Maria,",
  signoff: "All my love, always",

  letters: [
    {
      label: "The first flower",
      question: "What Do I Love About You?",
      answer: "Your pure heart, your beautiful smile, your beauty, your selflessness, and your humility. There are so many things I love about you, but these are some of the things that make you so special to me.",
    },
    {
      label: "The second flower",
      question: "What's My Favourite Memory of Us?",
      answer: "There are honestly too many to count, but one of my favourites has to be the time I took you to the Bow after your exam. That was amazing. I got to enjoy two of my favourite views at once. You know what I mean. ;)",
    },
    {
      label: "The third flower",
      question: "What Do I Miss Most About You?",
      answer: "Your kisses, our cuddles together, and, of course, your constant bullying of me. I miss all of it, even the bullying.",
    },
    {
      label: "The fourth flower",
      question: "What Are the Little Things You Do That Make Me Smile?",
      answer: "When you laugh, when you smile, when you make fun of me, when you playfully hit me, when you plot my murder, and when you surprise me. All those little things that make you, you.",
    },
    {
      label: "The fifth flower",
      question: "How Have You Changed My Life?",
      answer: "You have made me a better person. You have helped me get in touch with my humanity again. You have broken down my walls and opened my heart to you. I am forever grateful for the love you have shown me and for the person I have become because of you.",
    },
    {
      label: "The sixth flower",
      question: "What Am I Looking Forward to Doing Together?",
      answer: "Taking you out for a nice Italian dinner, enjoying some amazing food together, and then cuddling while watching the sunset. Just you and me, enjoying each other's company.",
    },
    {
      label: "The seventh flower",
      question: "What Do I Wish I Could Tell You in Person Right Now?",
      answer: "I love you, and I miss you so much. I cannot wait until the next time I get to see you, hold you, and be with you again. I miss my other half. You complete me, and being away from you only reminds me of how much you mean to me.",
    },
  ],

  // Little messages that pop up along the way
  hints: {
    start: "Tap a flower to open its letter",
    progress: (opened) => `${opened} of 7 letters opened`,
    finalReady: "The last flower has bloomed, just for you",
    done: "Every flower is yours. Revisit them anytime",
  },
  toasts: {
    notYet: "This one is special. Open the other six first 🌹",
    bloomed: "Something just bloomed… 🌹",
    ribbon: "Tied with all my love 🎀",
  },
};
