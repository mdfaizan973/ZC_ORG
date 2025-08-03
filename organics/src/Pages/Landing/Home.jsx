// import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Carousel from "./Carousel";
export default function Home() {
  const data = [
    {
      img: "https://i.pinimg.com/736x/dc/cc/a2/dccca27d07678f10b1493b95d9bbeb99.jpg",
      name: "All Products",
      urlSignature: "all",
    },
    {
      img: "https://i.pinimg.com/564x/9e/78/9f/9e789faa701819cfbb69a304dcf5b27f.jpg",
      name: "Fruites",
      urlSignature: "fruits",
    },
    {
      img: "https://i.pinimg.com/564x/b5/44/f9/b544f96788c1f7466a9b11cad40a8ef0.jpg",
      name: "Vegetables",
      urlSignature: "vegetables",
    },
    {
      img: "https://naturelandorganics.com/cdn/shop/articles/Benefits_of_Organic_Dry_Fruits.jpg?v=1667380354",
      name: "Organic Dry fruits",
      urlSignature: "dry-fruits",
    },
    {
      img: "https://i.pinimg.com/564x/dd/03/b3/dd03b3ec7e42e9d145821b6721b29c17.jpg",
      name: "Grains",
      urlSignature: "grains",
    },
    {
      img: "https://i.pinimg.com/564x/4a/b0/e7/4ab0e7ccc090864f5430da7ed563d51d.jpg",
      name: "Dairy",
      urlSignature: "dairy",
    },
    {
      img: "https://i.pinimg.com/736x/0a/ba/88/0aba880fd6a26b8894b534604ef0aa06.jpg",
      name: "Pure Pressed Juices",
      urlSignature: "juice",
    },
    {
      img: "https://i.pinimg.com/474x/2c/f2/b9/2cf2b9844ba007a2bd89e9a8e83fb3b3.jpg",
      name: "Herbal Spices",
      urlSignature: "Spices",
    },
  ];
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   console.log("Searching for:", searchQuery); // navigate
  // };
  return (
    <div>
      <Navbar />
      <div className="banner mt-1 cursor-pointer">
        <img src="https://www.omfoods.com/cdn/shop/files/Banner_NEW.jpg?v=1681412890" />
      </div>
      {/* <div className="relative mt-1 w-full">
        <div className="w-full overflow-hidden">
          <img
            src="https://www.omfoods.com/cdn/shop/files/Banner_NEW.jpg?v=1681412890"
            alt="Banner"
            className="w-full object-cover"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-2">
          <div className="bg-white/80 backdrop-blur-sm p-2 rounded-md shadow-md w-full max-w-xs sm:max-w-sm mx-auto">
            <form
              onSubmit={handleSearch}
              className="flex flex-row items-center md:flex-row gap-2"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-3 rounded-md transition duration-300 text-xs"
              >
                <IoSearchOutline />
              </button>
            </form>
          </div>
        </div>
      </div> */}
      {/* small crusal */}
      <div className="main_home_card">
        <section className="py-20">
          <h1 className="mb-10 text-center font-sans text-5xl font-bold text-green-600">
            TRENDING NOW
          </h1>
          <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-6 p-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xxl-grid-col-6">
            {data.map((ele, i) => (
              <article
                key={i}
                className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl"
              >
                <a href="#">
                  <div className="relative flex items-center overflow-hidden rounded-xl">
                    <RouterLink
                      to={`/organicsproducts?product=${ele.urlSignature}`}
                    >
                      <img
                        src={ele.img}
                        // src="https://www.organictattva.com/wp-content/uploads/2019/08/Amaranth-cutlet.jpg"
                        alt=" Photo"
                      />
                    </RouterLink>
                  </div>

                  <div className="mt-3 flex items-end justify-center">
                    <p>
                      <span className="text-lg font-bold text-green-500">
                        {ele.name}
                      </span>
                    </p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>

      <Carousel />

      <div>
        <div className="banner relative w-full h-[70vh] ">
          <video
            className="w-full h-full object-cover filter blur-[2px]"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://cdn.shopify.com/s/files/1/0512/4122/2301/files/video-2.mp4?v=1643876769"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <AboutOrganic />
      <div>
        <img src="https://res.cloudinary.com/farmersfreshzone/image/upload/v1690462847/banner/eyrk9ls3hidu00miboq6.jpg" />
      </div>
    </div>
  );
}

// autoplayLoopMutedPlaysinline

export const AboutOrganic = () => {
  return (
    <>
      <div className="w-[80%] mx-auto mt-8">
        <h1 className="font-bold md:text-7xl text-4xl text-gray-500">
          Top Organic Food Products Online in India, Organic Grocery Store
          Online
        </h1>
        <p className="mt-5 text-gray-400">
          To stay healthy, fit and positive we all need to eat the right food
          which is healthy & pious and also free from pesticides and artificial
          colors. “ Eat a healthy meal, to help your body heal”- A healthy food
          comprises all the nutrition and antioxidants, as do NatureLand
          Organics products. NatureLand Organics best organic food product
          brands in india, is top 5 organic grocery store online and the best
          no.1 Organic Food Brand in India which is certified, 100% natural,
          chemical free, and harvested by our skilled farmers. Our food products
          are manufactured by using composted manure and plant waste which are
          100% pure, chemical-free and Organic. Buy Organic Food products online
          in India from NatureLand Organics at a low price. We have a variety of
          organic groceries online such as- Organic Flour, oil, pulses, cereals,
          dry fruits , snacks & beverages, sweeteners, breakfast items, juices
          and ghee & honey.
        </p>
        <p className="mt-7 mb-5 text-gray-400">
          We all are acquainted that food we buy from the market is now filled
          with unhealthy preservatives, pesticides and chemicals which are grown
          by man-made fertilizers and these fertilizers are adulterated which is
          harmful for our health and also to our future generations.
        </p>
      </div>
    </>
  );
};
