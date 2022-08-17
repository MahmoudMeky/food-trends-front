import React from "react";

export default function ProductIcon(props) {
  return (
    <button
      type="button"
      className={`product-icon group-one flex h-12 w-12 cursor-pointer items-center justify-center rounded-full  ${
        props.border && "border"
      } ${
        props.className || ""
      } bg-white transition-all duration-300 hover:border-black hover:bg-black`}
      data-tip={props.tooltip}
      onClick={props.onClick}
      disabled={!!props.disabled}
    >
      {props.children}
    </button>
  );
}
