import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { selectAllTopics } from "../features/topics/topicsSlice";
import { createQuizThunk } from '../features/quizzes/quizzesSlice';
import { addCard } from "../features/cards/cardsSlice";

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const [quizPlaceholder, setQuizPlaceholder] = useState('Quiz Title');
  const [topicPlaceholder, setTopicPlaceholder] = useState('Topic');
  const history = useHistory();
  const dispatch = useDispatch();
  const topics = useSelector(selectAllTopics);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setQuizPlaceholder('Choose a quiz title!');
      return;
    };
    // This code can be refactored
    // Since you have already set a default string in topicPlaceHolder the second string in the conditional will never be read
    if (!topicId) {
      setTopicPlaceholder('Create a topic first!');
      return;
    };

    const cardIds = [];

    cards.forEach(card => {
      const id = uuidv4();
      cardIds.push(id);
      dispatch(addCard({
        id: id,
        ...card
      }))
    });

    dispatch(createQuizThunk({
      id: uuidv4(),
      name: name,
      topicId: topicId,
      cardIds: cardIds
    }))

    history.push(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section className="center">
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder={quizPlaceholder}
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder={topicPlaceholder}
        >
          <option value="">{topicPlaceholder}</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="Front"
            />
            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="Back"
            />
            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button>Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
