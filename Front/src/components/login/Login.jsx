import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./../../api/axios";

import Style from "./Login.module.css";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Login() {
  /** States
   */
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    submitError: "",
    resetError: "",
  });

  const [userType, setUserType] = useState("client");

  /** Flag States
   */
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  /** Handling methods:
   */
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.id]: event.target.value,
    });
    handleValidation(event.target.id, event.target.value);
  };

  const handleValidation = (field, value) => {
    console.log("field", field);
    console.log("value", value);
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

    switch (field) {
      case "email":
        if (!regex.test(value)) {
          console.log(regex.test(value));
          setErrors({
            ...errors,
            emailError: "Valid Email is required!",
          });
        } else {
          setErrors({
            ...errors,
            emailError: "",
          });
        }
        break;
      case "password":
        setErrors({
          ...errors,
          passwordError:
            value.length < 8 ? "Password Must be more then 8 characters!" : "",
        });
        break;
      default:
        setErrors({ ...errors });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user); // !

    try {
      const data = JSON.stringify({ ...user });

      const config = {
        method: "post",
        url: `/login/${userType}`,
        headers: {
          "Content-Type": "application/json",
        },
        accept: "application/json, text/plain, */*",
        // withCredentials: true,
        data: data,
      };

      const response = await axiosInstance(config);

      if (!response) {
        setErrors({
          ...errors,
          submitError: "No Server Response",
        });
        return;
      }

      console.log(response, "<===");
      console.log(response.data.token);

      /** Handle Errors
       */
      let token = response.data.token;
      let statusCode = response.status;

      if (statusCode === 200) {
        localStorage.setItem("token", token);
        window.location = "/projects"; //! handle with useNavigate() react router dom
      }
    } catch (error) {
      console.log(error);

      setErrors({
        ...errors,
        submitError: "Something Wrong!",
      });
    }
  };

  const togglePasswordIcon = (e) => {
    setIsPasswordShown(!isPasswordShown);
    console.log(isPasswordShown);
  };

  const selectUserType = (e) => {
    console.log(e.target.id, e.target.value);
    setUserType(e.target.value);
  };

  const sendResetLink = async () => {
    try {
      const data = JSON.stringify({
        email: user.email,
      });

      const config = {
        method: "post",
        url: `/forgot-password/${userType}`,
        headers: {
          "Content-Type": "application/json",
        },
        accept: "application/json, text/plain, */*",
        // withCredentials: true,
        data: data,
      };

      const response = await axiosInstance(config);

      if (!response) {
        setErrors({
          ...errors,
          resetError: "No Server Respond",
        });
      }

      console.log(response, "<===");
      let statusCode = response.status;

      if (statusCode === 200) {
        window.location = "/forgot-password"; //! handle with useNavigate() react router dom
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data.msg);

      /** Handle Errors
       */
      setErrors({
        ...errors,
        resetError: "Enter New Password",
      });
    }
  };

  return (
    <div className="row justify-content-center align-items-center vh-100">
      <div className={`${Style.bgGray} col-11 col-md-8 col-lg-6 p-5 rounded`}>
        <form onSubmit={handleSubmit}>
          {errors.submitError !== "" ? (
            <div className="alert alert-danger" role="alert">
              {`${errors.submitError}`}
            </div>
          ) : (
            ""
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.emailError ? "border-danger" : ""
              }`}
              id="email"
              aria-describedby="emailHelp"
              value={user.email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text text-danger">
              {errors.emailError}
            </div>
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className={`${Style.passwordWrapper} position-relative`}>
              <input
                type={isPasswordShown ? "text" : "password"}
                className={`form-control ${
                  errors.passwordError ? "border-danger" : ""
                }`}
                id="password"
                aria-describedby="passwordHelp"
                value={user.password}
                onChange={handleChange}
              />
              <i
                className={`${Style.eyeIcon}  position-absolute`}
                onClick={togglePasswordIcon}
              >
                {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
              </i>
            </div>

            <div id="passwordHelp" className="form-text text-danger">
              {errors.passwordError}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="#userType" className="form-label">
              Select User Type
            </label>
            <select
              id="userType"
              className="form-select"
              aria-label="Default select"
              onChange={selectUserType}
            >
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
              <option value="company">Company</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary mb-3">
            Login
          </button>
        </form>

        <p
          style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
          onClick={sendResetLink}
        >
          Forgot password?
        </p>
      </div>
    </div>
  );
}

export default Login;
