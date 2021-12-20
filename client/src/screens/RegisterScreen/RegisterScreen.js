import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import { useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  //   const [error, setError] = useState(false);
  //   const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/myurls");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  //   const postDetails = (pics) => {
  //     if (
  //       pics ===
  //       "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  //     ) {
  //       return setPicMessage("Please Select an Image");
  //     }
  //     setPicMessage(null);
  //     if (pics.type === "image/jpeg" || pics.type === "image/png") {
  //       const data = new FormData();
  //       data.append("file", pics);
  //       data.append("upload_preset", "urlshortner");
  //       data.append("cloud_name", "dsjynlf0q");
  //       fetch("https://api.cloudinary.com/v1_1/dsjynlf0q/image/upload", {
  //         method: "post",
  //         body: data,
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           setPic(data.url.toString());
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     } else {
  //       return setPicMessage("Please Select an Image");
  //     }
  //   };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {/* {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetails(e.target.files[0])}
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group> */}
          {/* <Form.Group className="position-relative mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="image/png"
              name="custom-file"
              onChange={postDetails}
              //   isInvalid={!!errors.file}
              //   onChange={(e) => postDetails(e.target.files[0])}
              //   id="custom-file"
              //   type="image/png"
              //   required
              custom="true"
              // onChange={postDetails}
              // isInvalid={!!errors.file}
            />
          </Form.Group> */}
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;
