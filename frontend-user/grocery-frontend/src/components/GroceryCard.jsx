import React from "react";

const GroceryCard = ({ item, index, increaseQty, decreaseQty, addToCart }) => {

return (

<div className="bg-[#ffffff] border border-gray-300 rounded shadow-sm p-2">

<div className="relative">

<img
src={`http://localhost:8083/uploads/groceries/${item.image}`}
className="w-full h-[180px] object-cover bg-white p-3"
/>

<span
className="absolute top-2 left-2 px-1 text-sm"
style={{
color:"rgb(10,160,149)",
backgroundColor:"rgb(244,255,255)"
}}
>
{item.discountPercent ? item.discountPercent+"%" : "0%"}
</span>

</div>

<div className="text-center mt-2">

<h6 className="text-[rgb(80,181,175)] font-bold">
{item.name}
</h6>

<p>
{item.discountPercent &&
<span className="line-through text-gray-500">
₹{item.price}
</span>
}

<span className="font-bold ml-2" style={{color:"#ff5e62"}}>
₹{item.discountedPrice || item.price}
</span>
</p>

<div
className="flex justify-center items-center mx-auto my-2"
style={{
background:"#fff4f4",
borderRadius:"50px",
width:"100px",
padding:"4px 8px"
}}
>

<button onClick={()=>decreaseQty(index)}>−</button>

<input
value={item.quantity || 1}
readOnly
className="w-[35px] text-center bg-transparent outline-none"
/>

<button onClick={()=>increaseQty(index)}>+</button>

</div>

<button
  onClick={() => addToCart(item.id, item.quantity || 1)}
  className="text-[#424242] text-sm mt-1 px-3 py-1 rounded"
  style={{ background: "linear-gradient(135deg,#ff934b 0%,#ff5e62 100%)" }}
>
  <i className="fa-solid fa-cart-shopping me-1"></i>
  Add to cart
</button>

</div>

</div>

);
};

export default GroceryCard;