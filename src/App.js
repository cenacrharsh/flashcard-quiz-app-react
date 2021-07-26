import { useState } from "react";

/* Components */
import FlashcardList from "./FlashcardList";

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  return <FlashcardList flashcards={flashcards} />;
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "what is 2+2?",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "what is 2+3?",
    answer: "5",
    options: ["2", "3", "4", "5"],
  },
];

export default App;
