import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <Link to="/register">
        <button className="bg-blue-500 p-2 rounded">REGISTER</button>
      </Link>
      <Link to="/login">
        <button className="bg-green-500 p-2 rounded">LOGIN</button>
      </Link>
    </div>
  );
};

export default Landing;
