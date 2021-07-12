import React, { useState, useSEffect } from "react";
import { Link } from "react-router-dom";
import { Alert } from "antd";
import axios from "axios";
import "./authstyle.css";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [errormesage, setErrorMessage] = useState(false);

  const handleFomData = (e) => {
    if (email !== "" || password !== "") {
      const emailId = email;
      axios
        .post("http://localhost:5000/api/user/signin", {
          emailId,
          password,
        })
        .then((response) => {
          localStorage.setItem("name", response.data.data.name);
          setSuccessMessage(true);
          setErrorMessage(false);
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
    } else {
      setErrorMessage(true);
      console.log("invalid");
    }
  };
  return (
    <div>
      <h3 style={{ textAlign: "center", marginTop: "25px" }}>SIGN IN</h3>
      {successMessage === true ? (
        <Alert
          style={{ marginLeft: "25%", marginRight: "25%" }}
          message="Success"
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
        Don't have account?{" "}
        <Link to="/signup">
          <span style={{ color: "blue" }}>Sign up</span>
        </Link>
      </div>
      <div
        className="form-group row"
        style={{ width: "50%", marginLeft: "25%", marginRight: "25%" }}
      >
        {/* <button onClick={handleOnSubmit} className='btn' type='submit'>Log In</button> */}
        <button className="btn" onClick={handleFomData}>
          Sign in
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};

export default Signin;
