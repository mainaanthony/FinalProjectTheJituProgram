import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./homepage.css";
import { Avatar,Button} from "@mui/material"
import ImageOne from '../homepage/assets/photo-1511632765486-a01980e01a18.jpeg'
import ImageTwo from '../homepage/assets/istockphoto-610259354-612x612.jpg'
import ImageThree from '../homepage/assets/istockphoto-1217093906-612x612.jpg'







const Homepage = () => {
  const history = useNavigate();
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [signUpData, setSignUpData] = useState({
    Name: "",
    Email: "",
    Password: "",
    c_password: "",
    ContactNumber: "",
    UserName: "",
  });
  const [loginData, setLoginData] = useState({
    loginInput: "",
    Password: "",
  });
  const [signUpErrors, setSignUpErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [signupStatus, setSignupStatus] = useState(null);




  const handleSignUp = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false);
    setSignUpData({
      Name: "",
      Email: "",
      Password: "",
      c_password: "",
      ContactNumber: "",
      UserName: "",
    });
    setSignUpErrors({});
    setSignupStatus(null)
  };

  const handleLogin = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false);
    setLoginData({
      loginInput: "",
      Password: "",
    });
    setLoginErrors({});
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const errors = {};
    if (!signUpData.Name.trim()) {
      errors.Name = "Name is required";
    }
    if (!signUpData.Email.trim()) {
      errors.Email = "Email is required";
    }
    if (!signUpData.Password) {
      errors.Password = "Password is required";
    } else if (signUpData.Password.length < 6) {
      errors.Password = "Password must be at least 6 characters long";
    }
    if (signUpData.Password !== signUpData.c_password) {
      errors.c_Password = "Passwords do not match";
    }
    if (!signUpData.ContactNumber.trim()) {
      errors.ContactNumber = "Contact number is required";
    }
    if (!signUpData.UserName.trim()) {
      errors.UserName = "Username is required";
    }

    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      return;
    }

    // Perform sign up logic
    try {
      const response = await axios.post(
        `http://localhost:4042/users/register`,
        
        signUpData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      if (response.data.message === "Saved User") {
        setSignupStatus("success");
      } else {
        setSignupStatus("error");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        if (errorMessage) {
          if (errorMessage?.includes("E")) {
            toast.error(
              "Email is already in use. Please enter a different email."
            );
          } else if (errorMessage?.includes('"Email" must be a valid email')) {
            toast.error("Invalid email format. Please enter a valid email.");
          } else if (errorMessage?.includes("c_password")) {
            toast.error("Password and confirm password do not match");
          } else if (errorMessage?.includes("contact")) {
            toast.error("Contact number is already in use");
          } else if (errorMessage?.includes("pattern")) {
            toast.error(
              "Invalid password. Please choose a stronger password."
              
            );
          } else if (errorMessage?.includes("UC_Username")) {
            toast.error(
              "Username is already in use. Please enter a different Username."
            );
          } else {
            toast.error("Signup failed. Please try again later.");
          }
          setSignupStatus("error");
        } else if (error.request) {
          console.error("No response from server:", error.request);
          toast.error("No response from server. Please try again later.");
          setSignupStatus("error");
        } else {
          console.error("Error:", error.message);
          toast.error("An error occurred. Please try again later.");
          setSignupStatus("error");
        }
      }
    }
  };

  useEffect(() => {
    // ... (existing image slider code)

    // The signupStatus can be used to display appropriate toast messages
    if (signupStatus === "success") {
      toast.success("Sign up successful! You can now proceed to log in.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (signupStatus === "error") {
      // Don't need to toast here as we're already handling errors during form submission
    }
  }, [signupStatus]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const errors = {};
    if (!loginData.loginInput.trim()) {
      errors.loginInput = "loginInput is required";
    }
    if (!loginData.Password) {
      errors.Password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    // Perform login logic
    try {
      const response = await axios.post(
        `http://localhost:4042/users/login`,
        loginData,
        
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success('Login successful!.');
      // Redirect to another page after successful login
      history("/home");
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };


// crazy
useEffect(() => {
  const imageContainer = document.querySelector(".image-container");
  const images = imageContainer.querySelectorAll(".image-slide");
  const dotsContainer = imageContainer.querySelector(
    ".transition-dots-container"
  );
  const dots = dotsContainer.querySelectorAll(".transition-dot");

  let currentImageIndex = 0;

  const transitionInterval = setInterval(() => {
    images.forEach((image, index) => {
      if (index === currentImageIndex) {
        image.classList.add("active");
        dots[index].classList.add("active");
      } else {
        image.classList.remove("active");
        dots[index].classList.remove("active");
      }
    });

    currentImageIndex = (currentImageIndex + 1) % images.length;
  }, 5000);

  return () => {
    clearInterval(transitionInterval);
  };
}, []);

// crazy


  return (
    <div className="background-image">
      <div className="homepage-container">
        <div className="content-container">
          <div className="image-container">
 {/* crazy */}
 <div className="transition-dots-container">
              <span className="transition-dot active"></span>
              <span className="transition-dot"></span>
              <span className="transition-dot"></span>
            </div>

            <div className="image-slide active">
              <img
                src={ImageOne}
              
              />
              <p className="image-message">...</p>
            </div>
            <div className="image-slide active">
              <img
                src={ImageTwo}
              
              />
              <p className="image-message">..</p>
            </div>
            <div className="image-slide">
              <img
                src={ImageThree}
               
              />
              <h1 className="image-message">connect with the people you love and share memories</h1>
            </div>

{/* crazy */}

          </div>
          <div className="form-container">
            {/* <h1 className="welcome-text">Notified</h1> */}
            {/* <Avatar src={Logo}/> */}
            <div className="button-container">
              <button className="signup-button" onClick={handleSignUp}>
                Sign Up
              </button>
              <button className="login-button" onClick={handleLogin}>
                Login
              </button>
            </div>
            {showSignUpForm && (
              <form className="signup-form" onSubmit={handleSignUpSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={signUpData.Name}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, Name: e.target.value })
                    }
                  />
                  {signUpErrors.Name && (
                    <p className="error-message">{signUpErrors.Name}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={signUpData.Email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, Email: e.target.value })
                    }
                  />
                  {signUpErrors.Email && (
                    <p className="error-message">{signUpErrors.Email}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={signUpData.Password}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, Password: e.target.value })
                    }
                  />
                  {signUpErrors.Password && (
                    <p className="error-message">{signUpErrors.Password}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={signUpData.c_password}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        c_password: e.target.value,
                      })
                    }
                  />
                  {signUpErrors.c_password && (
                    <p className="error-message">
                      {signUpErrors.c_password}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input
                    type="text"
                    id="contactNumber"
                    value={signUpData.ContactNumber}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        ContactNumber: e.target.value,
                      })
                    }
                  />
                  {signUpErrors.ContactNumber && (
                    <p className="error-message">
                      {signUpErrors.ContactNumber}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="userName">Username:</label>
                  <input
                    type="text"
                    id="userName"
                    value={signUpData.UserName}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, UserName: e.target.value })
                    }
                  />
                  {signUpErrors.UserName && (
                    <p className="error-message">{signUpErrors.UserName}</p>
                  )}
                </div>
                <button type="submit" className="submit-button">
                  Sign Up
                </button>
              </form>
            )}
            {showLoginForm && (
              <form className="login-form" onSubmit={handleLoginSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={loginData.loginInput}
                    onChange={(e) =>
                      setLoginData({ ...loginData, loginInput: e.target.value })
                    }
                  />
                  {loginErrors.loginInput && (
                    <p className="error-message">{loginErrors.loginInput}</p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={loginData.Password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, Password: e.target.value })
                    }
                  />
                  {loginErrors.Password && (
                    <p className="error-message">{loginErrors.Password}</p>
                  )}
                </div>
                <button type="submit" className="submit-button">
                  Login
                </button>
              </form>
            )}
            <div className="additional-buttons">
              <button className="additional-button">Forgot Password</button>
              <button className="additional-button">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Homepage;
