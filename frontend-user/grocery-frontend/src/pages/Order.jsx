import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import UserNavbar from "../components/UserNavbar";

function Order() {

const [orders,setOrders] = useState([]);

useEffect(()=>{

axios.get("http://localhost:8083/api/user/orders",
{withCredentials:true})
.then(res=>setOrders(res.data))
.catch(err=>console.log(err));

},[]);

return(

<>

<UserNavbar/>

<div className="container my-4">

<h2
 className="text-center font-bold mb-4 text-2xl ml-[15%]"
          style={{ color: "#0a9e94" }}
>
My Order
</h2>

{orders.length===0 && (
<div className="text-center ml-[15%]">
<h1 className="text-danger">
You have no orders yet.
</h1>
</div>
)}

{orders.map((o)=>(
<div
key={o.id}
className="shadow p-4 bg-white rounded mb-4"
>

<div className="d-flex justify-content-between mb-3">

<div style={{fontSize:"15px"}}>
<strong>Order ID:</strong> {o.orderId} <br/>
<strong>Date:</strong> {o.date}
</div>

<div style={{fontSize:"15px"}}>

<strong>Status:</strong>

{o.status==="Pending" &&
<span className="badge bg-danger ms-2">
Pending
</span>
}

{o.status==="Confirmed" &&
<span className="badge bg-success ms-2">
Confirmed
</span>
}

<br/>

<strong>Total:</strong> ₹ {o.totalAmount}

</div>

</div>

<table className="table cart-table">

<thead className="table-light">
<tr>
<th>Image</th>
<th>Item</th>
<th>Price</th>
<th>Quantity</th>
<th>Subtotal</th>
</tr>
</thead>

<tbody>

{o.orderItems.map((item)=>(
<tr key={item.id}>

<td>
<img
src={`http://localhost:8083/uploads/groceries/${item.groceryItem.image}`}
className="card-img-top"
style={{width:"80px"}}
/>
</td>

<td>{item.groceryItem.name}</td>

<td>
₹ {item.groceryItem.price}
</td>

<td>{item.quantity}</td>

<td>
₹ {item.groceryItem.price * item.quantity}
</td>

</tr>
))}

</tbody>

</table>

</div>
))}

</div>

</>

);

}

export default Order;