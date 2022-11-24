import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [data, SetData] = useState({
    name: "",
    email: "",
    Password: "",
    Cpassword: "",
  });
  const navigate=useNavigate()
  const { name, email, Password, Cpassword } = data;

  const changeHandler = (e) => {
    SetData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
      const postUser = await axios.post("https://chat-app-api-zeta.vercel.app/adduser",{name:data.name,
    email:data.email,
  Password:data.Password})
if(postUser.data.status=true){
  toast.success("User Added Sucessfully!", {
    position: "top-center",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  navigate('/Login  ')
}else{
  toast.error("error")
}


      
  };

  // onSubmit Validation
  const handleValidation = () => {
    if (Password != Cpassword) {
      toast.error("Password Dont Match", {
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
    } else if (name.length < 3) {
      toast.error("Name Must be greater than 3", {
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
    } else if (!name || !email || !Password || !Cpassword) {
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
            <b>Register</b>
          </h3>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={changeHandler}
                placeholder="Enter email"
              />
            </Form.Group>

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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-enter the password"
                name="Cpassword"
                value={Cpassword}
                onChange={changeHandler}
              />
            </Form.Group>
            <Button variant="primary" type="submit" id="registerSubmit">
              Create User
            </Button>
          </Form>
          <span className="alreadyuser">
            Already a user{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              <u>Login</u>
            </Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
