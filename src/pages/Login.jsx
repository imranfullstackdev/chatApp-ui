import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate=useNavigate()
  const [data, SetData] = useState({
    name: "",
    email: "",
    Password: "",
    Cpassword: "",
  });
  const { name, email, Password, Cpassword } = data;

  const changeHandler = (e) => {
    SetData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    handleValidation();
    if (handleValidation() === true) {
      const postUser = await axios.post("https://chat-app-api-zeta.vercel.app/login", {
        email: data.email,
        Password: data.Password,
      });
      if (postUser.data.status = "true") {
        toast.success("User Login Sucessfully!", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/')
        localStorage.setItem('Chat-User-data',JSON.stringify(postUser.data[0]))
      }
    } else{
      toast.error("invalid User!", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // onSubmit Validation
  const handleValidation = () => {
    if (!email) {
      toast.error("email must be provided", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    } else if (!Password) {
      toast.error("password must be provided", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    } else if (Password.length < 8) {
      toast.error("Password Must be greater than 8", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    } else if (!email || !Password) {
      toast.error("please enter all the details", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <div
        className="d-flex align-item-center justify-content-center"
        id="registerContainer"
      >
        <div className="brand">
          <h1>
            <b>Chat App</b>
          </h1>
        </div>
        <div className="formcontainer">
          <h3>
            <b>Login</b>
          </h3>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={changeHandler}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="Password"
                value={Password}
                onChange={changeHandler}
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit" id="registerSubmit">
              Login
            </Button>
          </Form>
          <span className="alreadyuser">
            Dont have a Account
            <Link to="/register" style={{ textDecoration: "none" }}>
              <u>Register</u>
            </Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
