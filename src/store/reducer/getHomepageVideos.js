import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData.js";

const API_KEY = import.meta.env.VITE_REACT_APP_YOUTUBE_DATA_API_KEY;

const API_URL = "https://youtube.googleapis.com/youtube/v3";

export const getHomePageVideos = createAsyncThunk(
  "youtube/App/homePageVideos",
  async (isNext, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState },
      video = [],
    } = getState();

    const nextPageTokenQuery =
      isNext && nextPageTokenFromState
        ? `&pageToken=${nextPageTokenFromState}`
        : "";

    try {
      const response = await axios.get(
        `${API_URL}/search?maxResults=20&q=freeCodeCamp.org&key=${API_KEY}&part=snippet&type=video${nextPageTokenQuery}`
      );

      const items = response.data.items;

      // Parse the video data
      const parsedData = await parseData(items);

      return {
        parsedData: [...video, ...parsedData], // Spread the existing videos with the new ones
        nextPageToken: response.data.nextPageToken || null,
      };
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  }
);
