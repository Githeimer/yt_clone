import React from "react";
import Homepage_skeleton from "./Homepage_skeleton";

const Spinner = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <Homepage_skeleton key={index} />
      ))}
    </div>
  );
};

export default Spinner;
