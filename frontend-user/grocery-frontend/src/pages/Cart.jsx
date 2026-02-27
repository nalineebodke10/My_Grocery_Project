import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import { Trash2 } from "lucide-react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = () => {
    axios.get("/api/user/cart").then((res) => {
      setCartItems(res.data || []);
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = (id, qty) => {
    const formData = new URLSearchParams();
    formData.append("cartId", id);
    formData.append("quantity", qty);

    axios.post("/api/user/cart/updateQuantity", formData).then(fetchCart);
  };

  const removeItem = (id) => {
    axios.delete(`/api/user/cart/${id}`).then(fetchCart);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  return (
    <div className="bg-[#eefbf8] min-h-screen">
      <UserNavbar />

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-teal-600 text-center mb-6">
          Your Cart
        </h2>

        <div className="bg-white shadow rounded-lg p-4">
          {cartItems.length === 0 ? (
            <div className="text-center">
              <img
                src="/images/empty-cart.png"
                className="mx-auto h-40"
                alt=""
              />
              <p className="text-gray-500 mt-2">No products in cart</p>
            </div>
          ) : (
            <table className="w-full text-center">
              <thead className="border-b">
                <tr>
                  <th>Image</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td>
                      <img
                        src={`/uploads/groceries/${item.groceryItem.image}`}
                        className="h-16 mx-auto"
                        alt=""
                      />
                    </td>
                    <td>{item.groceryItem.name}</td>
                    <td>₹ {item.groceryItem.price}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateQty(item.id, e.target.value)
                        }
                        className="border w-16 text-center"
                      />
                    </td>
                    <td>₹ {item.subtotal}</td>
                    <td>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-6 bg-white p-6 rounded shadow w-full md:w-1/2 ml-auto">
            <h4 className="font-semibold mb-3">Order Summary</h4>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹ {totalPrice}</span>
            </div>

            <div className="flex justify-between text-lg font-bold mt-3">
              <span>Total</span>
              <span>₹ {totalPrice}</span>
            </div>

            <button className="w-full bg-green-600 text-white py-2 mt-4 rounded">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Cart;