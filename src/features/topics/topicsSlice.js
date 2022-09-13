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
    }
  }
});

export const selectAllTopics = (state) => state.topics.topics;
export const { addTopic, addQuizId } = topicsSlice.actions;
export default topicsSlice.reducer;
