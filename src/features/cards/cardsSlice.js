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
    }
  }
});

export const selectAllCards = (state) => state.cards.cards;
export const { addCard } = cardsSlice.actions;
export default cardsSlice.reducer;
