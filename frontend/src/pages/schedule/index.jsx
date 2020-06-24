import api from "../../services/api.js";
import React, { useState, useEffect } from "react";
import { Button, Table, Container } from "reactstrap";
import Menu from "../../components/menu/index.js";

import "../../styles/schedule/index.scss";

const Schedule = () => {
  const [workouts, setWorkouts] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(async () => {
    let workoutsList = await api.get("/schedules");
    setWorkouts(workoutsList.data);
    setUserId(localStorage.getItem("user"));
  }, []);

  const scheduleUser = async (schedule) => {
    let scheduled = await api.put("/scheduleuser", {
      userId,
      scheduleId: schedule._id,
    });
    setWorkouts(
      workouts.map((f) => {
        if (f._id === scheduled.data._id) {
          f.users = scheduled.data.users;
          return f;
        } else {
          return f;
        }
      })
    );
  };

  const unscheduleUser = async (scheduleId) => {
    let unscheduled = await api.put("/unscheduleuser", {
      userId,
      scheduleId,
    });
    setWorkouts(
      workouts.map((f) => {
        if (f._id === unscheduled.data._id) {
          f.users = unscheduled.data.users;
          return f;
        } else {
          return f;
        }
      })
    );
  };

  return (
    <>
      <Menu />
      <div className="schedule min-vh-100 mt-5 d-flex align-items-baseline justify-content-center">
        <Container className="border border-secondary rounded">
          <Table>
            <thead>
              <tr>
                <th>Dia</th>
                <th>Hora</th>
                <th>Disponibilidade</th>
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
                      {!item.users.filter((u) => u._id === userId).length > 0 &&
                      item.limit <= item.users.length ? (
                        "Aula cheia"
                      ) : item.users.filter((f) => f._id === userId).length >
                        0 ? (
                        <Button
                          color="danger"
                          onClick={() => unscheduleUser(item._id)}
                        >
                          Desmarcar
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          onClick={() => scheduleUser(item)}
                        >
                          Marcar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </>
  );
};

export default Schedule;
