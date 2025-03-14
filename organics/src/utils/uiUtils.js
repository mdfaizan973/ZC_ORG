import { getSessionData } from "./utils";

export const placeHolderImage =
  "https://i.pinimg.com/736x/6e/38/b4/6e38b432924cc05c56d396b65235688e.jpg"; //https://placehold.co/400x400

export const prepare_wishlist = (wishlistProd) => {
  console.log(wishlistProd);
  const wishListData = {
    product_img: wishlistProd.image,
    product_category: wishlistProd.category,
    product_title: wishlistProd.title,
    product_id: wishlistProd._id,
    product_discount_percentage: wishlistProd.discount_percentage,
    product_discount_price_inr: wishlistProd.discount_price_inr,
    product_saler_name: wishlistProd.saler_name,
    product_saler_id: wishlistProd.saler_id,
    user_name: getSessionData("name"),
    user_id: getSessionData("_id"),
  };

  return wishListData;
};
