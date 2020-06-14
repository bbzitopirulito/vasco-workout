import api from '../../services/api.js';
import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import { Button } from 'reactstrap'

import './index.scss'

const Schedule = () => {
    const [date, setDate] = useState(new Date())

    const schedule = async () => {
        await api.post('/newschedule', {
            date
        }).then((res) => {
            alert(typeof res.data === 'object' ? 'Aula marcada!' : 'Não foi possível marcar sua aula')
        })
    }

    return(
        <div className="scheduleWrapper">
            <div className="schedule">
                <div className="avaliableDates">

                </div>
                <div className="schedulePicker">
                    <DateTimePicker
                        onChange={(date) => setDate(date)}
                        value={date}
                    />
                </div>
                <div className="scheduleButton">
                    <Button color='primary' onClick={() => schedule()}>Marcar</Button>
                </div>

            </div>
        </div>
    )
}

export default Schedule