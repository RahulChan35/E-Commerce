import { useLoaderData } from "react-router-dom";
import axios from "axios";

// COMPONENTS
import SingleProduct from "./SingleProduct";

export const allProductsLoader = async () => {
  const products = await axios.get("/api/v1/products");
  const productsData = products.data;
  const response = { products: productsData };
  return response;
};

const AllProducts = () => {
  const { products } = useLoaderData();
  return (
    <div className="m-5 flex flex-col items-center sm:flex-row sm:flex-wrap sm:gap-1 md:gap-2 sm:place-content-center">
      {products.map((product, index) => {
        return <SingleProduct key={index} product={product} />;
      })}
    </div>
  );
};

export default AllProducts;
