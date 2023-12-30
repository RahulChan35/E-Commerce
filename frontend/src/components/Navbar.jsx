import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// COMPONENTS
import SideBar from "./SideBar";

// ICONS
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";

const Navbar = (props) => {
  const navigate = useNavigate();

  const [showSideBar, setShowSideBar] = useState(false);

  const { _id, name, email, walletAmount, cart } = props.user;

  const logoutUser = async () => {
    await axios.get("/api/v1/auth/logout");
    navigate("/");
  };

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div className="flex justify-end h-16 w-full bg-cyan-600">
      {showSideBar ? (
        <SideBar
          toggleSideBar={toggleSideBar}
          logoutUser={logoutUser}
          user={props.user}
        />
      ) : (
        <div className="flex place-content-between sm:hidden">
          <div>
            <MenuIcon onClick={toggleSideBar} className="text-white mt-5" />
          </div>
        </div>
      )}
      <div className="hidden w-full sm:flex sm:place-content-around text-white font-bold">
        <div className="flex items-center cursor-pointer">
          <div>
            <Link to="/home">
              <AppsOutlinedIcon />
            </Link>
          </div>
          <div>
            <h1>All Products</h1>
          </div>
        </div>
        <div className="flex items-center cursor-pointer">
          <div>
            <Link to="/home/cart">
              <ShoppingCartIcon />
            </Link>
          </div>
          <div>
            <h1>My Cart</h1>
          </div>
        </div>
        <div className="flex items-center cursor-pointer">
          <div>
            <Link to="/home/order">
              <GradingOutlinedIcon />
            </Link>
          </div>
          <div>
            <h1>My Orders</h1>
          </div>
        </div>
        <div className="flex items-center cursor-pointer">
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
        <div className="mt-4">
          <button className="bg-red-500 p-1 rounded" onClick={logoutUser}>
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
