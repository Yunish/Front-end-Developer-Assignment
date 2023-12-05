import React from "react";
import "./styles.css";
import { AiOutlineClose } from "react-icons/ai";

function Modal({ handleClose, children }) {
  return (
    <div className='modal'>
      <div className='modal_content'>
        <div className='modal_close'>
          <AiOutlineClose onClick={handleClose} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
