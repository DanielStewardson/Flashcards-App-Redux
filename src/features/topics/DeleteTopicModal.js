import React from 'react'

export default function DeleteTopicModal( { deleteTopic } ) {
  return (
    <div className='delete-topic-modal'>
        <h2>Deleteing a topic will delete all linked quizzes!</h2>
        <button className='button' onClick={deleteTopic}>
            Delete topic
        </button>
    </div>
  )
}
