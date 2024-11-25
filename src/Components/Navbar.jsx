import React from "react";
import { Link } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaYoutube } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { BsBell } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import {
  clearVideos,
  changeSearchTerm,
  clearSearchTerm,
} from "../features/youtube/youtubeSlice";

import { getSearchPageVideos } from "../store/reducer/getSearchPageVideos.js";

const Navbar = ({ visibilityToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  const handleSearch = () => {
    if (location.pathname !== "/search") navigate("/search");
    else {
      dispatch(clearVideos);
      dispatch(getSearchPageVideos(false));
    }
  };
  return (
    <div className=" flex justify-between px-14 h-14 items-center bg-[#141313] opacity-95 sticky">
      <div className="flex gap-8 items-center text-2xl">
        <button onClick={visibilityToggle}>
          <GiHamburgerMenu />
        </button>

        <Link to="/">
          <div className="flex flex-row gap-2 items-center justify-center">
            <FaYoutube className="text-3xl text-red-600" />
            <span className="text-xl ">Youtube</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        {/* search button and input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex gap-5 items-center p-0 pr-5 border-2 border-solid border-gray-800 rounded-2xl">
            <input
              type="text"
              placeholder="Search"
              className="w-96  text-gray-300 text-lg bg-transparent px-2 focus:rounded-2xl focus:border-blue-900 focus:border-1"
              value={searchTerm}
              onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
            />
            <button>
              <FaSearch className=" flex text-lg font-thin items-center"></FaSearch>
            </button>
          </div>
        </form>
        <div className="text-xl p-3 bg-zinc-900 rounded-full">
          <FaMicrophone></FaMicrophone>
        </div>
      </div>
      <div className="flex gap-6 items-center text-xl">
        <RiVideoAddLine></RiVideoAddLine>
        <div className="relative">
          <BsBell />
          <span className="absolute bottom-2 left-2 text-white text-sm rounded-full px-1 bg-red-600">
            9+
          </span>
        </div>
        <img
          src="https://m.media-amazon.com/images/I/71VY3Z0sy2L._AC_SL1500_.jpg"
          alt="pfp"
          className="h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
