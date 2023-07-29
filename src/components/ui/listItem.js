import { darkTheme } from "@/data/atoms/theme";
import { useAtom } from "jotai";
import React from "react";
import CarouselItem from "./carouselItem";
import Link from "next/link";

const ListItem = ({ title, videos }) => {
  const [value] = useAtom(darkTheme);
  return (
    <>
      <h1
        className={`my-8 px-8 sm:px-0 text-4xl font-serif font-extrabold ${
          value ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h1>
      <div className="place-items-center grid sm:grid-cols-2 md:grid-cols-4 gap-x-24 gap-y-8">
        {videos.map((item) => {
          return (
            <Link href={`/video/${item?.id}`}>
              <CarouselItem imgUrl={item?.image} />;
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ListItem;
