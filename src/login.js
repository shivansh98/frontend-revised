import React, { useState, useReducer, useContext } from "react";
import {
  Form,
  Button,
  Toast,
  ToastBody,
  Image,
  FormLabel,
} from "react-bootstrap";
import axios from "axios";


const URL_ = `http://backend-telemetry-dashboard-nodejs.apps.123.252.203.195.nip.io`;

const Login = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isSignin, setSignin] = useState(false);
  const [count, setCount] = useState(0);
  const [ state, updateState ] = useState({});
  let data = {};
  const handleRequest = async () => {
    try {
      const response = await axios.post(
        "http://backend-telemetry-dashboard-nodejs.apps.123.252.203.195.nip.io/signin",
        { email: user, password: pass },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log({ ...response.data });

      try {
        const user = await axios.get("http://backend-telemetry-dashboard-nodejs.apps.123.252.203.195.nip.io/", {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        });
        setSignin(true);
        data = user.data;
        updateState(user.data);
        ///  boundFunction(user.data);
      } catch (error) {
        console.log(error.message);
        setSignin(false);
        setCount(count + 1);
      }
    } catch (error) {
      console.log(error.message);
      setSignin(false);
      setCount(count + 1);
    }
  };

  return (
    <div>
      <Toast show={isSignin} style={{ position: "absolute", left: 620 }}>
        <Toast.Header>
          <p>HEY ! YOU HAVE SUCCESSFULLY SIGNED IN</p>
        </Toast.Header>

        <ToastBody as="div">
          <ul>
            <li>
              Name : {state.firstname} {state.lastname}
            </li>
            <li> username : {state.username}</li>
            <li> Addresss : {state.address}</li>
            <li> Mobile : {state.mobile}</li>
            <li> <Image src={state.image} style={{height:150 , width:150}}/></li>
          </ul>
        </ToastBody>
        <Button variant="outline-dark" href="/#/">
          close
        </Button>
      </Toast>
      <Toast
        show={count > 0 && !isSignin ? true : false}
        style={{ position: "absolute", left: 620, top: 350 }}
      >
        <Toast.Header>
          <p>
            HEY ! YOU HAVE GOT AN ERROR !!! Please See whether u have entered
            right credentials !!!
          </p>
        </Toast.Header>
        <Button variant="outline-dark" href="/#/">
          Close
        </Button>
      </Toast>
      <div
        style={{
          marginTop: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(173,216, 230, 0.5)",
          borderRadius: 6,
          marginLeft: 500,
          marginRight: 500,
        }}
      >
        <Form style={{ display: "table", marginLeft: 150, marginRight: 150 }}>
          <Form.Group
            style={{
              flexdirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(name) => {
                return setUser(name.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group
            style={{
              flexdirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(name) => {
                return setPass(name.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Button
            style={{ marginBottom: 10, alignSelf: "normal" }}
            className="FormControl"
            variant="primary"
            onClick={() => {
              handleRequest();
            }}
          >
            Sign in
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
