import { createSlice } from "@reduxjs/toolkit";




const options = {
    name: 'topics',
    initialState: {
        topics: {}
    },
    reducers: {
        addTopic: (state, action) => {
            return {
                ...state,
                topics: {
                    ...state.topics,
                    [action.payload.id]: [action.payload] /* -------- working here ---------- */
                }
            }
        }
    }
};

export const topicsSlice = createSlice(options);