import React from "react";
import { Link } from "react-router-dom";

export default function SearchCard({ data }) {
  return (
    <div className="flex gap-4 p-4 hover:bg-gray-800 transition-colors">
      {/* Thumbnail Section */}
      <div className="flex-shrink-0">
        <img
          src={data.videoThumbnail}
          alt="Thumbnail"
          className="w-96 h-56 rounded-md"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col justify-start gap-y-2 flex-grow">
        {/* Video Title */}
        <h3 className="text-lg font-medium text-white">
          <a href="#" className="line-clamp-2 hover:text-blue-400">
            {data.videoTitle}
          </a>
        </h3>

        {/* Channel Info */}
        <div className="text-sm text-gray-400 mt-1">
          <a href="#" className="hover:text-white">
            {data.channelInfo.name}
          </a>
        </div>

        {/* Views and Age */}
        <div className="text-sm text-gray-400 mt-1">
          <span className="after:content-['•'] after:mx-1">
            {data.videoViews} views
          </span>
          <span>{data.videoAge}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mt-2 line-clamp-3">
          {data.videoDescription}
        </p>
      </div>
    </div>
  );
}
