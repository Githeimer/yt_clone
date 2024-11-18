import React from "react";
import {
  MdHomeFilled,
  MdOutlineSlowMotionVideo,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdHistory,
  MdOutlineWatchLater,
  MdWatchLater,
} from "react-icons/md";

import { LuThumbsUp } from "react-icons/lu";

const Sidebar = ({ visible }) => {
  const visibilityStatus = visible;
  const mainLinks = [
    {
      icon: <MdHomeFilled />,
      name: "Home",
    },
    {
      icon: <MdOutlineSlowMotionVideo />,
      name: "Shorts",
    },
    {
      icon: <MdSubscriptions />,
      name: "Subscriptions",
    },
  ];

  const otherLinks = [
    {
      icon: <MdOutlineVideoLibrary></MdOutlineVideoLibrary>,
      name: "Library",
    },
    {
      icon: <MdHistory></MdHistory>,
      name: "History",
    },
    {
      icon: <MdWatchLater />,
      name: "Watch Later",
    },
    {
      icon: <LuThumbsUp></LuThumbsUp>,
      name: "Liked Videos",
    },
  ];
  if (visibilityStatus) {
    return (
      <div className="w-2/12 bg-[#212121] pr-5 overflow-auto pb-8 h-screen pl-2">
        <ul className="border-b-2 border-gray-700">
          {mainLinks.map((ele, _index) => {
            return (
              <li
                key={_index}
                className={`flex pl-6 py-3 hover:bg-zinc-600 gap-3 items-center rounded-lg ${
                  ele.name === "Home" ? "bg-zinc-600" : ""
                }`}
              >
                <a href="#" className="flex items-center gap-5">
                  {ele.icon}
                </a>
                <span className="text-sm tracking-wider">{ele.name}</span>
              </li>
            );
          })}
        </ul>
        <ul>
          {otherLinks.map((ele, _index) => {
            return (
              <li
                key={_index}
                className={`flex pl-6 py-3 hover:bg-zinc-600 gap-3 items-center rounded-lg ${
                  ele.name === "Home" ? "bg-zinc-600" : ""
                }`}
              >
                <a href="#" className="flex items-center gap-5">
                  {ele.icon}
                </a>
                <span className="text-sm tracking-wider">{ele.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Sidebar;
