import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import UserNavbar from "../components/UserNavbar";
import GroceryCard from "../components/GroceryCard";
import Footer from "../components/Footer";

function CategoryItems() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`/api/user/category/${id}/items`).then((res) => {
      const updated = res.data.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setItems(updated);
    });
  }, [id]);

  const increaseQty = (index) => {
    let arr = [...items];
    arr[index].quantity = (arr[index].quantity || 1) + 1;
    setItems(arr);
  };

  const decreaseQty = (index) => {
    let arr = [...items];
    if ((arr[index].quantity || 1) > 1) {
      arr[index].quantity = (arr[index].quantity || 1) - 1;
      setItems(arr);
    }
  };

  const addToCart = (id, qty) => {
    axios.post(`/api/user/addToCart?groceryId=${id}&quantity=${qty}`)
      .then(() => {
        window.dispatchEvent(new Event("cartUpdated"));
      });
  };

  return (
    <div className="bg-[#eefbf8] min-h-screen flex flex-col">
      <UserNavbar />

      <div className="w-[80%] mx-auto mt-6 flex-grow">
        <h2 className="text-xl font-bold text-teal-600 mb-4 text-center">
          Grocery Items
        </h2>

        {items.length === 0 ? (
  <p className="text-center text-gray-500">
    No items found for this category
  </p>
) : (
  <div className="grid grid-cols-4 gap-4">
    {items.map((item, index) => (
      <GroceryCard
        key={item.id}
        item={item}
        index={index}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        addToCart={addToCart}
      />
    ))}
  </div>
)}
      </div>

      <Footer />
    </div>
  );
}

export default CategoryItems;