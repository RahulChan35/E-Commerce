import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData, useNavigate, Link } from "react-router-dom";

// COMPONENTS
import SingleCartItem from "../components/SingleCartItem";

// ICONS
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

export const cartLoader = async () => {
  const response = await axios.get("/api/v1/carts/cartItems");
  return response.data;
};

const Cart = () => {
  const navigate = useNavigate();

  const cartItems = useLoaderData();

  const [total, setTotal] = useState();

  const calculateTotal = () => {
    let amount = 0;
    cartItems.map((item) => {
      amount += item.price;
    });
    setTotal(amount);
  };

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const handleCheckout = async () => {
    await axios
      .post("/api/v1/checkout/create-checkout-session", cartItems)
      .then(async (response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
          await axios.delete("/api/v1/carts/clear-cart");
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      {cartItems.length > 0 && (
        <h1 className="text-center mt-3">
          Total Payable: Rs. {total}/-
          <span>
            <button
              className="cursor-pointer font-bold bg-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white p-1 rounded-md"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </span>
        </h1>
      )}
      <div className="m-5 flex flex-col items-center sm:flex-row sm:flex-wrap sm:gap-1 md:gap-2 sm:place-content-center">
        {cartItems.length > 0 ? (
          cartItems.map((product, index) => {
            return (
              <SingleCartItem key={index} product={product} total={total} />
            );
          })
        ) : (
          <div className="flex flex-col">
            <div className="m-10 w-32 bg-red-200 text-red-600 font-semibold rounded p-1 pl-4">
              Cart is Empty
            </div>
            <h1>
              <Link to="/home">
                {"---> "}Start Shopping
                <span>
                  <LocalMallOutlinedIcon className="bg-blue-200 text-blue-600 rounded p-1" />
                </span>
                {" <---"}
              </Link>
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
