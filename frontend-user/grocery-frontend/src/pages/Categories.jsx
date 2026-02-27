import React, { useState } from "react";
import axios from "../axiosConfig";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer";

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

    axios.post("/api/contact", form)
      .then((res) => {
        setSuccessMsg("Message Sent Successfully!");
        setErrorMsg("");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setErrorMsg("Error Sending Message!");
        setSuccessMsg("");
      });
  };

  return (
    <div className="bg-[#eefbf8] min-h-screen flex flex-col">
      <UserNavbar />

      {/* HERO */}
      <div
        className="h-[250px] flex items-center justify-center text-white text-5xl font-bold "
        style={{
          background:
            "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('https://img.freepik.com/free-photo/flat-lay-desk-concept-with-copy-space_23-2148459750.jpg') center/cover no-repeat",
        }}
      >
        Get in Touch With Us
      </div>

      {/* CONTENT */}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto py-10 px-4">

          {/* INFO CARDS */}
          <div className="grid md:grid-cols-4 gap-6 mb-10">

  {/* ADDRESS */}
  <div className="bg-white rounded-xl shadow p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">
    <i className="bi bi-geo-alt-fill text-[40px] text-blue-500"></i>
    <h5 className="mt-3 font-bold">Our Address</h5>
    <p className="text-gray-600 text-sm">123 Main Street, Pune, India</p>
  </div>

  {/* CALL */}
  <div className="bg-white rounded-xl shadow p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">
    <i className="bi bi-telephone-fill text-[40px] text-green-500"></i>
    <h5 className="mt-3 font-bold">Call Us</h5>
    <p className="text-gray-600 text-sm">+91 87672 02017</p>
  </div>

  {/* EMAIL */}
  <div className="bg-white rounded-xl shadow p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">
    <i className="bi bi-envelope-fill text-[40px] text-red-500"></i>
    <h5 className="mt-3 font-bold">Email Us</h5>
    <p className="text-gray-600 text-sm">
      <a href="mailto:rahuldaware2510@gmail.com" className="hover:underline">
        Contact Us
      </a>
    </p>
  </div>

  {/* LINKEDIN */}
  <div className="bg-white rounded-xl shadow p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg">
    <i className="bi bi-linkedin text-[40px] text-blue-500"></i>
    <h5 className="mt-3 font-bold">LinkedIn</h5>
    <p className="text-gray-600 text-sm">
      <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        Visit Our LinkedIn
      </a>
    </p>
  </div>

</div>

          {/* FORM + IMAGE */}
          <div className="grid md:grid-cols-2 gap-6 items-stretch">

            {/* IMAGE */}
            <img
              src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-2299.jpg"
              className="rounded-xl shadow w-full h-full object-cover"
              alt=""
            />

            {/* FORM */}
            <div className="bg-white p-6 rounded-xl shadow flex flex-col">
              <h4 className="text-center font-bold mb-4">
                Send Us a Message
              </h4>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="border rounded-md p-2"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="border rounded-md p-2"
                  required
                />

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="border rounded-md p-2 h-32"
                  required
                />

                <button
                  type="submit"
                  className="text-white py-2 rounded-md mt-auto"
                  style={{
                    background:
                      "linear-gradient(135deg,#ff934b 0%,#ff5e62 100%)",
                  }}
                >
                  Submit
                </button>

                {successMsg && (
                  <p className="text-green-600">{successMsg}</p>
                )}
                {errorMsg && (
                  <p className="text-red-600">{errorMsg}</p>
                )}

              </form>
            </div>
          </div>

          {/* MAP */}
          <div className="mt-10">
            <iframe
              className="w-full rounded shadow"
              height="280"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.715792812403!2d73.85674331436935!3d18.52043037340688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06a7a3eaaa9%3A0xa7a5ed9fddf65b!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1679986750099"
              loading="lazy"
              title="map"
            />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;