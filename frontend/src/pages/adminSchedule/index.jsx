import React, { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker'
import { Button, Table } from 'reactstrap'
import api from '../../services/api.js'

import './index.scss'

const AdminSchedule = () => {
    const [date, setDate] = useState(new Date())
    const [workouts, setWorkouts] = useState([])

    const createSchedule = async () => {
        await api.post('/newschedule', {
            date
        }).then((res) => {
            setWorkouts([...workouts, res.data])
            alert(typeof res.data === 'object' ? 'Aula marcada!' : 'Não foi possível marcar sua aula')
        })
    }

    const cancelWorkout = async (id) => {
        let deleted = await api.delete('/deleteschedule', {
            headers: { _id: id }
        })

        setWorkouts(workouts.filter((item) => item._id !== id))

        console.log(deleted.data)
    }

    useEffect(async () => {
        let workoutsList = await api.get('/schedules')
        setWorkouts(workoutsList.data)
    }, [])

    return (
        <div className='adminScheduleWrapper'>
            <div className="adminScheduleContainer">
                <div className="workouts">
                    <div className="workout">
                        <Table>
                            <thead>
                                <tr>
                                    <th>Dia</th>
                                    <th>Hora</th>
                                    <th>Mudar</th>
                                </tr>
                            </thead>
                            <tbody>
                            {workouts.length > 0 && workouts.map((item, k) => 
                                <tr id={k}>
                                    <td>{new Date(item.date).getDate()}/{new Date(item.date).getMonth()}/{new Date(item.date).getFullYear()}</td>
                                    <td>{new Date(item.date).getHours()}</td>
                                    <td><Button color="danger" onClick={() => cancelWorkout(item._id)}>Cancelar</Button></td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="adminSchedule">
                    <DateTimePicker
                        onChange={(date) => setDate(date)}
                        value={date}
                    />
                </div>
                <div className="adminScheduleButton">
                    <Button color='primary' onClick={() => createSchedule()}>Criar</Button>
                </div>
            </div>
        </div>
    )
}

export default AdminSchedule