import {BrowserRouter,Routes,Route}
from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import AdminGroceries from "./pages/AdminGroceries";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

function App(){

 return(
  <BrowserRouter>

   <Routes>

    <Route path="/" element={<AdminLogin/>}/>
    <Route path="/admin/login" element={<AdminLogin/>}/>
    <Route path="/admin/dashboard" element={<Dashboard/>}/>
    <Route path="/admin/categories" element={<Categories/>}/>
    <Route path="/admin/groceries" element={<AdminGroceries/>}/>
    <Route path="/admin/orders" element={<AdminOrders/>}/>
    <Route path="/admin/users" element={<AdminUsers/>}/>

   </Routes>

  </BrowserRouter>
 )
}

export default App;