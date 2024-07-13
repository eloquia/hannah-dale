const QUERIES_LIST = [
  "Where was this taken?",
  "Where did we take this picture?",
  "Can you figure out where this memory was from?",
  "Do you remember where this was taken?",
  "What place is shown in this photograph?",
  "Do you recognize where this was taken?",
  "What is the setting of this photo?",
  "Where did we take this photo?",
  "Where exactly was this taken?",
  "Whereabouts was this photo taken?",
];

const randomQuery = () => {
  return QUERIES_LIST[Math.floor(Math.random() * QUERIES_LIST.length)];
}

export default randomQuery;
