import { useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import ProdReview from "./ProdReview";
import BackButton from "../Cards/BackButton";

export default function OrderReview() {
  //   const location = useLocation();
  //   console.log(location.state.cartReview);
  return (
    <>
      <Navbar />
      <div className="w-full p-4">
        <BackButton header="Review Your Order" />
        <div className="border-b"></div>
        <ProdReview />
      </div>
    </>
  );
}
