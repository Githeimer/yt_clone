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
      video,
    } = getState();

    const resposnse =
      await axios.get(`${API_URL}/search?maxResults=20&q="freeCodeCamp.org
"&key=${API_KEY}&part=snippet&type=video`);

    const items = resposnse.data.items;

    const parsedData = await parseData(items);

    console.log(parsedData);
  }
);
