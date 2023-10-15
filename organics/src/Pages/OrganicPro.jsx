import { useState, useEffect } from "react";

import OrgPro from "./Cards/OrgPro";
import axios from "axios";
export default function OrganicPro() {
  const [orgData, setOrgData] = useState([]);

  const getData = () => {
    axios
      .get("http://localhost:3030/orgproducts?_limit=9&_page=5")
      .then((res) => {
        console.log(res.data);
        setOrgData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="mt-1 flex justify-center items-center cursor-pointer shadow-lg shadow-grey-800">
        <img
          src="https://www.omfoods.com/cdn/shop/files/OMFOODS_ORGANIC_INGREDIENTS.jpg?v=1681412891"
          alt="Healthy Food Banner"
          className=""
        />
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {orgData.map((ele, i) => (
          <OrgPro
            key={i}
            title={ele.title}
            image={ele.image}
            price={ele.price_inr}
          />
        ))}
      </div>
    </div>
  );
}
