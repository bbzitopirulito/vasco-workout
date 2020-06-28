import React, { useState, useEffect } from "react";
// import DateTimePicker from "react-datetime-picker";
import {
  Button,
  Table,
  Input,
  Label,
  Container,
  Form,
  FormGroup,
  UncontrolledCollapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import api from "../../services/api.js";
import Dropdown from "react-bootstrap/Dropdown";
// import TimePicker from "react-time-picker";
import { KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";
import Menu from "../../components/menu/index.js";

const AdminSchedule = () => {
  const [date, setDate] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [limit, setLimit] = useState(6);
  const [time, setTime] = useState(new Date());
  const [type, setType] = useState("");
  const [day, setDay] = useState(1);
  const [newGroup, setNewGroup] = useState([]);

  const weekDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const createGroup = () => {};

  const createSchedule = async () => {
    await api
      .post("/newschedule", {
        date,
        limit,
        type,
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

  useEffect(() => {
    const getWorkouts = async () => {
      let workoutsList = await api.get("/schedules");
      setWorkouts(workoutsList.data);
    };

    getWorkouts();
  }, []);

  return (
    <>
      <Menu />
      <div className="schedule min-vh-100 mt-5 d-flex flex-column align-items-baseline">
        <Container className="admin-container table-responsive">
          <Button color="primary my-3" id="toggler">
            Workouts
          </Button>
          <UncontrolledCollapse toggler="#toggler">
            <Table className="border border-secondary rounded">
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Hora</th>
                  <th>Pessoas</th>
                  <th>Limite</th>
                  <th>Tipo</th>
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
                      <td>{item.type}</td>
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
          </UncontrolledCollapse>
          <div className="d-flex flex-column">
            {newGroup.length > 0 &&
              weekDays.map(
                (d, k) =>
                  k !== 0 &&
                  newGroup.filter((f) => f.day === k).length > 0 && (
                    <>
                      <Button color="primary my-3" id={`toggler${k}`}>
                        {d}
                      </Button>
                      <UncontrolledCollapse toggler={`#toggler${k}`}>
                        <Table className="border border-secondary rounded">
                          <thead>
                            <tr>
                              <th>Hora</th>
                              <th>Limite</th>
                              <th>Tipo</th>
                              <th>Mudar</th>
                            </tr>
                          </thead>
                          <tbody>
                            {newGroup
                              .filter((f) => f.day === k)
                              .map((item, i) => (
                                <tr key={i}>
                                  <td>
                                    {new Date(item.time).getHours()}:
                                    {new Date(item.time).getMinutes()}
                                  </td>
                                  <td>{item.limit}</td>
                                  <td>{item.type}</td>
                                  <td>
                                    <Button
                                      color="danger"
                                      onClick={() =>
                                        setNewGroup(
                                          newGroup.filter((f) => f.i !== item.i)
                                        )
                                      }
                                    >
                                      Remover
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </Table>
                      </UncontrolledCollapse>
                    </>
                  )
              )}
          </div>
          <Form>
            <FormGroup>
              {newGroup.length > 0 ? (
                <>
                  <UncontrolledDropdown>
                    <DropdownToggle caret>{weekDays[day]}</DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setDay(1)}>
                        Segunda
                      </DropdownItem>
                      <DropdownItem onClick={() => setDay(2)}>
                        Terça
                      </DropdownItem>
                      <DropdownItem onClick={() => setDay(3)}>
                        Quarta
                      </DropdownItem>
                      <DropdownItem onClick={() => setDay(4)}>
                        Quinta
                      </DropdownItem>
                      <DropdownItem onClick={() => setDay(5)}>
                        Sexta
                      </DropdownItem>
                      <DropdownItem onClick={() => setDay(6)}>
                        Sábado
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    variant="inline"
                    label="Escolha uma hora"
                    value={time}
                    onChange={(t) => setTime(t)}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </>
              ) : (
                <>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Escolha uma data"
                    value={date}
                    onChange={(d) => setDate(d)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                  <KeyboardTimePicker
                    margin="normal"
                    className="ml-2"
                    id="time-picker"
                    variant="inline"
                    label="Escolha uma hora"
                    value={date}
                    onChange={(t) => {
                      debugger;
                      setDate(
                        date.setHours(t.getHours()).setMinutes(t.getMinutes())
                      );
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                  />
                </>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="password">Limite de pessoas</Label>
              <Input onChange={(e) => setLimit(e.target.value)} value={limit} />
            </FormGroup>
            <FormGroup>
              <Label for="type">Tipo de aula</Label>
              <Input onChange={(e) => setType(e.target.value)} value={type} />
            </FormGroup>
            <FormGroup>
              <Button
                color="primary"
                onClick={() =>
                  newGroup.length > 0 ? createGroup() : createSchedule()
                }
              >
                {newGroup.length > 0 ? "Criar grupo" : "Criar"}
              </Button>
              <Button
                className="ml-2"
                color="primary"
                onClick={() =>
                  setNewGroup([
                    ...newGroup,
                    { type, limit, day, time, i: new Date().getMilliseconds() },
                  ])
                }
              >
                Adicionar grupo
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default AdminSchedule;
