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
            Heading
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
    </div>
  );
}
