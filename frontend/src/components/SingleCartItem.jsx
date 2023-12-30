import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// ICONS
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";

const SingleCartItem = (props) => {
  const navigate = useNavigate();

  const { _id, title, picture, price, ratings, createdAt } = props.product;

  const removeFromCart = async (productId) => {
    const response = await axios.delete(
      `/api/v1/carts/removeFromCart/${productId}`
    );
    toast.success(response.data.msg);
    navigate("/home/cart");
  };

  return (
    <div className="rounded p-2 flex place-content-around h-56 sm:w-72 md:w-5/12 lg:w-3/12 border-2 shadow-sm w-11/12">
      <img src={picture} alt={title} className="h-full w-1/3" />
      <div className="flex flex-col place-content-around ml-5">
        <h1 className="text-xl font-medium">{title}</h1>
        <h3>
          <span className="w-7 bg-blue-100 text-blue-600 font-bold text-xs p-0.5 rounded-sm">
            price
          </span>
          {" Rs. "}
          {price}/-
        </h3>
        <p>
          <span className="w-7 bg-yellow-100 text-yellow-600 font-bold text-xs p-0.5 rounded-sm">
            Ratings
          </span>{" "}
          {ratings}/5
        </p>
        <div className="w-full flex place-content-around">
          <div
            className="w-5/12 cursor-pointer text-red-600 hover:text-red-200 bg-red-200 hover:bg-red-600 rounded text-center p-1"
            onClick={() => removeFromCart(_id)}
          >
            <RemoveShoppingCartOutlinedIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCartItem;
