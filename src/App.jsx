import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/search" element={<Search></Search>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
