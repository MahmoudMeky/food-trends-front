import React from "react";
import "aos/dist/aos.css";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";

export default function Modal(props) {
  if (!props.show) {
    return;
  }

  return (
    <>
      {createPortal(
        <Backdrop
          setShow={props.setShow}
          className="flex items-center justify-center"
        >
          <div
            className={`cursor-default overflow-y-auto bg-white p-5 ${
              props.className || "h-1/2 w-1/2 cursor-default"
            }`}
            data-aos={`${"fade-up"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="fixed right-5 w-fit cursor-pointer self-end text-xl text-base-400 hover:font-bold hover:text-red-400"
              onClick={() => {
                props.setShow(false);
              }}
            >
              X
            </span>
            {props.children}
          </div>
        </Backdrop>,
        document.getElementById("modals")
      )}
    </>
  );
}
