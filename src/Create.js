import React, { useState, useReducer, useContext } from "react";
import {
  Button,
  Form,
  InputGroup,
  Image,
  Toast,
  ToastBody,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import FormFileInput from "react-bootstrap/FormFileInput";

import { FormRow } from "react-bootstrap/Form";

const urlGenerator = (file) => {
  return URL.createObjectURL(file);
};

const URL_ = `http://backend-telemetry-dashboard-nodejs.apps.123.252.203.195.nip.io`;


const reducer = (state, action) => {
  switch (action.type) {
    case "FirstName":
      return { ...state, firstname: action.payload };
    case "LastName":
      return { ...state, lastname: action.payload };
    case "Email":
      return { ...state, email: action.payload };
    case "UserName":
      return { ...state, username: action.payload };
    case "Mobile":
      return { ...state, mobile: action.payload };
    case "Address":
      return { ...state, address: action.payload };
    case "Password":
      return { ...state, password: action.payload };
    case "Image":
      return { ...state, image: action.payload };
  }
};

const Create = () => {
  const [istate, dispatch] = useReducer(reducer, {});
  const [isSignup, setSignup] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <div>
      <Toast show={isSignup} style={{ position: "absolute", left: 620 }}>
        <Toast.Header>
          <p>
            HEY ! YOU HAVE SUCCESSFULLY SIGNED UP 
            {istate.username}
          </p>
        </Toast.Header>
        <Button variant="outline-dark" href="/#/signin">
          Login to view details
        </Button>
      </Toast>
      <Toast
        show={count > 0 && !isSignup ? true : false}
        style={{ position: "absolute", left: 620, top: 350 }}
      >
        <Toast.Header>
          <p>
            HEY ! YOU HAVE GOT AN ERROR !!! Please See whether u have entered
            right credentials !!!
          </p>
        </Toast.Header>
        <Button variant="outline-dark" href="/#/signup">
          Signup Again !
        </Button>
      </Toast>

      <div
        style={{
          marginTop: 100,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "rgb(173,216, 230, 0.5)",
          marginLeft: 350,
          marginRight: 350,
          borderRadius: 6,
          borderColor: "#17202A",
        }}
      >
        <Form
          style={{
            display: "table",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <Form.Group controlId="formBasicEmail" style={{ display: "flex" }}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="FormControl"
              type="email"
              placeholder="Enter Email"
              onChange={(text) => {
                return dispatch({
                  type: "Email",
                  payload: text.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group
            controlId="formBasicFirstName"
            style={{ display: "flex" }}
          >
            <Form.Label>FirstName</Form.Label>
            <Form.Control
              className="FormControl"
              type="text"
              placeholder="Enter First Name"
              onChange={(text) => {
                return dispatch({
                  type: "FirstName",
                  payload: text.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicLastName" style={{ display: "flex" }}>
            <Form.Label>LastName</Form.Label>
            <Form.Control
              className="FormControl"
              type="text"
              placeholder="Enter Last Name"
              onChange={(text) => {
                return dispatch({
                  type: "LastName",
                  payload: text.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicUserName" style={{ display: "flex" }}>
            <Form.Label>UserName</Form.Label>
            <Form.Control
              className="FormControl"
              type="text"
              placeholder="Enter UserName"
              onChange={(text) => {
                return dispatch({
                  type: "UserName",
                  payload: text.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicMobile" style={{ display: "flex" }}>
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              className="FormControl"
              type="text"
              placeholder="Enter Mobile Number including country code"
              onChange={(text) => {
                return dispatch({
                  type: "Mobile",
                  payload: text.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicAddress" style={{ display: "flex" }}>
            <Form.Label>Address</Form.Label>
            <Form.Control
              className="FormControl"
              type="text-area"
              placeholder="Enter Address"
              onChange={(text) => {
                return dispatch({
                  type: "Address",
                  payload: text.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" style={{ display: "flex" }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="FormControl"
              type="password"
              placeholder="Enter Password"
              onChange={(text) => {
                return dispatch({
                  type: "Password",
                  payload: text.target.value,
                });
              }}
            />
          </Form.Group>
          <Form.File>
            <FormFileInput
              type="image"
              onChange={(file) => {
                return dispatch({
                  type: "Image",
                  payload: urlGenerator(file.target.files[0]),
                });
              }}
            />
          </Form.File>
          }>
          <Button
            className="FormControl"
            variant="outline-primary"
            onClick={async () => {
              try {
                const response = await axios.post(
                  "http://backend-telemetry-dashboard-nodejs.apps.123.252.203.195.nip.io/signup",
                  { ...istate },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                console.log(response.data);
                setSignup(true); // isSignup = true;
              } catch (error) {
                console.log("Error getting user !!" + error.message);
                setCount(count + 1);
                setSignup(false); //// isSignup = false;
              }
            }}
          >
            Submit
          </Button>
        </Form>
        <Image
          src={istate.image}
          color="white"
          backgroundColor="grey"
          rounded
          style={{
            height: 300,
            width: 300,
            justifySelf: "right",
          }}
        />
      </div>
    </div>
  );
};

export default Create;
