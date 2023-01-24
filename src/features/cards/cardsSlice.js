import { createSlice } from "@reduxjs/toolkit";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: {}
  },
  reducers: {
    // We can these refactor this action creator
    // createSlice uses immer, which allows you to update the state using 'mutating' syntax
    // We therefore don't need to use the spread syntax (...)
    // To learn more visit: https://redux-toolkit.js.org/usage/immer-reducers

    addCard: (state, action) => {
        state.cards = {
          [action.payload.id]: action.payload
        }
    },
    deleteCard: (state, action) => {
      const newCards = Object.fromEntries(Object.entries(state.cards).filter(([key]) => !action.payload.includes(key)));
      state.cards = newCards;
    }
  }
});

export const selectAllCards = (state) => state.cards.cards;
export const { addCard, deleteCard } = cardsSlice.actions;
export default cardsSlice.reducer;
