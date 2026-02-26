import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

function AdminGroceries() {

const [groceries,setGroceries]=useState([]);

useEffect(()=>{

axios.get("http://localhost:8083/api/admin/groceries")
.then(res=>setGroceries(res.data));

},[]);

const deleteGrocery=(id)=>{

axios.delete("http://localhost:8083/api/admin/grocery/"+id)
.then(()=>window.location.reload());

};

return(

<div className="flex">

<Sidebar/>

<div className="ml-[250px] w-full min-h-screen p-8">

{/* Navbar */}

<nav className="bg-white border shadow rounded-xl px-6 py-4 mb-10 h-[80px] flex items-center justify-between">

<h5 className="text-[1.2rem]">Admin Dashboard</h5>

</nav>

{/* Heading */}

<div className="flex justify-between items-center mb-4">

<h3 className="text-[1.4rem]">
Grocery Items
</h3>

<button
className="px-4 py-2 text-white rounded-md"
style={{
background:"linear-gradient(135deg,#0cc5b7,#2bd891)"
}}>
+ Add Grocery
</button>

</div>

{/* Table */}

<div className="shadow rounded-xl p-5 bg-white">

<div className="overflow-x-auto">

<table className="w-full text-center">

<thead className="text-[1.2rem] h-[60px] border-b">

<tr>

<th className="py-3">Name</th>
<th className="py-3">Image</th>
<th className="py-3">Category</th>
<th className="py-3">Price</th>
<th className="py-3">Discount (%)</th>
<th className="py-3">Discounted Price</th>
<th className="py-3">Quantity</th>
<th className="py-3">Action</th>

</tr>

</thead>

<tbody className="text-[1.1rem]">

{groceries.map(g=>(

<tr key={g.id} className="border-t h-[80px]">

<td className="align-middle">{g.name}</td>

<td className="align-middle">
<img
src={"http://localhost:8083/uploads/groceries/"+g.image}
className="w-[70px] h-[70px] mx-auto rounded-md border object-cover"
/>
</td>

<td className="align-middle">
{g.category?g.category.name:"N/A"}
</td>

<td className="align-middle">{g.price}</td>

<td className="align-middle">
{g.discountPercent?g.discountPercent+"%":"0%"}
</td>

<td className="align-middle">
{g.discountedPrice?g.discountedPrice:g.price}
</td>

<td className="align-middle">{g.quantity}</td>

<td className="align-middle">

<div className="flex justify-center items-center gap-2">

<button
className="text-white p-2 rounded-md"
style={{
background:
"linear-gradient(135deg,#ff934b,#ff5e62)"
}}>
<FaEdit/>
</button>

<button
onClick={()=>deleteGrocery(g.id)}
className="text-white p-2 rounded-md"
style={{
background:
"linear-gradient(135deg,#ff934b,#ff5e62)"
}}>
<FaTrash/>
</button>

</div>

</td>

</tr>

))}

</tbody>

</table>
</div>

</div>

</div>

</div>

);

}

export default AdminGroceries;