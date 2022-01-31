import React from "react";
import '../assets/button.css' 

const Button = ({children,...props}) => {

  return <button {...props}>{children}</button>;
};

export default Button;
