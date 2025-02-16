import { Link } from "react-router-dom";
import AdminNav from "./AdminNav";
import PropTypes from "prop-types";
import { AboutOrganic } from "../Pages/Landing/Home";

export default function SuperDashBoard({ show_descrition = true }) {
  const cards = [
    {
      title: "Products",
      description:
        "Manage all listed products, add new items, update details, and remove listings as needed.",
      image:
        "https://i.pinimg.com/736x/bf/5f/ae/bf5fae190185579182ecf210327e2df3.jpg",
      route: "/adminproducts",
    },
    {
      title: "Users",
      description:
        "View and manage registered users, assign roles, deactivate accounts, and monitor user activities.",
      image:
        "https://i.pinimg.com/736x/88/17/52/8817525e87273d1299dafc1f5f8f1067.jpg",
      route: "/adminusers",
    },
    {
      title: "Orders",
      description:
        "Monitor order statuses, approve or reject transactions, manage refunds, and resolve order disputes.",
      image:
        "https://i.pinimg.com/736x/55/9b/6b/559b6b2c0fd3fd46dfcec116289215f6.jpg",
      route: "/orders",
    },
    {
      title: "Analytics",
      description:
        "Analyze sales performance, track user behavior, and generate business insights for strategic decisions.",
      image:
        "https://i.pinimg.com/736x/c8/75/76/c87576d9a43bb9fbf3e14b4f671caf93.jpg",
      route: "/admin-analytics",
    },
    {
      title: "Upcoming",
      description:
        "Stay updated on upcoming product launches, pending approvals, and scheduled orders. Plan ahead with insights.",
      image:
        "https://i.pinimg.com/736x/08/d6/06/08d60626a00cf729346aa1107f7efe12.jpg",
      route: "/upcoming",
    },
  ];

  return (
    <>
      <AdminNav />

      <div className="flex flex-col items-center space-y-4 p-6 max-w-3xl mx-auto">
        <img
          src="https://i.pinimg.com/736x/a6/19/71/a619716b7be42ceaf64215ec4b7ad1ed.jpg"
          alt="Products"
          className="w-40 h-40 rounded-lg object-cover"
        />
        <h2 className="text-3xl font-bold text-green-700 mt-2 text-center">
          Organic Store (Admin Panel)
        </h2>
        {cards.map((card, index) => (
          <Link
            to={card.route}
            key={index}
            className="flex flex-col sm:flex-row w-full max-w-2xl items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-gray-100"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-24 h-24 rounded-lg object-cover mb-2 sm:mb-0 sm:mr-4"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">{card.title}</h2>
              {show_descrition && (
                <p className="text-gray-600">{card.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {show_descrition && <AboutOrganic />}
    </>
  );
}

// ✅ Add PropTypes validation
SuperDashBoard.propTypes = {
  show_descrition: PropTypes.bool,
};

// ✅ Set a default value for `show_descrition` if it's not passed
SuperDashBoard.defaultProps = {
  show_descrition: true, // Default is `true`, you can change this as needed
};
