import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector } from "react-redux";
import { selectAllQuizzes } from "./quizzesSlice";
import { selectAllTopics } from "../topics/topicsSlice";

export default function Quizzes() {
  const quizzes = useSelector(selectAllQuizzes);
  const topics = useSelector(selectAllTopics);

  return (
    <section className="center">
      <h1>Quizzes</h1>
      <Link to={ROUTES.newQuizRoute()} className="button">
        Create New Quiz
      </Link>
      <ul className="big-tile-list">
        {Object.values(quizzes).map((quiz) => (
          <Link to={ROUTES.quizRoute(quiz.id)} key={quiz.id}>
            <li className="big-tile quiz" key={quiz.id}>
              <div className="tile-text-container">
                <img src={topics[quiz.topicId].icon} alt="" />
                <div className="text-content">
                  <h2>{quiz.name}</h2>
                  <div className='quiz-tile-sub-text'>
                    <p style={{paddingRight: '20px'}}>Topic: {topics[quiz.topicId].name}</p>
                    <p>Cards: {quiz.cardIds.length}</p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
