import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminLogin(){

 const navigate = useNavigate();

 const [username,setUsername] = useState("");
 const [password,setPassword] = useState("");
 const [showPass,setShowPass] = useState(false);

const loginAdmin = (e)=>{
 e.preventDefault();

 axios.post(
  "http://localhost:8083/api/admin/login",
  {
   username:username,
   password:password
  },
  {withCredentials:true}
 )
 .then(res=>{

 if(res.data){   // ✅ LOGIN SUCCESS

  Swal.fire({
   icon:"success",
   title:"Login Successful",
   showConfirmButton:false,
   timer:1500
  }).then(()=>{
   navigate("/admin/dashboard");
  });

 }else{          // ❌ LOGIN FAILED

  Swal.fire({
   icon:"error",
   title:"Invalid Username or Password",
   confirmButtonColor:"#0cc5b7"
  });

 }

})
.catch(err=>{
 Swal.fire({
   icon: "error",
   title: "Login Failed",
   text: "Invalid Username or Password",
   confirmButtonColor: "#0cc5b7"
 });
})
}

 return(

 <div className="flex justify-center items-center h-screen bg-gray-100">

  <div className="bg-white shadow p-6 w-[400px] rounded-lg">

   <h3 className="text-center text-xl mb-4">
    Admin Login
   </h3>

   <form onSubmit={loginAdmin}>

    <div className="mb-3">
     <label>Username</label>
     <input
      type="text"
      className="w-full border p-2 rounded"
      onChange={(e)=>setUsername(e.target.value)}
      required
     />
    </div>

    <div className="mb-3">
     <label>Password</label>

     <div className="flex border rounded">
      <input
       type={showPass?"text":"password"}
       className="w-full p-2"
       onChange={(e)=>setPassword(e.target.value)}
       required
      />
      <span
       className="p-2 cursor-pointer"
       onClick={()=>setShowPass(!showPass)}
      >
       <i className="fas fa-eye"></i>
      </span>
     </div>

    </div>

    <button
     className="w-full text-white p-2 rounded"
     style={{
      background:"linear-gradient(135deg,#0cc5b7,#2bd891)"
     }}
    >
     Login
    </button>

   </form>

  </div>

 </div>

 )
}

export default AdminLogin;