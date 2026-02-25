import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import UserNavbar from "../components/UserNavbar";
import GroceryCard from "../components/GroceryCard";
import Footer from "../components/Footer";

function Shop() {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8083/api/user/shop", { withCredentials: true })
      .then((res) => setGroceries(res.data))
      .catch((err) => console.log(err));
  }, []);

  const increaseQty = (index) => {
    let arr = [...groceries];
    arr[index].quantity = (arr[index].quantity || 1) + 1;
    setGroceries(arr);
  };

  const decreaseQty = (index) => {
    let arr = [...groceries];
    if ((arr[index].quantity || 1) > 1) {
      arr[index].quantity = (arr[index].quantity || 1) - 1;
      setGroceries(arr);
    }
  };

  const addToCart = (id, qty) => {
    axios
      .post(
        `http://localhost:8083/api/user/addToCart?groceryId=${id}&quantity=${qty}`,
        {},
        { withCredentials: true },
      )
      .then(() => alert("Added to cart"))
      .catch(() => alert("Login Required"));
  };

  return (
    <>
      {/* NAVBAR */}
      <UserNavbar />

      <div className="container mx-auto mt-4">
        <h2
          className="text-center font-bold mb-4 text-2xl ml-[10%]"
          style={{ color: "#0a9e94" }}
        >
          Shop
        </h2>

        <div className="grid grid-cols-4 w-[100%] gap-4 ml-[10%]">
          {groceries.map((item, index) => (
            <GroceryCard
              item={item}
              index={index}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;
