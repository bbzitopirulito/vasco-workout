import React, { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import { Button, Table, Input, Label, Container, Row, Col } from "reactstrap";
import api from "../../services/api.js";
import Dropdown from "react-bootstrap/Dropdown";
import Menu from "../../components/menu/index.js";

import "../../styles/schedule/index.scss";

const AdminSchedule = () => {
  const [date, setDate] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [limit, setLimit] = useState(6);

  const createSchedule = async () => {
    await api
      .post("/newschedule", {
        date,
        limit,
      })
      .then((res) => {
        setWorkouts([...workouts, res.data]);
        alert(
          typeof res.data === "object"
            ? "Aula marcada!"
            : "Não foi possível marcar sua aula"
        );
      });
  };

  const cancelWorkout = async (id) => {
    await api.delete("/deleteschedule", {
      headers: { _id: id },
    });
    setWorkouts(workouts.filter((item) => item._id !== id));
  };

  useEffect(async () => {
    let workoutsList = await api.get("/schedules");
    setWorkouts(workoutsList.data);
  }, []);

  return (
    <>
      <Menu />
      <div className="schedule min-vh-100 mt-5 d-flex flex-column align-items-baseline">
        <Container className="admin-container border border-secondary rounded">
          <Table>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Hora</th>
                <th>Pessoas</th>
                <th>Limite</th>
                <th>Mudar</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length > 0 &&
                workouts.map((item, k) => (
                  <tr id={k}>
                    <td>
                      {new Date(item.date).getDate()}/
                      {new Date(item.date).getMonth()}/
                      {new Date(item.date).getFullYear()}
                    </td>
                    <td>{new Date(item.date).getHours()}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          Pessoas
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {item.users.length > 0 ? (
                            item.users.map((user, k) => (
                              <Dropdown.Item id={k}>
                                {user.username}
                              </Dropdown.Item>
                            ))
                          ) : (
                            <Dropdown.Item>Aula vazia</Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    <td>{item.limit}</td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => cancelWorkout(item._id)}
                      >
                        Cancelar
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Container fluid className="my-3">
            <Row className="align-items-end">
              <Col>
                <DateTimePicker
                  onChange={(date) => setDate(date)}
                  value={date}
                />
              </Col>
              <Col>
                <Label for="password">Limite de pessoas</Label>
                <Input
                  onChange={(e) => setLimit(e.target.value)}
                  value={limit}
                />
              </Col>
            </Row>
          </Container>
          <Container fluid className="d-flex justify-content-center my-3">
            <Button color="primary" onClick={() => createSchedule()}>
              Criar
            </Button>
          </Container>
        </Container>
      </div>
    </>
  );
};

export default AdminSchedule;
