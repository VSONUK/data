import React, { useState, useSEffect } from "react";
import { Link } from "react-router-dom";
import { Alert } from "antd";
import axios from "axios";
import "./authstyle.css";

const Signup = (props) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errormesage, setErrorMessage] = useState(false);

  function validateEmail(input) {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(input);
  }
  const handleFomData = (e) => {
    if (
      validateEmail(email) &&
      (username !== "" || email !== "" || password !== "")
    ) {
      const emailId = email;
      const name = username;
      axios
        .post("http://localhost:5000/api/user/signup", {
          name,
          emailId,
          password,
        })
        .then((response) => {
          localStorage.setItem("name", response.data.data.name);
          setSuccessMessage(true);
          setErrorMessage(false);
          setUserName("");
          setEmail("");
          setPasword("");

          props.history.push("/home");
        })
        .catch((err) => {
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.message
          )
            setErrorMessage(true);
          console.log(err.response.data.message);
        });
      console.log(username, email, password);
    } else {
      setErrorMessage(true);
      console.log("invalid");
    }
  };
  return (
    <div>
      <h3 style={{ textAlign: "center", marginTop: "25px" }}>SIGN UP</h3>
      {successMessage === true ? (
        <Alert
          style={{ marginLeft: "25%", marginRight: "25%" }}
          message="Registered Successfully"
          type="success"
          showIcon
        />
      ) : (
        ""
      )}
      {errormesage === true ? (
        <Alert
          style={{ marginLeft: "25%", marginRight: "25%" }}
          message="Please fill all the details"
          type="warning"
          showIcon
        />
      ) : (
        ""
      )}
      <div
        className="form-group row"
        style={{
          marginBottom: "3%",
          marginTop: "4%",
          width: "50%",
          marginLeft: "25%",
          marginRight: "25%",
        }}
      >
        <input
          onChange={(text) => setUserName(text.target.value)}
          value={username}
          className="input"
          type="text"
          placeholder="user name"
        />
      </div>
      <div
        className="form-group row"
        style={{
          marginBottom: "3%",
          marginTop: "4%",
          width: "50%",
          marginLeft: "25%",
          marginRight: "25%",
        }}
      >
        <input
          onChange={(text) => setEmail(text.target.value)}
          value={email}
          className="input"
          type="text"
          placeholder="Email"
        />
      </div>
      <div
        className="form-group row"
        style={{
          marginBottom: "3%",
          width: "50%",
          marginLeft: "25%",
          marginRight: "25%",
        }}
      >
        <input
          onChange={(text) => setPasword(text.target.value)}
          value={password}
          className="input"
          type="password"
          placeholder="Password"
        />
      </div>
      <div style={{ marginLeft: "25%" }}>
        Already have an account?{" "}
        <Link to="/">
          <span style={{ color: "blue" }}>Sign in</span>
        </Link>
      </div>
      <div
        className="form-group row"
        style={{ width: "50%", marginLeft: "25%", marginRight: "25%" }}
      >
        {/* <button onClick={handleOnSubmit} className='btn' type='submit'>Log In</button> */}
        <button className="btn" onClick={handleFomData}>
          Sign up
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};

export default Signup;
