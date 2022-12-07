import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '../_helpers/fetch-wrapper';

// create slice
const name = 'users';

// implementation

function createInitialState() {
  return {
    users: {}
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

  function getAll() {
    return createAsyncThunk(
      `${name}/getAll`,
      async () => await fetchWrapper.get(baseUrl)
    );
  }

  return {
    getAll: getAll()
  }
}

function createExtraReducers() {
  function getAll() {
    var { pending, fulfilled, rejected } = extraActions.getAll;
    return {
      [pending]: (state) => {
        state.users = { loading: true };
      },
      [fulfilled]: (state, action) => {
        state.users = action.payload;
      },
      [rejected]: (state, action) => {
        state.users = { error: action.error };
      }
    }

    return {
      ...getAll()
    }
  }
}

// create slice
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// export

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;