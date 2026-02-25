import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function AuthPage() {
    const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const [loginData, setLoginData] = useState({
    mobile: "",
    password: "",
  });

  const [user, setUser] = useState({
    userName: "",
    mobile: "",
    address: "",
    pincode: "",
    password: "",
  });

  // LOGIN SUBMIT
  const handleLogin = (e) => {
  e.preventDefault();
  if (!/^[6-9][0-9]{9}$/.test(loginData.mobile)) {
    setLoginError("Enter Valid Mobile Number");
    return;
  }

  axios.post("/api/user/login", loginData) // axiosConfig use ho raha hai isliye URL chhota hai
    .then((res) => {
      setLoginError("");
      navigate("/home"); // Success!
    })
    .catch((err) => {
      if (err.response && err.response.status === 401) {
        setLoginError("Invalid Mobile Number or Password");
      } else {
        setLoginError("Something went wrong!");
      }
    });
};

  // REGISTER SUBMIT
  const handleRegister = (e) => {
    if(!/^[6-9][0-9]{9}$/.test(user.mobile)){
setError("Enter Valid Mobile Number");
return;
}
    e.preventDefault();

    if (!/^[6-9][0-9]{9}$/.test(user.mobile)) {
      setError("Invalid mobile number");
      return;
    }

    axios.post("http://localhost:8083/api/user/saveUser", user).then(() => {
      alert("Registered Successfully");
      setIsLogin(true);
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginn-bg-img.jpg')" }}
    >
      <div className="flex w-[850px] max-w-[95%] rounded-xl overflow-hidden shadow-2xl bg-white/50 backdrop-blur-lg">
        {/* LEFT IMAGE */}
        <div
          className="flex-[3] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/login_page_img.png')" }}
        ></div>

        {/* RIGHT FORM */}
        <div className="flex-[2] p-8">
          <h2 className="text-center text-xl font-bold mb-6">
            {isLogin ? "Welcome !" : "Create Account"}
          </h2>

          {/* LOGIN FORM */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Mobile"
                maxLength="10"
                className="w-full p-3 rounded-lg border outline-none"
                value={loginData.mobile}
                onChange={(e) => {
                  const value = e.target.value;

                  // Only numbers allowed
                  if (/[^0-9]/.test(value)) {
                    setMobileError("Only numbers allowed");
                  } else if (value.length > 0 && !/^[6-9]/.test(value)) {
                    setMobileError("Must start with 6,7,8,9");
                  } else if (value.length < 10) {
                    setMobileError("Must be 10 digits");
                  } else {
                    setMobileError("");
                  }

                  setLoginData({ ...loginData, mobile: value });
                }}
              />
              {mobileError && (
                <p className="text-red-500 text-sm text-center">
                  {mobileError}
                </p>
              )}

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 rounded-lg border outline-none"
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />

              <button
                className="w-full py-3 text-white rounded-lg"
                style={{
                  background: "linear-gradient(135deg,#0cc5b7,#2bd891)",
                }}
              >
                LOGIN
              </button>
              {loginError && (
                <p className="text-red-500 text-sm text-center">{loginError}</p>
              )}

              <p className="text-center text-sm">
                Don't have account?
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  Register here
                </span>
              </p>
            </form>
          ) : (
            // REGISTER FORM
            <form onSubmit={handleRegister} className="space-y-1">
              <input
                placeholder="Full Name"
                className="w-full p-2 rounded-lg border"
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
              />

              <input
type="text"
placeholder="Mobile"
maxLength="10"
className="w-full p-2 rounded-lg border"
value={user.mobile}
onChange={(e)=>{

const value = e.target.value;

// Only numbers allowed
if(/[^0-9]/.test(value)){
setMobileError("Only numbers allowed");
}
else if(value.length > 0 && !/^[6-9]/.test(value)){
setMobileError("Must start with 6,7,8,9");
}
else if(value.length < 10){
setMobileError("Must be 10 digits");
}
else{
setMobileError("");
}

setUser({...user,mobile:value});

}}
/>
{mobileError &&
<p className="text-red-500 text-sm text-center">
{mobileError}
</p>
}

              <input
                placeholder="Address"
                className="w-full p-2 rounded-lg border"
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />

              <input
                placeholder="Pincode"
                className="w-full p-2 rounded-lg border"
                onChange={(e) => setUser({ ...user, pincode: e.target.value })}
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-2 rounded-lg border"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />

              <button
                className="w-full py-2 text-white rounded-lg"
                style={{
                  background: "linear-gradient(135deg,#0cc5b7,#2bd891)",
                }}
              >
                REGISTER
              </button>

              <p className="text-center text-sm">
                Already have account?
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  Login here
                </span>
              </p>
            </form>
          )}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
