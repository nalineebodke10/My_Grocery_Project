import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import axios from "axios";

function AdminUsers() {

const [users,setUsers]=useState([]);

useEffect(()=>{

axios.get("http://localhost:8083/api/admin/users")
.then(res=>setUsers(res.data));

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

<h3 className="text-[1.4rem] mb-6 font-semibold">
User Details
</h3>

<div className="shadow-xl rounded-2xl p-6 bg-white border">

<div className="overflow-x-auto">

<table className="w-full text-center">

<thead className="text-[1.2rem] border-b bg-gray-50 h-[60px]">

<tr>
<th className="py-3">#</th>
<th>Name</th>
<th>Mobile</th>
<th>Address</th>
<th>Pincode</th>
</tr>

</thead>

<tbody className="text-[1.1rem]">

{users.map((u,index)=>(

<tr key={u.id}
className="border-t h-[65px] hover:bg-gray-100 transition duration-200">

<td className="align-middle">
{index+1}
</td>

<td className="align-middle font-semibold text-[#0cc5b7]">
{u.fullName}
</td>

<td className="align-middle">
{u.mobile}
</td>

<td className="align-middle text-gray-600">
{u.address}
</td>

<td className="align-middle">
<span className="bg-gray-200 px-3 py-1 rounded-md">
{u.pincode}
</span>
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

export default AdminUsers;