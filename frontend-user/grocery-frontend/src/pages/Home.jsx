import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import UserNavbar from "../components/UserNavbar";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import GroceryCard from "../components/GroceryCard";

function Home() {
  const [categories, setCategories] = useState([]);
  const [topOffers, setTopOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/user/categories", {
        withCredentials: true,
      })
      .then((res) => setCategories(res.data));

    axios
      .get("/api/user/home", { withCredentials: true })
      .then((res) => {
        const updated = res.data.map((item) => ({
          ...item,
          quantity: 1,
        }));

        setTopOffers(updated);
      });
  }, []);

  const increaseQty = (index) => {
    let arr = [...topOffers];
    arr[index].quantity = (arr[index].quantity || 1) + 1;
    setTopOffers(arr);
  };

  const decreaseQty = (index) => {
    let arr = [...topOffers];
    if ((arr[index].quantity || 1) > 1) {
      arr[index].quantity = (arr[index].quantity || 1) - 1;
      setTopOffers(arr);
    }
  };

 const addToCart = async (id, qty) => {
  try {
    await axios.post(`/api/user/addToCart?groceryId=${id}&quantity=${qty}`);

    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      timer: 1500,
      showConfirmButton: false,
    });

    // ⭐ Navbar ko update signal
    window.dispatchEvent(new Event("cartUpdated"));

  } catch (err) {
    if (err.response && err.response.status === 401) {
      Swal.fire({
        icon: "warning",
        title: "Login Required!",
        text: "Please login to add items",
        confirmButtonColor: "#ff5e62",
      }).then(() => {
        navigate("/login");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
      });
    }
  }
};

  return (
    <div className="bg-white">
      <UserNavbar />

      {/* CATEGORY SLIDER */}
      <div className="mt-4 px-5 relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={0}
          slidesPerView={8}
          watchOverflow={false}
          loop={true}
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id}>
              <div className="text-center">
                {/* ROUND CARD */}
                <div
                  className="bg-white rounded-full shadow flex items-center justify-center mx-auto cursor-pointer"
                  style={{
                    width: "90px",
                    height: "90px",
                    padding: "17px",
                    transition: "transform 0.3s ease",
                  }}
                  onClick={() => navigate(`/category/${cat.id}`)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <img
                    src={`/uploads/categories/${cat.image}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* NAME */}
                <h6 className="mt-2 text-gray-600 font-semibold cursor-pointer">
                  {cat.name}
                </h6>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-8 px-2">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          className="bannerSwiper"
        >
          <SwiperSlide>
            <img
              src="/images/banner1.webp"
              alt=""
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="/images/banner2.webp"
              alt=""
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Top Offers */}
      <div className="bg-[#eefbf8] pb-10 pt-5">
        <div className="w-[80%] mx-auto mt-6 ">
          <h4 className="text-[rgb(10,160,149)] text-xl font-bold mb-4">
            Best Offers View
          </h4>

          <div className="grid grid-cols-4 gap-4">
            {topOffers.map((item, index) => (
              <GroceryCard
                key={item.id}
                item={item}
                index={index}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap bg-[#eefbf8] ">
        <img src="/images/home_page_img.jpg" className="max-w-[50%] w-full" />

        <img
          src="/images/home_page_img_2.webp"
          className="max-w-[50%] w-full"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
