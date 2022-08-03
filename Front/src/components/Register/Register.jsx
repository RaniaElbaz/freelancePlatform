import React, { useState } from "react";
import Style from "./Register.module.css";
import axiosInstance from "./../../api/axios";
import { useHistory } from "react-router-dom";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Register() {
  // 1- States
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({
    firstNameError: "",
    emailError: "",
    lastNameError: "",
    passwordError: "",
    passwordConfirmError: "",
    registerError: "",
  });

  const [userType, setUserType] = useState("client");
  const history = useHistory();

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  // 2- Handling methods:
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
    // let regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    // let regexPass = /^(?=.*[0-9])(?=.[!@#$%^&])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

    let regexMail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; //! handling

    var regexPass = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    switch (field) {
      case "firstName" || "lastName":
        setErrors({
          ...errors,
          firstNameError:
            value.length < 3 ? "Name must me more than 2 characters" : "",
        });
        break;
      case "email":
        if (!regexMail.test(value)) {
          console.log(regexMail.test(value));
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
      // case "username":
      //   setErrors({
      //     ...errors,
      //     lastNameError: value.includes(" ")
      //       ? "Username must contains no spaces!"
      //       : "",
      //   });
      //   break;
      case "password":
        if (!regexPass.test(value)) {
          setErrors({
            ...errors,
            passwordError:
              "Valid password contain: more than 7 characters, at lease one uppercase, one lower case, one digit and special characters (^%$@)",
          });
        } else {
          setErrors({
            ...errors,
            passwordError: "",
          });
        }
        break;
      case "passwordConfirm":
        setErrors({
          ...errors,
          passwordConfirmError:
            value !== user.password ? "Passwords must be identical" : "Matched",
        });
        break;
      default:
        setErrors({ ...errors });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const data = JSON.stringify(
        userType === "company"
          ? {
              name: user.lastName,
              email: user.email,
              password: user.password,
            }
          : { ...user }
      );

      const config = {
        method: "post",
        url: `/signup/${userType}`,
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
      let statusCode = response.status;

      if (statusCode === 201) {
        history.push("/activate-account");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      console.log(error.response.data.msg);

      /** Handle Errors
       */
      setErrors({
        ...errors,
        registerError: `${error.response.data.msg}`,
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

  return (
    <div className="row justify-content-center align-items-center vh-100">
      <div className={`${Style.bgGray} col-11 col-md-8 col-lg-6 p-5 rounded`}>
        <form onSubmit={handleSubmit}>
          {errors.registerError !== "" ? (
            <div className="alert alert-danger" role="alert">
              {`${errors.registerError}`}
            </div>
          ) : (
            ""
          )}

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

          {userType === "company" ? (
            ""
          ) : (
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstNameError ? "border-danger" : ""
                }`}
                id="firstName"
                aria-describedby="nameHelp"
                value={user.name}
                onChange={handleChange}
              />
              <div id="nameHelp" className="form-text text-danger">
                {errors.firstNameError}
              </div>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              {userType === "company" ? "Company Name" : "Last Name"}
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.lastNameError ? "border-danger" : ""
              }`}
              id={userType === "company" ? "name" : "lastName"}
              aria-describedby="usernameHelp"
              value={user.username}
              onChange={handleChange}
            />
            <div id="usernameHelp" className="form-text text-danger">
              {errors.lastNameError}
            </div>
          </div>

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
                className={`${Style.eyeIcon} position-absolute`}
                onClick={togglePasswordIcon}
              >
                {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
              </i>
            </div>

            <div id="passwordHelp" className="form-text text-danger">
              {errors.passwordError}
            </div>
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="passwordConfirm" className="form-label">
              Confirm Password
            </label>
            <div className={`${Style.passwordWrapper} position-relative`}>
              <input
                type={isPasswordShown ? "text" : "password"}
                className={`form-control ${
                  errors.passwordError ? "border-danger" : ""
                }`}
                id="passwordConfirm"
                aria-describedby="passwordConfirmHelp"
                value={user.passwordConfirm}
                onChange={handleChange}
              />
              <i
                className={`${Style.eyeIcon} position-absolute`}
                onClick={togglePasswordIcon}
              >
                {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
              </i>
            </div>

            <div
              id="passwordConfirmHelp"
              className={`form-text ${
                errors.passwordConfirmError === "Matched"
                  ? "text-success"
                  : "text-danger"
              }`}
            >
              {errors.passwordConfirmError}
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

//test password: Ahmed!9934
//test password: Ahmed!99345
