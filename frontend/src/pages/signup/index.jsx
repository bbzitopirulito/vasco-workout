import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api.js";
import "../../styles/entry/index.scss";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const createAccount = async () => {
    await api
      .post("/newuser", {
        username,
        password,
        role: "user",
        workouts: [],
      })
      .then((res) => {
        if (!res.data) {
          alert("Não foi possível criar conta. Tente fazer login");
        } else {
          history.push("/login");
        }
      });
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
              type="password"
              name="password"
              id="password"
              placeholder="Sua senha"
            />
          </FormGroup>
          <FormGroup className="d-flex justify-content-center">
            <Button color="primary" onClick={() => createAccount()}>
              Criar conta
            </Button>
          </FormGroup>
          <FormGroup className="d-flex justify-content-center">
            <span>
              Já tens uma conta? Faça login <Link to="/login">aqui!</Link>
            </span>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};

export default SignUp;
