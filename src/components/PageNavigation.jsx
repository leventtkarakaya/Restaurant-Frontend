import React from "react";
import { Link } from "react-router-dom";

export default function PageNavigation({ title }) {
  console.log("🚀 ~ PageNavigation ~ title:", title);
  return (
    <>
      <div className="flex items-center gap-3 py-3 mb-3 text-4xl font-semibold text-black ">
        <Link to="/">Home /</Link>
        <span className="text-4xl text-[#03396c]">{title}</span>
      </div>
    </>
  );
}
