import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api.js";

import "../../styles/entry/index.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const login = async () => {
    if (username === "admin" && password === "admin")
      history.push("/admin-schedule");
    else {
      await api
        .get("/user", {
          headers: {
            username,
            password,
          },
        })
        .then((res) => {
          if (typeof res.data === "object") {
            localStorage.setItem("user", res.data._id);
            history.push("/schedule");
          } else alert("user not found");
        });
    }
  };

  return (
    <div className="entry-body bg-light min-vh-100 d-sm-flex align-items-center">
      <Container className="mw-sm-100 bg-white p-5 border border-light rounded">
        <Form>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              id="username"
              placeholder="Seu username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="Sua senha"
            />
          </FormGroup>
          <FormGroup className="d-flex justify-content-center">
            <Button
              onClick={() => login()}
              color="primary"
              onClick={() => login()}
            >
              Login
            </Button>
          </FormGroup>
          <FormGroup className="d-flex justify-content-center">
            <span>
              Não tens conta? Crie uma <Link to="/">aqui!</Link>
            </span>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
