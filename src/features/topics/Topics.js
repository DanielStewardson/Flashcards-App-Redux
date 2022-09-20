import NewTopicForm from "../../components/NewTopicForm";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector } from "react-redux";
import { selectAllTopics } from "./topicsSlice";

export default function Topics() {
  const topics = useSelector(selectAllTopics);

  const buttonPosition = Object.values(topics).length === 0 ? 'center' : 'right-side-button';

  return (
    <section className="center">
      <h1>Topics</h1>
      <Link
        to={ROUTES.newTopicRoute()}
        className={`button ${buttonPosition}`}
      >
        Create New Topic
      </Link>
      <ul className="big-tile-list">
        {Object.values(topics).map((topic) => (
          <Link to={ROUTES.topicRoute(topic.id)} key={topic.id}>
            <li className="big-tile topic" key={topic.id}>
                <div className="tile-text-container">
                  <img src={topic.icon} alt="" />
                  <div className="text-content">
                    <h2>{topic.name}</h2>
                    <p>{topic.quizIds.length} {topic.quizIds.length === 1 ? ' Quiz' : ' Quizzes'}</p>
                  </div>
                </div>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
}
