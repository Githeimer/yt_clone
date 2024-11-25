import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar.jsx";
import Spinner from "../Components/Spinner.jsx";
import { useAppDispatch, useAppSelector } from "../hooks/useApp.js";
import { getHomePageVideos } from "../store/reducer/getHomepageVideos.js";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [visible, setVisible] = useState(true);

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
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
            loader={<Spinner></Spinner>}
            height={650}
          ></InfiniteScroll>
        ) : (
          <Spinner></Spinner>
        )}
      </div>
    </div>
  );
};

export default Home;
