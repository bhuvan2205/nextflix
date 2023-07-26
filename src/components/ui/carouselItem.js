import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CarouselItem = ({
  imgUrl = "https://images.pexels.com/photos/13246954/pexels-photo-13246954.jpeg?auto=compress&cs=tinysrgb&w=600",
  size = "medium",
}) => {
  const sizeMap = {
    large: "h-40 w-64 sm:h-96 sm:w-60",
    medium: "h-40 w-64 sm:h-64 sm:w-80",
    small: "h-40 w-64 sm:h-44 sm:w-46",
  };
  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.15,
          transition: { duration: 0.25 },
        }}
        className={`${sizeMap[size]} carousel-item cursor-pointer pr-2 overflow-hidden`}
      >
        <Image
          src={imgUrl}
          alt="image"
          className="object-cover h-full w-full"
          height={390}
          width={240}
        />
      </motion.div>
    </>
  );
};

export default CarouselItem;
