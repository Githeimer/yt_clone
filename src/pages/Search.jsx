import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar.jsx";
import Spinner from "../Components/Spinner.jsx";
import SearchCard from "../Components/SearchCard.jsx";

import { useAppDispatch, useAppSelector } from "../hooks/useApp.js";
import { getHomePageVideos } from "../store/reducer/getHomepageVideos.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { clearVideos } from "../features/youtube/youtubeSlice.js";
import { getSearchPageVideos } from "../store/reducer/getSearchPageVideos.js";

const Search = () => {
  const [visible, setVisible] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());

    if (searchTerm === "") navigate("/");
    else dispatch(getSearchPageVideos(false));
  }, [dispatch, navigate, searchTerm]);

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
            next={() => dispatch(getSearchPageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-6 gap-x-5 grid-cols-1 p-8">
              {videos.map((item) => {
                return <SearchCard data={item} key={item.videoId} />;
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

export default Search;
