import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";

import {
 FaPlus,
 FaPenToSquare,
 FaTrash
} from "react-icons/fa6";

function Categories(){

const [categories,setCategories]=useState([]);

useEffect(()=>{

axios.get(
"http://localhost:8083/api/admin/categories",
{withCredentials:true}
)
.then(res=>setCategories(res.data));

},[]);

const deleteCategory=(id)=>{
axios.delete(
"http://localhost:8083/api/admin/category/"+id
)
.then(()=>window.location.reload());
}

return(

<div className="flex bg-white">

<Sidebar/>

<div className="ml-[250px] w-full min-h-screen p-8">

{/* NAVBAR */}
<div className="bg-white border shadow rounded-xl px-6 h-[80px] flex items-center mb-10">
<h2 className="text-[20px] font-medium">
Admin Dashboard
</h2>
</div>

{/* HEADING */}
<div className="flex justify-between items-center mb-4">

<h3 className="text-[22px]">
Grocery Categories
</h3>

<button
className="flex items-center gap-2 text-white px-4 py-2 rounded-md"
style={{
background:
"linear-gradient(135deg,#0cc5b7,#2bd891)"
}}
>
<FaPlus/>
Add Category
</button>

</div>

{/* FILTERS */}
<div className="flex gap-4 mb-4">

<select
className="border shadow-sm px-3 py-2 rounded-md"
>
<option>Filter by Date</option>
</select>

<button className="border shadow-sm px-4 py-2 rounded-md">
Ascending
</button>

<button className="border shadow-sm px-4 py-2 rounded-md">
Descending
</button>

</div>

{/* TABLE */}
<div className="shadow rounded-xl p-6 bg-white">

<table className="w-full text-center">

<thead className="text-[18px]">
<tr className="h-[55px] border-b">
<th>Category Name</th>
<th>Image</th>
<th>Added On</th>
<th>Action</th>
</tr>
</thead>

<tbody className="text-[16px]">

{categories.map(cat=>(

<tr
key={cat.id}
className="h-[70px] border-b"
>

<td>{cat.name}</td>

<td>
<img
src={
"http://localhost:8083/uploads/categories/"
+cat.image
}
className="w-[80px] h-[80px] object-cover border rounded-md mx-auto"
/>
</td>

<td>
{new Date(cat.createdDate)
.toLocaleDateString(
"en-GB",
{
day:"2-digit",
month:"short",
year:"numeric"
}
)}
</td>

<td className="align-middle">
  <div className="flex justify-center items-center gap-2">

<button
className="text-white p-2 rounded-md"
style={{
background:
"linear-gradient(135deg,#ff934b,#ff5e62)"
}}
>
<FaPenToSquare/>
</button>

<button
onClick={()=>deleteCategory(cat.id)}
className="text-white p-2 rounded-md"
style={{
background:
"linear-gradient(135deg,#ff934b,#ff5e62)"
}}
>
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

)
}

export default Categories;