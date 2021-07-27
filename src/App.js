import { useState, useEffect } from "react";

/* Components */
import FlashcardList from "./FlashcardList";

/* Styles */
import "./app.css";

/* Axios */
import axios from "axios";

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const answer = questionItem.correct_answer;
          const options = [...questionItem.incorrect_answers, answer];
          return {
            id: `${index}-${Date.now()}`,
            question: deocdeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  /* Converts the html encoded characters to string then returns it back */

  function deocdeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

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
