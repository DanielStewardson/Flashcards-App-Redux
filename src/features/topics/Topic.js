import NewTopicForm from "../../components/NewTopicForm";
import { Link, useParams } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTopics } from "./topicsSlice";
import { selectAllQuizzes, deleteQuizThunk } from "../quizzes/quizzesSlice";

export default function Topic() {
  const topics = useSelector(selectAllTopics);
  const quizzes = useSelector(selectAllQuizzes);
  let { topicId } = useParams();
  const topic = topics[topicId];
  const quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);

  const dispatch = useDispatch();

  const deleteQuiz = (e, quizId, topicId) => {
    e.preventDefault();
    dispatch(deleteQuizThunk(quizId, topicId))
  };

  const buttonPosition = Object.values(quizzesForTopic).length === 0 ? 'center' : 'right-side-button';

  return (
    <section>
      <img src={topic.icon} alt="" className="topic-icon" />
      <h1>Topic: {topic.name}</h1>
      <Link to="/quizzes/new" className={`button ${buttonPosition}`}>
        Create a New Quiz
      </Link>
      <ul className="big-tile-list">
        {quizzesForTopic.map((quiz) => (
          <Link to={ROUTES.quizRoute(quiz.id)} key={quiz.id}>
            <li className="big-tile quiz" key={quiz.id}>
              <button 
                className='delete-quiz' 
                value={quiz.id} 
                onClick={(e) => deleteQuiz(e, quiz.id, quiz.topicId)}>
                X
              </button>
              
              <div className="tile-text-container">
                <div className="text-content">
                  <h2>{quiz.name}</h2>
                  <div className='quiz-tile-sub-text'>
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
