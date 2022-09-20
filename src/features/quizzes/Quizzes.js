import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useDispatch, useSelector } from "react-redux";
import { selectAllQuizzes, deleteQuizThunk } from "./quizzesSlice";
import { selectAllTopics } from "../topics/topicsSlice";

export default function Quizzes() {
  const quizzes = useSelector(selectAllQuizzes);
  const topics = useSelector(selectAllTopics);

  const dispatch = useDispatch();

  const deleteQuiz = (e, quizId, topicId) => {
    e.preventDefault();
    console.log('quiz id -', quizId, '\n topic id -', topicId)
    dispatch(deleteQuizThunk(quizId, topicId))
  };

  const buttonPosition = Object.values(quizzes).length === 0 ? 'center' : 'right-side-button';

  return (
    <section className="center">
      <h1>Quizzes</h1>
      <Link to={ROUTES.newQuizRoute()} className={`button ${buttonPosition}`}>
        Create New Quiz
      </Link>
      <ul className="big-tile-list">
        {Object.values(quizzes).map((quiz) => (
          <Link to={ROUTES.quizRoute(quiz.id)} key={quiz.id}>
            <li className="big-tile quiz" key={quiz.id}>
              <button 
                className='delete-quiz' 
                value={quiz.id} 
                onClick={(e) => deleteQuiz(e, quiz.id, quiz.topicId)}>
                X
              </button>
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
