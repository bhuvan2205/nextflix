import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const CarouselItem = ({
  imgUrl = "https://images.pexels.com/photos/13246954/pexels-photo-13246954.jpeg?auto=compress&cs=tinysrgb&w=600",
  size = "medium",
}) => {
  const sizeMap = {
    large: "h-96 w-60",
    medium: "h-64 w-80",
    small: "h-44 w-60",
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
