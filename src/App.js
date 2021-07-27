import { useState, useEffect, useRef } from "react";

/* Components */
import FlashcardList from "./FlashcardList";

/* Styles */
import "./app.css";

/* Axios */
import axios from "axios";

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const answer = deocdeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => deocdeString(a)),
            answer,
          ];
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

  function handleSubmit(e) {
    e.preventDefault();
  }

  /* API CALL FOR GETTING CATEGORIES */
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      // console.log(res.data);
      setCategories(res.data.trivia_categories);
    });
  }, []);

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}
          ></input>
        </div>
        <div className="form-group">
          <button className="btn">Generates</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
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
