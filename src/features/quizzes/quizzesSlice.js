import { createSlice } from "@reduxjs/toolkit";
import { addQuizId } from "../topics/topicsSlice";

export const createQuizThunk = (newQuiz) => {
  return (dispatch) => {
    dispatch(addQuiz(newQuiz));
    dispatch(
      addQuizId({
        quizId: newQuiz.id,
        topicId: newQuiz.topicId
      })
    );
  };
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: {
    quizzes: {}
  },
  reducers: {
    addQuiz: (state, action) => {
      return {
        ...state,
        quizzes: {
          ...state.quizzes,
          [action.payload.id]: action.payload
        }
      };
    }
  }
});

export const selectAllQuizzes = (state) => state.quizzes.quizzes;
export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
