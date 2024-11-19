import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar.jsx";
import { useAppDispatch, useAppSelector } from "../hooks/useApp.js";
import { getHomePageVideos } from "../store/reducer/getHomepageVideos.js";

const Home = () => {
  const [visible, setVisible] = useState(true);

  const visibilityToggle = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => {
    state.youtubeApp.videos;
  });

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div>
      <Navbar visibilityToggle={visibilityToggle} />
      <div className="flex ">
        <Sidebar visible={visible}></Sidebar>
      </div>
    </div>
  );
};

export default Home;
