import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage";
import Cart from "./pages/Cart";
import CategoryItems from "./pages/CategoryItems";

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ DEFAULT ROUTE */}
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contact" element={<Contact />} />
       <Route path="/login" element={<AuthPage/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:id" element={<CategoryItems />} />
      </Routes>
    </Router>
  );
}

export default App;