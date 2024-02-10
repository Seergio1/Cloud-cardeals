import React from "react";
import ReactDOM from "react-dom";
import "./../css/modal.css";
import { motion } from "framer-motion";

const Modal = ({ children, closer }) => {
  return ReactDOM.createPortal(
    <>
      <div id="hider" onClick={()=>{
        closer()
      }}></div>

      <motion.div
        initial={{ y: "0%", x: "-50%", scale: 0.8 }}
        animate={{ y: "-50%", x: "-50%", scale: 1 }}
        id="content_modal"
      >
        {children}
      </motion.div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
