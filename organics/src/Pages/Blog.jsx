import Navbar from "../Components/Navbar";

// import React from 'react'
export default function Blog() {
  let blogsdata = [
    {
      img: "https://www.viralspices.com/wp-content/uploads/2023/11/Why-choose-dehydrated-onion-manufacturers-from-India.jpg",
      heading: "     5 Essential Nutritional Benefits of Psyllium Husk",
      paragraph:
        "Benefits of Psyllium Husk Commonly found in the fields of Gujarat, psyllium husk, also known as isabgol, is one of the most effective forms of laxative there is. Psyllium husk has a variety of health benefits that we’ve known about for a long time.",
    },
    {
      img: "https://www.viralspices.com/wp-content/uploads/2023/11/How-to-Partner-with-Indian-Spice-Exporters.jpg",
      heading:
        "Whole Wheat Flour vs Regular Wheat Flour – Here’s what’s Healthier",
      paragraph:
        "When you go grocery shopping, do you reach for whole wheat flour or regular wheat flour? Making the right choice can be challenging with phrases like whole wheat, whole grain, and multigrain printed over every product. Well, don't worry, we are here to help.",
    },
    {
      img: "https://www.viralspices.com/wp-content/uploads/2023/11/Who-is-a-Leading-Cardamom-Supplier-in-India-for-Bulk-Purchase.jpg",
      heading: "5 Health Benefits of Organic Honey for Immunity",
      paragraph:
        "As they say, nothing can beat nature. With many people turning vegan, organic products are the new definition of modern living. Organic products are healthier, fresher, and richer in taste. Healthy eating has endless advantages, and considering healthy food to be tasteless is quite.",
    },
    {
      img: "https://www.viralspices.com/wp-content/uploads/2023/10/Nutritional-Benefits-of-Organic-Black-Cumin-Seeds.jpg",
      heading:
        "Is Black Salt Better than Regular Salt? Uses and Health Benefits",
      paragraph:
        "Benefits of Black Salt? Himalayan Black salt is unlike any other salt. It has a very distinct taste, and looks different too. Himalayan Black salt is first produced as Pink Salt, which is a form of rock salt. The Himalayan Pink Salt is then.",
    },
    {
      img: "https://www.viralspices.com/wp-content/uploads/2023/10/Impact-of-Climate-Change-on-Sesame-Exporter-and-Production.jpg",
      heading: "5 Different Uses of Cloves to Try at Home",
      paragraph:
        "5 different uses of clove you must try at home Clove is a pungent, aromatic spice derived from flower buds of an evergreen tree, also known as Syzygium aromaticum. Used extensively in Indian cuisine, they also feature in various sweet dishes as well. Apart.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div></div>
      <div className="w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] mx-auto">
        {blogsdata.map((ele, i) => (
          <div
            key={i}
            className="rounded-lg overflow-hidden mt-5 mb-5 shadow-md bg-white"
          >
            <img src={ele.img} alt="Image" className="w-full rounded-[20px]" />
            <div className="p-4">
              <h1 className="text-2xl text-green-500 font-semibold">
                {ele.heading}
              </h1>
              <p className="text-gray-600 mt-2">{ele.paragraph}</p>
              <button className="mt-4 text-green-500 border border-green-500 hover:bg-green-500 hover:text-white rounded-full px-4 py-2">
                Read more..
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
