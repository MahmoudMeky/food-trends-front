import React from "react";
import { Typography } from "../UI";
import { FiArrowRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const AdsItem = ({ img, title, to }) => {
  return (
    <div
      className="group relative min-h-[300px] w-full lg:w-1/2 "
      data-aos="fade-up"
    >
      <NavLink to={to}>
        <div className=" absolute left-10 z-10 flex h-full w-1/4 max-w-[160px] flex-wrap py-6">
          <div className="my-auto flex flex-col gap-4">
            <Typography
              component={"h1"}
              className={
                "h-fit !text-3xl uppercase !tracking-normal text-primary sm:!text-5xl"
              }
            >
              {title}
            </Typography>
            <div className="flex h-fit w-full text-xs font-medium tracking-widest text-primary duration-500 group-hover:text-secondary sm:text-lg">
              <span>Shop now</span>
              <FiArrowRight className="my-auto mx-1" />
            </div>
          </div>
        </div>
        <div className=" absolute left-0 h-full w-full overflow-hidden">
          <img
            alt="..."
            src={img}
            className=" h-full w-full object-cover object-center transition-all duration-700 group-hover:scale-110"
          />
        </div>
      </NavLink>
    </div>
  );
};

export default AdsItem;
