import { useState, useEffect } from "react";

const images = [
  {
    url: "https://i.pinimg.com/474x/24/a8/91/24a8915fe41906c42a88a5c7fa83072b.jpg",
    text: "Healthy Organic Foods",
  },
  {
    url: "https://i.pinimg.com/474x/83/f4/03/83f403a30acc8475b9d83be6aeaa40ba.jpg",
    text: "Fresh Ingredients Everyday",
  },
  {
    url: "https://i.pinimg.com/474x/89/50/38/895038f4634fe39e550d8889bfd83710.jpg",
    text: "Nutrient-Rich Choices",
  },
  {
    url: "https://i.pinimg.com/474x/61/46/54/614654e7140605479da570e440c01306.jpg",
    text: "Wholesome Living Starts Here",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-1 sm:w-4/5 md:w-3/4 lg:w-1/2 mx-auto mb-8 rounded-xl overflow-hidden shadow-lg h-[125px]">
      <div className="relative w-full h-full flex items-center justify-center bg-black rounded-xl overflow-hidden">
        <img
          src={images[current].url}
          alt={images[current].text}
          className="absolute w-full h-full object-cover"
        />
        <div className="z-10 text-white text-center text-xs sm:text-sm md:text-base font-medium bg-black/50 px-3 py-1 rounded-md backdrop-blur-sm">
          {images[current].text}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
