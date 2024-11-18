import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar.jsx";

const Home = () => {
  const [visible, setVisible] = useState(true);

  const visibilityToggle = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

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
