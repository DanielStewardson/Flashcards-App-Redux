import { createSlice } from "@reduxjs/toolkit";
import { deleteQuizThunk } from "../quizzes/quizzesSlice";

export const deleteTopicThunk = (topicId) => {
  return (dispatch, getState) => {
    getState().topics.topics[topicId].quizIds.forEach(quizId => {
      dispatch(deleteQuizThunk(quizId))
    });
    dispatch(deleteTopic(topicId));
  };
};

const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    topics: {}
  },
  reducers: {
    // We can refactor these action creators
    // createSlice uses immer, which allows you to update the state using 'mutating' syntax
    // We therefore don't need to use the spread syntax (...)
    // To learn more visit: https://redux-toolkit.js.org/usage/immer-reducers
    addTopic: (state, action) => {
      const { id, name, icon } = action.payload;
          state.topics[action.payload.id] = {
            id: id,
            name: name,
            icon: icon,
            quizIds: []
          }
    },
     deleteTopic: (state, action) => {
       const newTopics = Object.fromEntries(Object.entries(state.topics).filter(([key]) => key !== action.payload));
       state.topics = newTopics;
    },
    addQuizId: (state, action) => {
      const { quizId, topicId } = action.payload;
      state.topics[topicId].quizIds.push(quizId);
    },

    removeQuizId: (state, action) => {
      const { quizId, topicId } = action.payload;
        state.topics = {
          [action.payload.topicId]: {
    // had trouble refactoring these two lines
            ...state.topics[action.payload.topicId],
            quizIds: [...state.topics[topicId].quizIds.filter(id => id !== quizId)]
          }
        }
    }
  }
});

export const selectAllTopics = (state) => state.topics.topics;
export const { addTopic, deleteTopic,  addQuizId, removeQuizId } = topicsSlice.actions;
export default topicsSlice.reducer;
