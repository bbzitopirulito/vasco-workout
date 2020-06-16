import api from '../../services/api.js';
import React, { useState, useEffect } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { Button, Table } from 'reactstrap'

import './index.scss'

const Schedule = () => {
    const [date, setDate] = useState(new Date())
    const [workouts, setWorkouts] = useState([])

    useEffect(async () => {
        let workoutsList = await api.get('/schedules')
        setWorkouts(workoutsList.data)
    }, [])

    const scheduleUser = async (_id) => {
        console.log(_id)
        let schedule = await api.put('/scheduleuser', {
            userId: localStorage.getItem('user'), scheduleId: _id
        })

        console.log(schedule.data)
    }

    return(
        <div className="scheduleWrapper">
            <div className="schedule">
                <div className="workouts">
                    <div className="workout">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Dia</th>
                                    <th>Hora</th>
                                    <th>Disponibilidade</th>
                                </tr>
                            </thead>
                            <tbody>
                            {workouts.length > 0 && workouts.map((item, k) => 
                                <tr id={k}>
                                    <td>{new Date(item.date).getDate()}/{new Date(item.date).getMonth()}/{new Date(item.date).getFullYear()}</td>
                                    <td>{new Date(item.date).getHours()}</td>
                                    <td><Button color="primary" onClick={() => scheduleUser(item._id)}>Marcar</Button></td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                {/* <div className="schedulePicker">
                    <DateTimePicker
                        onChange={(date) => setDate(date)}
                        value={date}
                    />
                </div>
                <div className="scheduleButton">
                    <Button color='primary' onClick={() => schedule()}>Marcar</Button>
                </div> */}

            </div>
        </div>
    )
}

export default Schedule