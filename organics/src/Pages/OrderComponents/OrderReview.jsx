import { useLocation } from "react-router-dom";
import Navbar from "../../Components/Navbar";

export default function OrderReview() {
  const location = useLocation();
  console.log(location.state.cartReview);
  return (
    <>
      <Navbar />
      <h1 className="text-lg">OrderReview</h1>
    </>
  );
}
