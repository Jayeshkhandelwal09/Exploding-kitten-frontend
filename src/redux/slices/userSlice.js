import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  highscores: [],
  isScoreUpdated: true,
  isLoading: false, // Add loading state
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
    setLoading: (state, action) => { 
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHighscore.pending, (state) => { 
        state.isLoading = true;
      })
      .addCase(fetchHighscore.fulfilled, (state, action) => {
        state.highscores = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchHighscore.rejected, (state) => { 
        state.isLoading = false;
      })
      .addCase(updateScore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateScore.fulfilled, (state, action) => {
        state.isScoreUpdated = true;
        state.isLoading = false;
      })
      .addCase(updateScore.rejected, (state) => { 
        state.isLoading = false;
      });
  },
});

export const { setUser, logoutUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
