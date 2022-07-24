import React from "react";
import { CountDwon } from "./";
import { Button, Typography } from "../UI";
import { useCountdown } from "./CounterHook";

const SpecialOfferSection = () => {
  const item = {
    title: "FRESH FRUIT BOX",
    img: `${require("../../assets/SpecialOffer1.png")}`,
    offerImg: `${require("../../assets/SpecialOffer2.png")}`,
    offerExpier: "2022-08-15T14:11:59.604Z",
  };

  const [days, hours, mins, secs] = useCountdown(item.offerExpier);

  return (
    <div
      className="flex min-h-[600px] flex-wrap bg-[#F0EBD8] py-4 px-0 lg:px-20"
      data-aos="fade-up"
    >
      <div className="container m-auto flex flex-wrap">
        <div
          className="relative w-full flex-col  lg:w-6/12 "
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <img src={item.img} alt="..." className="md:mx-auto" />
          <img
            className=" absolute left-10 top-14 m-2 w-24 lg:w-32 "
            alt={item.title}
            src={item.offerImg}
          />
        </div>
        <div
          className="my-auto w-full flex-col text-center lg:w-6/12"
          data-aos="fade-up"
          data-aos-delay="350"
        >
          <div className=" container my-4 px-5">
            <Typography
              component={"subtitle1"}
              className={" font-satoshi mb-4 text-secondary"}
            >
              Fresh and Organic
            </Typography>
            <Typography
              component={"h1"}
              className={"!text-6xl text-primary md:text-7xl"}
            >
              FRESH FRUIT BOX
            </Typography>

            <Typography
              component={"body2"}
              className={"leading-relaxe mt-3 text-sm"}
            >
              Organic foods are the only source which we can rely on to take
              proper health care. Organic food is the most nutritious food and
              should be consumed by everyone.
            </Typography>
          </div>
          <CountDwon days={days} hours={hours} mins={mins} secs={secs} />
          <Button
            variant="secondary"
            className="my-5 w-4/6 !tracking-normal text-white transition-all duration-700 hover:bg-[#3D6642] lg:w-6/12"
            to={"/shop"}
          >
            Add To Bag
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferSection;
