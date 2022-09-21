import { createSlice } from "@reduxjs/toolkit";

const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: {}
  },
  reducers: {
    addCard: (state, action) => {
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.payload.id]: action.payload
        }
      };
    },
    deleteCard: (state, action) => {
      const newCards = Object.fromEntries(Object.entries(state.cards).filter(([key]) => !action.payload.includes(key)));
      return {
        ...state,
        cards: {
          ...newCards
        }
      }
    }
  }
});

export const selectAllCards = (state) => state.cards.cards;
export const { addCard, deleteCard } = cardsSlice.actions;
export default cardsSlice.reducer;
