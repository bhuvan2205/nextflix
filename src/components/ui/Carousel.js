import React from "react";
import CarouselItem from "./CarouselItem";
import Link from "next/link";
import { darkTheme } from "@/data/atoms/theme";
import { useAtom } from "jotai";

const Carousel = ({ videos = [], size, title }) => {
  const [value] = useAtom(darkTheme);
  return (
    <>
      <h1 className={`my-8 px-8 sm:px-0 text-4xl font-serif font-extrabold ${value ? "text-white": "text-black"}`}>
        {title}
      </h1>
      <div className="carousel carousel-center flex-col sm:flex-row mx-auto w-screen items-center gap-4 overflow-y-scroll h-[500px] sm:h-auto">
        {videos?.map((item, index) => {
          const id = item?.id?.videoId || item?.id;
          return (
            <Link href={`/video/${id}`} key={index}>
              <CarouselItem
                key={item?.id || index}
                imgUrl={item?.image}
                size={size}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Carousel;
