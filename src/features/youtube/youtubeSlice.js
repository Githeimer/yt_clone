import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "../../store/reducer/getHomepageVideos";

const initialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideo: [],
};

const youtubeSlice = createSlice({
  name: "youtubeApp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      if (action.payload && action.payload.parsedData) {
        state.videos = action.payload.parsedData;
        state.nextPageToken = action.payload.nextPageToken;
      }
    });
  },
});

export default youtubeSlice.reducer;
