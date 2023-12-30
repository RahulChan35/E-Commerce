import { Link } from "react-router-dom";

// ICONS
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";

const SideBar = (props) => {
  const { toggleSideBar } = props;
  const { logoutUser } = props;
  const { _id, name, email, walletAmount, cart } = props.user;
  return (
    <div className="h-80 bg-white shadow w-full relative flex flex-col place-content-around font-bold">
      <div className="absolute right-0.5 top-0.5">
        <CloseIcon onClick={toggleSideBar} className="text-red-500" />
      </div>
      <div className="flex items-center cursor-pointer" onClick={toggleSideBar}>
        <div>
          <Link to="/home">
            <AppsOutlinedIcon />
          </Link>
        </div>
        <div>
          <h1>All Products</h1>
        </div>
      </div>
      <div className="flex items-center" onClick={toggleSideBar}>
        <div>
          <Link to="/home/cart">
            <ShoppingCartIcon />
          </Link>
        </div>
        <div>
          <h1>My Cart</h1>
        </div>
      </div>
      <div className="flex items-center cursor-pointer" onClick={toggleSideBar}>
        <div>
          <Link to="/home/order">
            <GradingOutlinedIcon />
          </Link>
        </div>
        <div>
          <h1>My Orders</h1>
        </div>
      </div>
      <div className="flex items-center cursor-pointer" onClick={toggleSideBar}>
        <div>
          <AccountBalanceWalletIcon />
        </div>
        <div>
          <h1>Wallet</h1>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <AccountBoxIcon />
        </div>
        <div className="flex flex-col items-start">
          <p>{name}</p>
          <p>{email}</p>
        </div>
      </div>
      <div>
        <button className="bg-red-500 p-1 rounded" onClick={logoutUser}>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default SideBar;
