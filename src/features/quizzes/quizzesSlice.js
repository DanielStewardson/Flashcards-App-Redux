import { createSlice } from "@reduxjs/toolkit";
import { addQuizId, removeQuizId } from "../topics/topicsSlice";

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

export const deleteQuizThunk = (quizId, topicId) => {
  return (dispatch) => {
    dispatch(
      removeQuizId({
        quizId: quizId,
        topicId: topicId
      })
    );
    dispatch(deleteQuiz(quizId));
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
    },
    deleteQuiz: (state, action) => {
      const newQuizzes = Object.fromEntries(Object.entries(state.quizzes).filter(([key]) => key !== action.payload));
      return {
        ...state,
        quizzes: {...newQuizzes}
      }
    }
  }
});

export const selectAllQuizzes = (state) => state.quizzes.quizzes;
export const { addQuiz, deleteQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
