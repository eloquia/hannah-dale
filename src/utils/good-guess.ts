const GOOD_GUESS_TEXT_OPTIONS = [
  "Nice job!",
  "Great job!",
  "Well done!",
  "You got it!",
  "Awesome!",
  "Bravo!",
  "Congratulations!",
  "Way to go!",
  "Good effort!",
  "You're on the right track!",
  "Well done, keep up the good work!",
  "Keep up the good work!",
  "You're doing great!",
  "Keep up the good work, you're on the right track!",
]

export const randomGoodGuessText = () => GOOD_GUESS_TEXT_OPTIONS[Math.floor(Math.random() * GOOD_GUESS_TEXT_OPTIONS.length)]
