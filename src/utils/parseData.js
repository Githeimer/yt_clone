import axios from "axios";
import { parseVideoDuration } from "./parseVideoDuration";
const API_KEY = import.meta.env.VITE_REACT_APP_YOUTUBE_DATA_API_KEY;
const API_URL = "https://youtube.googleapis.com/youtube/v3";

export const parseData = async (items) => {
  try {
    const videoIds = [];
    const channelIds = [];

    items.forEach((element) => {
      channelIds.push(element.snippet.channelId);
      videoIds.push(element.id.videoId);
    });

    // new fetch
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
        id: element.channel.id,
        image: element.channel.snippet.thumbnails.default.url,
      });
    });

    //new fetch
    const {
      data: { items: videoData },
    } = await axios.get(
      `${API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parseData = [];
    videoData.forEach((item, index) => {
      const { image: channelImage } = parsedChannelsData.find(
        (data) => data.id === item.snippet.channelId
      );
      if (channelImage) {
        parseData.push({
          videoId: item.id.videoData,
          videoTitle: item.snippet.title,
          videoDescripton: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://youtube.com/watch?v=${item.id.videoId}`,
          videoDuration: parseVideoDuration(
            videoData[index].contentDetails.duration
          ),
          videoViews: convertRawtoString(videoData[index].statistics.viewCount),
          videoAge: timeSince(new Date(item.snippet.publishedAt)),
          channelinfo: {
            id: item.snippet.channelId,
            image: channelImage,
            name: item.snippet.channelTitle,
          },
        });
      }
    });

    return parseData;
  } catch (error) {
    console.log(error);
  }
};
