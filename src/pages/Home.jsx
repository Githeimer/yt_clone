import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar.jsx";
import Spinner from "../Components/Spinner.jsx";
import Card from "../Components/Card.jsx";

import { useAppDispatch, useAppSelector } from "../hooks/useApp.js";
import { getHomePageVideos } from "../store/reducer/getHomepageVideos.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { clearVideos } from "../features/youtube/youtubeSlice.js";

const Home = () => {
  const [visible, setVisible] = useState(true);

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
    dispatch(clearVideos());
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  const visibilityToggle = () => {
    setVisible((prev) => !prev);
  };

  return (
    <div className="max-h-screen overflow-auto">
      <div style={{ height: "7.5vh" }}>
        <Navbar visibilityToggle={visibilityToggle} />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar visible={visible} />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 gap-x-5 grid-cols-4 p-8">
              {videos.map((item) => {
                return <Card data={item} key={item.videoId} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Home;
