import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  highscores: [],
  isScoreUpdated: true,
};

export const fetchHighscore = createAsyncThunk(
  "fetchHighscore",
  async (_, { getState }) => {
    try {
      const { user } = getState().user;
      const response = await axios.get("https://exploding-kitten-1-fs5m.onrender.com/users/highest", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const updateScore = createAsyncThunk(
  "updateScore",
  async (_, { getState }) => {
    try {
      const { user } = getState().user;
      const response = await axios.get(
        "https://exploding-kitten-1-fs5m.onrender.com/users/updatescore",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHighscore.fulfilled, (state, action) => {
        state.highscores = action.payload;
      })
      .addCase(updateScore.fulfilled, (state, action) => {
        state.isScoreUpdated = true;
      });
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
