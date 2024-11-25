import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData.js";

const API_KEY = import.meta.env.VITE_REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "youtube/App/searchPageVideos",
  async (isNext, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState();

    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="freecodecamp.org"&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );

    const items = response.data.items;
    const parsedData = await parseData(items);

    console.log("Parsed data:", parsedData);

    return {
      parsedData: [...videos, ...parsedData],
      nextPageToken: nextPageTokenFromState,
    };
  }
);
