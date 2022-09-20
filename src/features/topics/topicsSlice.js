import { createSlice } from "@reduxjs/toolkit";

const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    topics: {}
  },
  reducers: {
    addTopic: (state, action) => {
      const { id, name, icon } = action.payload;
      return {
        ...state,
        topics: {
          ...state.topics,
          [action.payload.id]: {
            id: id,
            name: name,
            icon: icon,
            quizIds: []
          }
        }
      };
    },
    addQuizId: (state, action) => {
      const { quizId, topicId } = action.payload;
      state.topics[topicId].quizIds.push(quizId);
    },
    removeQuizId: (state, action) => {
      const { quizId, topicId } = action.payload;
      return {
        ...state,
        topics: {
          ...state.topics,
          [action.payload.topicId]: {
            ...state.topics[action.payload.topicId],
            quizIds: [...state.topics[topicId].quizIds.filter(id => id !== quizId)]
          }
        }
      };
    }
  }
});

export const selectAllTopics = (state) => state.topics.topics;
export const { addTopic, addQuizId, removeQuizId } = topicsSlice.actions;
export default topicsSlice.reducer;
