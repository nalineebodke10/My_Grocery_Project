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
const [showModal,setShowModal]=useState(false);
const [name,setName]=useState("");
const [image,setImage]=useState(null);

// -------- EDIT STATES --------
const [editId,setEditId]=useState(null);
const [editName,setEditName]=useState("");
const [editImage,setEditImage]=useState(null);
const [showEditModal,setShowEditModal]=useState(false);
const [successMsg,setSuccessMsg]=useState("");

// ---------------- FETCH ALL ----------------
const fetchCategories = () => {

axios.get(
"http://localhost:8083/api/admin/categories",
{withCredentials:true}
)
.then(res=>setCategories(res.data));

}

// ---------------- INITIAL LOAD ----------------
useEffect(()=>{
fetchCategories();
},[]);

// ---------------- ADD CATEGORY ----------------
const saveCategory = () => {

const formData = new FormData();

formData.append("name",name);
formData.append("imageFile",image);

axios.post(
"http://localhost:8083/api/admin/category/save",
formData,
{
headers:{
"Content-Type":"multipart/form-data"
},
withCredentials:true
}
)
.then(()=>{
fetchCategories();
setShowModal(false);
setName("");
setImage(null);
});

}

// ---------------- DELETE ----------------
const deleteCategory=(id)=>{

axios.delete(
"http://localhost:8083/api/admin/category/"+id,
{withCredentials:true}
)
.then(()=>{
fetchCategories();
});

}

// ---------------- EDIT OPEN ----------------
const openEditModal = (cat) => {
setEditId(cat.id);
setEditName(cat.name);
setShowEditModal(true);
}

// ---------------- UPDATE CATEGORY ----------------
const updateCategory = () => {

const formData = new FormData();
formData.append("id",editId);
formData.append("name",editName);

if(editImage){
formData.append("imageFile",editImage);
}

axios.post(
"http://localhost:8083/api/admin/category/update",
formData,
{
headers:{
"Content-Type":"multipart/form-data"
},
withCredentials:true
}
)
.then(()=>{
fetchCategories();
setShowEditModal(false);
setSuccessMsg("Category Updated Successfully");

setTimeout(()=>{
setSuccessMsg("");
},2000);
});

}

// ---------------- ASC ----------------
const sortAsc = () => {

axios.get(
"http://localhost:8083/api/admin/categories?order=asc",
{withCredentials:true}
)
.then(res=>setCategories(res.data));

}

// ---------------- DESC ----------------
const sortDesc = () => {

axios.get(
"http://localhost:8083/api/admin/categories?order=desc",
{withCredentials:true}
)
.then(res=>setCategories(res.data));

}

// ---------------- DATE FILTER ----------------
const filterByDate = (value) => {

axios.get(
"http://localhost:8083/api/admin/categories?dateFilter="+value,
{withCredentials:true}
)
.then(res=>setCategories(res.data));

}

return(

<div className="flex bg-white">

<Sidebar/>

<div className="ml-[250px] w-full min-h-screen p-8">

<div className="bg-white border shadow rounded-xl px-6 h-[80px] flex items-center mb-10">
<h2 className="text-[20px] font-medium">
Admin Dashboard
</h2>
</div>

<div className="flex justify-between items-center mb-4">

<h3 className="text-[22px]">
Grocery Categories
</h3>

<button
onClick={()=>setShowModal(true)}
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

<div className="flex gap-4 mb-4">

<select
onChange={(e)=>filterByDate(e.target.value)}
className="border shadow-sm px-3 py-2 rounded-md"
>
<option value="">Filter by Date</option>
<option value="today">Today</option>
<option value="yesterday">Yesterday</option>
<option value="thisWeek">This Week</option>
<option value="thisMonth">This Month</option>
</select>

<button
onClick={sortAsc}
className="border shadow-sm px-4 py-2 rounded-md"
>
Ascending
</button>

<button
onClick={sortDesc}
className="border shadow-sm px-4 py-2 rounded-md"
>
Descending
</button>

</div>

{/* SUCCESS MESSAGE */}
{successMsg && (
<div className="bg-green-500 text-white px-4 py-2 rounded mb-3 w-fit">
{successMsg}
</div>
)}

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

<tr key={cat.id} className="h-[70px] border-b">

<td>{cat.name}</td>

<td>
<img
src={cat.image}
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
onClick={()=>openEditModal(cat)}
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

{/* ADD MODAL */}
{showModal && (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
<div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
<h2 className="text-lg mb-4 font-semibold">
Add Category
</h2>

<input
type="text"
placeholder="Category Name"
onChange={(e)=>setName(e.target.value)}
className="border px-3 py-2 w-full mb-3 rounded-md"
/>

<input
type="file"
onChange={(e)=>setImage(e.target.files[0])}
className="border px-3 py-2 w-full mb-4 rounded-md"
/>

<div className="flex justify-end gap-2">

<button
onClick={()=>setShowModal(false)}
className="px-4 py-2 bg-gray-400 text-white rounded-md"
>
Cancel
</button>

<button
onClick={saveCategory}
className="px-4 py-2 text-white rounded-md"
style={{
background:
"linear-gradient(135deg,#0cc5b7,#2bd891)"
}}
>
Save
</button>

</div>

</div>
</div>
)}

{/* EDIT MODAL */}
{showEditModal && (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
<div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
<h2 className="text-lg mb-4 font-semibold">
Edit Category
</h2>

<input
type="text"
value={editName}
onChange={(e)=>setEditName(e.target.value)}
className="border px-3 py-2 w-full mb-3 rounded-md"
/>

<input
type="file"
onChange={(e)=>setEditImage(e.target.files[0])}
className="border px-3 py-2 w-full mb-4 rounded-md"
/>

<div className="flex justify-end gap-2">

<button
onClick={()=>setShowEditModal(false)}
className="px-4 py-2 bg-gray-400 text-white rounded-md"
>
Cancel
</button>

<button
onClick={updateCategory}
className="px-4 py-2 text-white rounded-md"
style={{
background:
"linear-gradient(135deg,#0cc5b7,#2bd891)"
}}
>
Update
</button>

</div>

</div>
</div>
)}

</div>
</div>
)
}

export default Categories;