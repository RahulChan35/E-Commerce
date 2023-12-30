import { useLoaderData, Outlet } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import Navbar from "../components/Navbar";

export const loader = async () => {
  const user = await axios.get("/api/v1/users/current-user");
  const userData = user.data;
  const response = { user: userData };
  return response;
};

const Home = () => {
  const { user } = useLoaderData();
  return (
    <div>
      <Navbar user={user} />
      <Outlet />
    </div>
  );
};

export default Home;
