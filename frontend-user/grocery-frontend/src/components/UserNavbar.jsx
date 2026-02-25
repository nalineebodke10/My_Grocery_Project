import React from "react";
import { Link,useNavigate } from "react-router-dom";

function UserNavbar() {
  const navigate = useNavigate();
  return (
    <div className="p-0 m-0">
      {/* TOP HEADER */}
      <div
        className="p-4 m-0 flex justify-between flex-wrap items-center"
        style={{
          background: "linear-gradient(135deg, #0cc5b7 0%, #2bd891 100%)",
        }}
      >
        {/* LOGO */}
        <Link to="/home">
          <img
            src="/images/logo.webp"
            alt=""
            style={{
              height: "40px",
              marginLeft: "40px",
            }}
          />
        </Link>

        {/* SEARCH BOX */}
        <div
          className="flex"
          style={{
            width: "40%",
            minWidth: "250px",
            backgroundColor: "#fff",

            borderRadius: "0.375rem",
            overflow: "hidden",
          }}
        >
          <input
            type="text"
            placeholder="Enter Keyword Here ..."
            style={{
              border: "none",
              outline: "none",
              padding: "16px",
              fontSize: "16px",
              width: "100%",
            }}
          />

          <button
            style={{
              border: "none",
              color: "white",
              fontWeight: "bold",
              padding: "0 30px",
              background: "linear-gradient(135deg, #ff934b 0%, #ff5e62 100%)",
              borderTopRightRadius: "6px",
              borderBottomRightRadius: "6px",
            }}
          >
            SEARCH
          </button>
        </div>

        {/* ICONS */}
        <div className="flex">
          {/* CART */}
          <Link
            to="/cart"
            className="relative"
            style={{
              marginRight: "20px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                height: "45px",
                width: "45px",
                borderRadius: "100%",
                padding: "13px",
              }}
            >
              <i className="fa-solid fa-cart-shopping text-dark text-l"></i>
            </div>

            <span
              className="absolute text-white flex items-center justify-center"
              style={{
                height: "19px",
                width: "19px",
                borderRadius: "100%",
                top: "0",
                right: "0",
                transform: "translate(20%,-10%)",
                background: "linear-gradient(135deg, #ff934b 0%, #ff5e62 100%)",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              0
            </span>
          </Link>

          {/* USER */}
          <div
            style={{
              backgroundColor: "white",
              height: "45px",
              width: "45px",
              borderRadius: "100%",
              padding: "10px",
            }}
          >
            <i className="fa-solid fa-user text-xl"></i>
          </div>
        </div>
      </div>

      {/* MENU NAVBAR */}
      <nav
        className="bg-white shadow-sm sticky flex items-center"
        style={{
          top: "100px",
          zIndex: "1030",
          height: "50px",
        }}
      >
        {/* CENTER MENU (LIKE CONTAINER) */}
        <div className="mx-auto">
          <ul
            className="flex text-gray-600 font-bold"
            style={{
              gap: "20px",
            }}
          >
            <li>
              <Link to="/home">Home</Link>
            </li>

            <li>
              <Link to="/categories">Categories</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/shop">Shop</Link>
            </li>

            <li>
              <Link to="/order">My Orders</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* LOGIN RIGHT END */}
        <div className="absolute right-6">
          <Link to="/login">
            <button
            onClick={()=>navigate("/login")}
              className="text-white border shadow-sm"
              style={{
                padding: "4px 14px",
                background: "linear-gradient(135deg, #ff934b 0%, #ff5e62 100%)",
                borderRadius: "6px",
              }}
            >
              Login
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default UserNavbar;
