import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import Swal from 'sweetalert2'
import {
 FaList,
 FaShoppingCart,
 FaBox,
 FaUsers
} from "react-icons/fa";

function Dashboard() {

  const [categories, setCategories] = useState([]);
  const [groceries, setGroceries] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:8083/api/admin/categories")
      .then(res => setCategories(res.data));

    axios.get("http://localhost:8083/api/admin/groceries")
      .then(res => setGroceries(res.data));

    // ⭐ FINAL FIX HERE
    axios.get("http://localhost:8083/api/admin/pendingOrders",{
      withCredentials:true
    })
    .then(res => {
  setOrders(res.data);
});

  }, []);

 const confirmOrder = (id) => {

  axios.post(
    "http://localhost:8083/api/admin/confirmOrder?id="+id,
    {},
    {withCredentials:true}
  )
  .then(()=>{

  setOrders(prev =>
    prev.filter(order => order.id !== id)
  );

  Swal.fire({
    title: 'Order Accepted!',
    text: 'See this order in Orders Page',
    icon: 'success',
    confirmButtonText: 'OK'
  });

})

}

  return (
    <div className="flex">

      <Sidebar/>

      <div className="ml-[250px] w-full bg-white min-h-screen p-8">

        <nav className="bg-white border shadow rounded-lg px-5 py-4 mb-10 h-[80px] flex items-center justify-between">
          <h5 className="text-[1.2rem]">Admin Dashboard</h5>
        </nav>

        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="flex justify-between items-center p-5 rounded-xl shadow">
            <div>
              <h5>Total Categories</h5>
              <p>{categories.length}</p>
            </div>
            <FaList className="text-[#0cc5b7] text-[26px]" />
          </div>

          <div className="flex justify-between items-center p-5 rounded-xl shadow">
            <div>
              <h5>Total Products</h5>
              <p>{groceries.length}</p>
            </div>
            <FaShoppingCart className="text-[#0cc5b7] text-[26px]" />
          </div>

          <div className="flex justify-between items-center p-5 rounded-xl shadow">
            <div>
              <h5>Total Orders</h5>
              <p>{orders ? orders.length : 0}</p>
            </div>
            <FaBox className="text-[#0cc5b7] text-[26px]" />
          </div>

          <div className="flex justify-between items-center p-5 rounded-xl shadow">
            <div>
              <h5>Total Users</h5>
              <p>15</p>
            </div>
            <FaUsers className="text-[#0cc5b7] text-[26px]" />
          </div>

        </div>

        <div className="shadow p-5 rounded-xl">

          <h3 className="text-[1.4rem] mb-4">
            Pending Orders
          </h3>

          <table className="w-full text-center border-separate border-spacing-y-2">

            <thead className="text-[1.2rem]">
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="text-[1.1rem]">
             {Array.isArray(orders) && orders.map((order, index) => (

                <tr key={order.id} className="bg-gray-50 h-[60px] shadow-sm rounded-lg">

                  <td>{index+1}</td>
                  <td>{order.orderId}</td>
                  <td>{order.customerName}</td>
                  <td>{order.totalAmount}</td>

                  <td>
                    <span className="bg-yellow-400 text-white px-3 py-[3px] rounded-md text-[13px]">
                      Pending
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={()=>confirmOrder(order.id)}
                      className="text-white px-4 py-[4px] rounded-md text-[13px]"
                      style={{background:"linear-gradient(135deg,#ff934b,#ff5e62)"}}
                    >
                      Accept
                    </button>
                  </td>

                </tr>

              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;