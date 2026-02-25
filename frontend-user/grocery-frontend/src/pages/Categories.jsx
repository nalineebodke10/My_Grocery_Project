import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import Footer from "../components/Footer";
import UserNavbar from "../components/UserNavbar";

function Categories() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:8083/api/user/categories",
      { withCredentials: true })
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));

  }, []);

  return (

    <>
      {/* NAVBAR */}
      <UserNavbar />

      {/* CATEGORIES SECTION */}
      <div className="container mx-auto my-6">

        <h2
          className="text-center ml-[15%] font-bold mb-6 text-2xl"
          style={{ color: "#0a9e94" }}
        >
          Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-5 mt-6 mx-auto w-[100%] ml-[10%]">
          {categories.map(cat => (

            <div
              key={cat.id}
              className="shadow p-3 text-center bg-[#ffffff] transition-transform duration-300 hover:-translate-y-1"
              style={{
                flex: "0 0 19%",
                maxWidth: "15%",
                minWidth: "180px",
                borderRadius: "10px"
              }}
            >

              <div
                className="mx-auto overflow-hidden flex items-center justify-center"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                }}
              >

                <img
                  src={`http://localhost:8083/uploads/categories/${cat.image}`}
                  alt=""
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />

              </div>

              <h6 className="mt-3 font-semibold text-dark">
                {cat.name}
              </h6>

            </div>

          ))}

        </div>

      </div>
      <Footer />

    </>
  );
}

export default Categories;
