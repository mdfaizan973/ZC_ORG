// import React from "react";

export default function Home() {
  const data = [
    { img: "", name: "" },
    { img: "", name: "" },
    { img: "", name: "" },
    { img: "", name: "" },
    { img: "", name: "" },
    { img: "", name: "" },
  ];

  return (
    <div>
      <div className="banner mt-1 cursor-pointer">
        <img src="https://www.omfoods.com/cdn/shop/files/Banner_NEW.jpg?v=1681412890" />
      </div>

      <div className="main_home_card">
        <section className="py-20">
          <h1 className="mb-12 text-center font-sans text-5xl font-bold text-gray-900">
            TRENDING NOW
          </h1>
          <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((ele, i) => (
              <article
                key={i}
                className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl"
              >
                <a href="#">
                  <div className="relative flex items-end overflow-hidden rounded-xl">
                    <img
                      src="https://www.organictattva.com/wp-content/uploads/2019/08/Amaranth-cutlet.jpg"
                      alt=" Photo"
                    />
                  </div>

                  <div className="mt-1 p-2">
                    <div className="mt-3 flex items-end justify-between">
                      <p>
                        <span className="text-lg font-bold text-green-500">
                          Products Name
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>
      </div>

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

      <div className="w-[80%] mx-auto mt-8">
        <h1 className="font-bold text-7xl text-gray-500">
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
    </div>
  );
}

// autoplayLoopMutedPlaysinline
