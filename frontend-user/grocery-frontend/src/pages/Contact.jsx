import React, { useState } from "react";
import axios from "../axiosConfig";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  console.log("FORM DATA 👉", form);   // 👈 add this

  axios.post("/api/contact", form)
    .then((res) => {
      console.log("SUCCESS 👉", res.data);
      setSuccessMsg("Message Sent Successfully!");
    })
    .catch((err) => {
      console.log("ERROR 👉", err);
      setErrorMsg("Error Sending Message!");
    });
};


  return (
    <>
      <UserNavbar />

      <div className="contact-hero relative z-0 flex items-center justify-center text-white">
        <h1 className="text-white fw-bold pt-[5%]" style={{ fontSize: "40px" }}>
          Get in Touch With Us
        </h1>
      </div>

      <div className="container py-2 w-[120%] mx-auto flex flex-col items-center justify-center relative z-10">
        <div className="mt-5 px-5">
          <div className="grid grid-cols-4 gap-5 ml-[8%] w-[110%]">
            <div className="shadow text-center p-6 rounded-xl bg-white">
              <i className="bi bi-geo-alt-fill text-4xl text-blue-500"></i>
              <h5 className="mt-3 font-semibold">Our Address</h5>
              <p>123 Main Street, Pune, India</p>
            </div>

            <div className="shadow text-center p-6 rounded-xl bg-white">
              <i className="bi bi-telephone-fill text-4xl text-green-500"></i>
              <h5 className="mt-3 font-semibold">Call Us</h5>
              <p>+91 87672 02017</p>
            </div>

            <div className="shadow text-center p-6 rounded-2xl bg-white w-full h-full">
              <div className="flex flex-col items-center justify-center">
                <i className="bi bi-envelope-fill text-4xl text-red-500"></i>

                <h5 className="mt-3 font-semibold text-lg">Email Us</h5>

                <p className="text-gray-600 break-words">
                  rahuldaware2510@gmail.com
                </p>
              </div>
            </div>

            <div className="shadow text-center p-6 rounded-xl bg-white">
              <i className="bi bi-linkedin text-4xl text-blue-500"></i>
              <h5 className="mt-3 font-semibold">LinkedIn</h5>
              <p>Visit Our LinkedIn</p>
            </div>
          </div>
        </div>

        <div className="w-[130%] flex justify-center">
          <div
            className="flex flex-col md:flex-row 
                  items-center 
                  justify-center 
                  max-w-6xl 
                  w-full 
                  gap-4 px-0 ml-[18%] mt-0"
          >
            {/* LEFT IMAGE */}
            <div className="w-full h-[80%] md:w-1/2">
              <img
                src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-2299.jpg"
                className="w-full h-full object-cover rounded-xl shadow-lg"
                alt=""
              />
            </div>

            {/* RIGHT FORM */}
            <div className="w-full md:w-1/2 h-[80%]">
              <div className="bg-white p-6 rounded-xl h-full shadow-lg w-full">
                <h4 className="text-center font-bold mb-4">
                  Send Us a Message
                </h4>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="border rounded-md p-2 outline-none"
                    placeholder="Your Name"
                    required
                  />

                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="border rounded-md p-2 outline-none"
                    placeholder="Your Email"
                    required
                  />

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="border rounded-md p-2 outline-none h-28"
                    placeholder="Your Message"
                    required
                  />

                  <button
                    type="submit"
                    className="text-white py-2 rounded-md mt-2"
                    style={{
                      background:
                        "linear-gradient(135deg,#ff934b 0%,#ff5e62 100%)",
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className=" w-[106%] ml-[22%]">
          <iframe
            className="w-full rounded shadow"
            height="280px"
            width="1000px"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.715792812403!2d73.85674331436935!3d18.52043037340688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06a7a3eaaa9%3A0xa7a5ed9fddf65b!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1679986750099"
            loading="lazy"
            title="map"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;