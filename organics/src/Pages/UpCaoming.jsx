// import React from 'react'

import Navbar from "../Components/Navbar";

export default function UpCaoming() {
  return (
    <div>
      <Navbar />
      <div className="w-full mx-auto">
        {/* <img
          src="https://cdn.shopify.com/s/files/1/0104/1059/0266/t/141/assets/HyphonicVegesDesktop.jpg?v=15777971971431151205"
          className="mx-auto"
          alt="Image 1"
        /> */}
        <img
          src="https://www.nimbarkfoods.com/images/blog/WhatsApp%20Image%202022-08-22%20at%2010.58.57%20AM.jpeg"
          className="mx-auto"
          alt="Image 2"
        />
      </div>
      <div className="w-full mx-auto mt-10 mb-5 flex items-center justify-center">
        <h1 className="text-4xl font-bold">Upcoming Products</h1>
      </div>
      <div className="mx-auto max-w-screen-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <img
            src="https://i.pinimg.com/564x/6d/d7/b6/6dd7b6d3a5fd4c3ccbeeaaf8c33c8c1d.jpg"
            alt="Image 2"
            className="w-full md:w-60 shadow-xl rounded-full"
          />
          <img
            src="https://i.pinimg.com/564x/3f/4e/f8/3f4ef834542068d9490c3ba98c6b1fef.jpg"
            alt="Image 3"
            className="w-full md:w-60 shadow-xl rounded-full"
          />
          <img
            src="https://i.pinimg.com/564x/b5/fc/73/b5fc7356aebefe38733d08a600c52746.jpg"
            alt="Image 1"
            className="w-full md:w-60 shadow-xl rounded-full"
          />{" "}
          <img
            src="https://i.pinimg.com/736x/b6/a8/84/b6a88456bc311f0446c335f936b3a4c8.jpg"
            alt="Image 4"
            className="w-full md:w-60 shadow-xl rounded-full"
          />
          <img
            src="https://i.pinimg.com/564x/9b/d0/3e/9bd03e7e33a302d862892fdc2f3dbb16.jpg"
            alt="Image 5"
            className="w-full md:w-60 shadow-xl rounded-full"
          />
          <img
            src="https://i.pinimg.com/564x/06/ee/d1/06eed1c79646eaa4e191a59c18035a6d.jpg"
            alt="Image 6"
            className="w-full md:w-60 shadow-xl rounded-full"
          />{" "}
          <img
            src="https://i.pinimg.com/564x/ab/8a/92/ab8a924d70d475d759469d9701b784f6.jpg"
            alt="Image 4"
            className="w-full md:w-60 shadow-xl rounded-full"
          />
          <img
            src="https://i.pinimg.com/564x/b6/87/06/b687068873c7cfefaeddbc88f916430c.jpg"
            alt="Image 5"
            className="w-full md:w-60 shadow-xl rounded-full"
          />
          <img
            src="https://i.pinimg.com/564x/66/86/83/668683f5a88d9834fb8b914788571213.jpg"
            alt="Image 6"
            className="w-full md:w-60 shadow-xl rounded-full"
          />{" "}
          <img
            src="https://i.pinimg.com/564x/14/96/3d/14963d56a0bad09d1204cc2e5a238488.jpg"
            alt="Image 4"
            className="w-full md:w-60 shadow-xl rounded-full"
          />
          <img
            src="https://i.pinimg.com/564x/33/65/fb/3365fbca73036f2faf99fe6ddbfd200e.jpg"
            alt="Image 5"
            className="w-full md:w-60 shadow-xl rounded-full"
          />
          <img
            src="https://i.pinimg.com/564x/02/fe/0d/02fe0d7ba9cdb93a61f7b554412bbcd8.jpg"
            alt="Image 6"
            className="w-full md:w-60 shadow-xl rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
