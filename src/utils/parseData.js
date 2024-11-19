import axios from "axios";
const API_KEY = import.meta.env.VITE_REACT_APP_YOUTUBE_DATA_API_KEY;
const API_URL = "https://youtube.googleapis.com/youtube/v3";

export const parseData = async (items) => {
  try {
    const videoIds = [];
    const channelIds = [];

    items.array.forEach((element) => {
      channelIds.push(element.snippet.channelId);
      videoIds.push(element.id.videoId);
    });

    const {
      data: { item: channelsData },
    } = await axios.get(
      `${API_URL}/channels?part=snippet.contentDetails&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parsedChannelsData = [];
    channelsData.forEach((element) => {
      parsedChannelsData.push({
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      });
    });

    const {
      data: { items: videoData },
    } = await axios.get(
      `${API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );
  } catch (error) {}
};
