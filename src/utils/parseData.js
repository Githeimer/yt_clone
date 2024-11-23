import axios from "axios";
import { parseVideoDuration } from "./parseVideoDuration";
import { convertRawtoString } from "./convertRawToString";
import { timeSince } from "./timeSince";

const API_KEY = import.meta.env.VITE_REACT_APP_YOUTUBE_DATA_API_KEY;
const API_URL = "https://youtube.googleapis.com/youtube/v3";

export const parseData = async (items) => {
  try {
    const videoIds = items.map((element) => element.id.videoId).filter(Boolean); // Ensure valid video IDs
    const channelIds = items
      .map((element) => element.snippet.channelId)
      .filter(Boolean);

    // Fetch channel details
    const {
      data: { items: channelsData },
    } = await axios.get(
      `${API_URL}/channels?part=snippet&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parsedChannelsData = channelsData.map((element) => ({
      id: element.id,
      image: element.snippet.thumbnails.default.url,
    }));

    // Fetch video details
    const {
      data: { items: videoData },
    } = await axios.get(
      `${API_URL}/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );

    // Process and map the data
    const parsedData = videoData.map((item) => {
      const { id: channelId, image: channelImage } =
        parsedChannelsData.find((data) => data.id === item.snippet.channelId) ||
        {};

      return {
        videoId: item.id,
        videoTitle: item.snippet.title,
        videoDescription: item.snippet.description,
        videoThumbnail: item.snippet.thumbnails.medium.url,
        videoLink: `https://youtube.com/watch?v=${item.id}`,
        videoDuration: parseVideoDuration(item.contentDetails.duration),
        videoViews: convertRawtoString(item.statistics.viewCount),
        videoAge: timeSince(new Date(item.snippet.publishedAt)),
        channelInfo: channelId
          ? {
              id: channelId,
              image: channelImage,
              name: item.snippet.channelTitle,
            }
          : null, // Handle missing channel info gracefully
      };
    });

    return parsedData;
  } catch (error) {
    console.error("Error in parseData:", error.response?.data || error.message);
    throw error; // Rethrow for debugging in the calling function
  }
};
