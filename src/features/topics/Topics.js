import NewTopicForm from "../../components/NewTopicForm";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTopics, deleteTopicThunk } from "./topicsSlice";
import DeleteTopicModal from './DeleteTopicModal';

export default function Topics() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const topics = useSelector(selectAllTopics);
  const dispatch = useDispatch();

  const buttonPosition = Object.values(topics).length === 0 ? 'center' : 'right-side-button';

  const deleteTopicModal = (e, topicId) => {
    e.preventDefault();
    setShowDeleteModal(topicId);
  };

  const deleteTopic = () => {
    dispatch(deleteTopicThunk(showDeleteModal));
    setShowDeleteModal(false);
  };

  return (
    <>
      {showDeleteModal && <DeleteTopicModal deleteTopic={deleteTopic} />}
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
                <button 
                  className='delete-quiz' 
                  value={topic.id}
                  onClick={(e) => deleteTopicModal(e, topic.id)}
                  >
                  X
                </button>
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
    </>
  );
}
