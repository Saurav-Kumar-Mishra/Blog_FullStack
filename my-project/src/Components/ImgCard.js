import React from "react";
import imgData from "./imgData";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function ImgCard() {
  const [index, setIndex] = React.useState(0);
  const images = imgData.map((i) => {
    return i.img;
  });

  function handleBack() {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex((prev) => prev - 1);
    }
  }
  function handleNext() {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex((prev) => prev + 1);
    }
  }
  console.log(images);
  console.log(index);
  return (
    <div className="h-[92vh] flex flex-col justify-center items-center bg-white">
      <div className="w-full flex justify-center animate-pulse">
        <img  src="./Logo2.png" width="300px" alt="img not found"/>
      </div>
      <div
        style={{
          backgroundImage: `url(${images[index]})`,
          backgroundSize: "cover", // Change to "contain" to fit the entire image
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="relative w-screen h-full  overflow-x-hidden "
      >
        <button
          onClick={handleBack}
          className="absolute text-4xl left-5 top-[50%]
        bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-5 text-4xl top-[50%]
        bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}

export default ImgCard;
