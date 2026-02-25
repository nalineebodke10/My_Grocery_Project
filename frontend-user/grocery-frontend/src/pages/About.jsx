import React from "react";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

function About() {

  return (

    <>
      {/* NAVBAR */}
      <UserNavbar />

      {/* ABOUT SECTION */}
      <section
        className="py-5"
        style={{
          background: "#fff",
          minHeight: "400px",
          boxShadow: "2px 2px 2px 2px #f5f5f5"
        }}
      >

        <h2
          className="text-center font-bold mb-4 text-2xl"
          style={{ color: "#0a9e94" }}
        >
          About Us
        </h2>

        <div className="w-[80%] mx-auto flex flex-col md:flex-row items-center gap-6 mt-6">

          {/* LEFT IMAGE */}
          <div
            className="md:w-1/2"
            style={{
              background:
                "url('/images/aboutUs_img.jpeg') no-repeat center center",
              backgroundSize: "cover",
              minHeight: "400px",
              width: "550px",
              borderRadius: "10px"
            }}
          ></div>

          {/* RIGHT TEXT */}
          <div className="md:w-1/2 pl-4">

            <h2 className="text-xl font-bold text-orange-500">
              Save more with GO! We give you the lowest prices on all your grocery needs.
            </h2>

            <h5 className="mt-4 font-bold">Our Vision</h5>
            <p className="text-gray-600">
              It is a long established fact that a reader will be distracted by the readable
              content of a page when looking at its layout. The point of using Lorem Ipsum is that
              it has a more-or-less normal distribution of letters, as opposed to using 'Content
              here'.
            </p>

            <h5 className="mt-4 font-bold">Our Goal</h5>
            <p className="text-gray-600">
              When looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
              normal distribution of letters, as opposed to using 'Content here'. Lorem Ipsum has been
              the industry's standard dummy text ever since.
            </p>

          </div>

        </div>

      </section>

      {/* WHAT WE PROVIDE */}
      <section className="py-5 text-center ml-[10%]" style={{ background: "#f0fafa" }}>

        <h2 className="font-bold text-2xl">What We Provide?</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <div className="container mx-auto flex flex-wrap justify-center mt-5">

          <div className="w-full md:w-1/3 mb-4">
            <i className="fas fa-shopping-bag text-4xl text-green-500 mb-3"></i>
            <h5 className="font-bold">Best Prices & Offers</h5>
            <p className="text-gray-600 text-sm">
              There are many variations of passages of Lorem Ipsum available.
            </p>
          </div>

          <div className="w-full md:w-1/3 mb-4">
            <i className="fas fa-globe text-4xl text-green-500 mb-3"></i>
            <h5 className="font-bold">Wide Assortment</h5>
            <p className="text-gray-600 text-sm">
              Lorem Ipsum is simply dummy text of the printing industry.
            </p>
          </div>

          <div className="w-full md:w-1/3 mb-4">
            <i className="fas fa-undo-alt text-4xl text-green-500 mb-3"></i>
            <h5 className="font-bold">Easy Returns</h5>
            <p className="text-gray-600 text-sm">
              It is a long established fact that a reader will be distracted.
            </p>
          </div>

          <div className="w-full md:w-1/3 mb-4">
            <i className="fas fa-truck text-4xl text-green-500 mb-3"></i>
            <h5 className="font-bold">Free & Next Day Delivery</h5>
            <p className="text-gray-600 text-sm">
              Contrary to popular belief, Lorem Ipsum is not random text.
            </p>
          </div>

          <div className="w-full md:w-1/3 mb-4">
            <i className="fas fa-smile text-4xl text-green-500 mb-3"></i>
            <h5 className="font-bold">100% Satisfaction Guarantee</h5>
            <p className="text-gray-600 text-sm">
              There are many variations of passages available.
            </p>
          </div>

          <div className="w-full md:w-1/3 mb-4">
            <i className="fas fa-tags text-4xl text-green-500 mb-3"></i>
            <h5 className="font-bold">Great Daily Deals Discount</h5>
            <p className="text-gray-600 text-sm">
              It is a long established fact that a reader will be distracted.
            </p>
          </div>

        </div>

      </section>
      <Footer />

    </>
  );
}

export default About;
