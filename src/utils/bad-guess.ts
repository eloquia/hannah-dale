export const BAD_GUESS_TEXT_OPTIONS = [
  "Try again",
  "Nope",
  "Not quite",
  "That's not it",
  "Try something else",
  "Good effort, try again",
  "You're on the right track",
  "Not exactly",
  "Close, but not quite",
  "Good guess, but not the answer",
  "Good thinking, but not quite",
  "Almost there",
  "You're so close, keep trying",
  "Close, but not the right answer",
]

export const randomBadGuessText = () => BAD_GUESS_TEXT_OPTIONS[Math.floor(Math.random() * BAD_GUESS_TEXT_OPTIONS.length)]
