import api from '../../services/api.js';
import React, { useState, useEffect } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { Button, Table } from 'reactstrap'
import Menu from '../../components/menu/index.js'

import './index.scss'

const Schedule = () => {
    const [date, setDate] = useState(new Date())
    const [workouts, setWorkouts] = useState([])
    const [userId, setUserId] = useState('')

    useEffect(async () => {
        let workoutsList = await api.get('/schedules')
        setWorkouts(workoutsList.data)
        setUserId(localStorage.getItem('user'))
    }, [])

    const scheduleUser = async (scheduleId) => {
        let schedule = await api.put('/scheduleuser', {
            userId, scheduleId
        })
        setWorkouts(workouts.map(f => {
            if (f._id === schedule.data._id) {
                f.users = schedule.data.users
                return f;
            } else {
                return f;
            }
        }))
    }

    const unscheduleUser = async (scheduleId) => {
        let unscheduled = await api.put('/unscheduleuser', {
            userId, scheduleId
        })
        setWorkouts(workouts.map(f => {
            if (f._id === unscheduled.data._id) {
                f.users = unscheduled.data.users
                return f;
            } else {
                return f;
            }
        }))
    }

    return(
        <>
            <Menu />
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
                                        <td>{item.users.filter(f => f._id === userId).length > 0 ? <Button color="danger" onClick={() => unscheduleUser(item._id)}>Desmarcar</Button> : <Button color="primary" onClick={() => scheduleUser(item._id)}>Marcar</Button>}</td>                                
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Schedule