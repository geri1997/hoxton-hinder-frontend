import React from "react";

const HomeBtn = ({children,...props}) => {
  return (
    <button className="hinder-btns" {...props}>
      {children}
    </button>
  );
};

export default HomeBtn;
