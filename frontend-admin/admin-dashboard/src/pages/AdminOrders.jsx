import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { FaEye } from "react-icons/fa";

function AdminOrders() {

const [orders,setOrders]=useState([]);
const [ordersProductMap,setOrdersProductMap]=useState({});
const [selectedOrder,setSelectedOrder]=useState(null);

useEffect(()=>{

axios.get("http://localhost:8083/api/admin/orders")
.then(res=>{
setOrders(res.data.orders);
setOrdersProductMap(res.data.ordersProductMap);
});

},[]);

return(

<div className="flex">

<Sidebar/>

<div className="ml-[250px] w-full min-h-screen p-8">

{/* Navbar */}

<nav className="bg-white border shadow rounded-xl px-6 py-4 mb-10 h-[80px] flex items-center">

<h5 className="text-[1.2rem]">Admin Dashboard</h5>

</nav>

{/* Heading */}

<h3 className="text-[1.4rem] mb-6">
Order Details
</h3>

{/* Table */}

<div className="shadow rounded-xl p-6 bg-white">

<div className="overflow-x-auto">

<table className="w-full text-center">

<thead className="text-[1.2rem] border-b h-[60px]">

<tr>
<th>#</th>
<th>Order ID</th>
<th>Customer</th>
<th>Date</th>
<th>Total</th>
<th>Action</th>
<th>Status</th>
</tr>

</thead>

<tbody className="text-[1.1rem]">

{orders.map((o,index)=>(

<tr key={o.id} className="border-t h-[70px]">

<td className="align-middle">{index+1}</td>

<td className="align-middle">{o.orderId}</td>

<td className="align-middle">{o.customerName}</td>

<td className="align-middle">
{new Date(o.date).toLocaleDateString()}
</td>

<td className="align-middle">{o.totalAmount}</td>

<td className="align-middle">

<button
onClick={()=>setSelectedOrder(o.orderId)}
className="text-white p-2 rounded-md"
style={{
background:
"linear-gradient(135deg,#0cc5b7,#2bd891)"
}}>
<FaEye/>
</button>

</td>

<td className="align-middle">

<span
className="text-white px-3 py-1 rounded-md text-sm"
style={{
background:
"linear-gradient(135deg,#ff934b,#ff5e62)"
}}>
Accepted
</span>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

{/* Modal */}

{selectedOrder && (

<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

<div className="bg-white rounded-xl w-[400px] shadow-lg">

<div
className="px-4 py-3 text-white rounded-t-xl flex justify-between"
style={{
background:
"linear-gradient(135deg,#0cc5b7,#2bd891)"
}}>

<h5>
Order {selectedOrder}
</h5>

<button
onClick={()=>setSelectedOrder(null)}
className="text-white text-lg">
×
</button>

</div>

<div className="p-4">

<ul className="border rounded-md">

{ordersProductMap[selectedOrder] &&
Object.entries(
ordersProductMap[selectedOrder]
).map(([product,qty],i)=>(

<li key={i}
className="p-2 border-b">
{product} : {qty}
</li>

))}

</ul>

</div>

</div>

</div>

)}

</div>

</div>

);

}

export default AdminOrders;