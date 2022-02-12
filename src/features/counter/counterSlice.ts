import {
    createSlice,
    PayloadAction,
  } from '@reduxjs/toolkit';
  import type { RootState } from '../../app/store';
  
  // declaring the types for our state
  export type CounterState = {
    value: number;
  };
  
  const initialState: CounterState = {
    value: 0,
  };
  
  export const counterSlice = createSlice({
    initialState,
    name: 'counter',

    reducers: {
      decrement: state => {
        state.value--;
      },
      increment: state => {
        state.value++;
      },

      incrementByAmount: (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      },
    },
  });

  export const {
    increment, 
    decrement, 
    incrementByAmount,
  } = counterSlice.actions;
  
  export const selectCount = (state: RootState) => state.counter.value;
  
  // exporting the reducer here, as we need to add this to the store
  export default counterSlice.reducer;