import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

// PAGES
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AllProducts from "./components/AllProducts";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import CheckoutFailure from "./pages/CheckoutFailure";

// ACTIONS
import { registerAction } from "./pages/Register";
import { loginAction } from "./pages/Login";

// LOADERS
import { loader } from "./pages/Home";
import { allProductsLoader } from "./components/AllProducts";
import { cartLoader } from "./pages/Cart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Landing />} />
      <Route path="/register" element={<Register />} action={registerAction} />
      <Route path="/login" element={<Login />} action={loginAction} />
      <Route path="/home" element={<Home />} loader={loader}>
        <Route index element={<AllProducts />} loader={allProductsLoader} />
        <Route path="cart" element={<Cart />} loader={cartLoader} />
        <Route path="order" element={<Order />} />
        <Route path="checkout-failure" element={<CheckoutFailure />} />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
