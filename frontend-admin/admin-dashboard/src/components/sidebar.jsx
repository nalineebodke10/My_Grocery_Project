import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import {
  FaHome,
  FaList,
  FaShoppingBasket,
  FaBox,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();

const logout = () => {

 Swal.fire({
   title: "Are you sure?",
   text: "Do you want to logout?",
   icon: "warning",

   showCancelButton: true,          // 🔥 this shows buttons ALWAYS
   confirmButtonColor: "#0cc5b7",
   cancelButtonColor: "#d33",

   confirmButtonText: "Yes Logout",
   cancelButtonText: "Cancel"
 })
 .then((result) => {

   if (result.isConfirmed) {

     axios.get("http://localhost:8083/api/admin/logout", {
       withCredentials:true
     })
     .then(()=>{

       Swal.fire({
         icon:"success",
         title:"Logged Out!",
         showConfirmButton:false,
         timer:1500
       }).then(()=>{
         navigate("/admin/login");
       });

     });

   }

 });

};

  return (

    <div className="fixed top-0 left-0 w-[250px] h-screen bg-black text-white">

      <h4 className="text-center py-5 text-[1.4rem] font-bold">
        GroceryShop
      </h4>

      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-3 px-5 py-4
${isActive ? "bg-[#1c1c1c]" : ""}
hover:bg-[#1c1c1c]`}
      >
        <FaHome />
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/categories"
        className={({ isActive }) =>
          `flex items-center gap-3 px-5 py-4
${isActive ? "bg-[#1c1c1c]" : ""}
hover:bg-[#1c1c1c]`}
      >
        <FaList />
        Categories
      </NavLink>

      <NavLink
        to="/admin/groceries"
        className={({ isActive }) =>
          `flex items-center gap-3 px-5 py-4
${isActive ? "bg-[#1c1c1c]" : ""}
hover:bg-[#1c1c1c]`}
      >
        <FaShoppingBasket />
        Groceries
      </NavLink>

      <NavLink
        to="/admin/orders"
        className={({ isActive }) =>
          `flex items-center gap-3 px-5 py-4
${isActive ? "bg-[#1c1c1c]" : ""}
hover:bg-[#1c1c1c]`}
      >
        <FaBox />
        Orders
      </NavLink>

      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          `flex items-center gap-3 px-5 py-4
${isActive ? "bg-[#1c1c1c]" : ""}
hover:bg-[#1c1c1c]`}
      >
        <FaUser />
        Users
      </NavLink>
      <button
onClick={logout}
className="flex w-full items-center gap-3 px-5 py-4
hover:bg-[#1c1c1c] transition-all duration-200">

<FaSignOutAlt className="text-lg"/>
<span>Logout</span>

</button>

    </div>

  );

}

export default Sidebar;