import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api.js'

import './index.scss'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    let history = useHistory()

    const login = async () => {
        if (username === 'admin' && password === 'admin') history.push('/adminSchedule')
        else {
            await api.get('/user', {
                headers: {
                    username,
                    password
                }
            }).then((res) => {
                if (typeof res.data === 'object') {
                    localStorage.setItem('user', res._id)
                    history.push('/schedule')             
                } else alert('user not found')
            })
        }
    }

    return (
        <div className="loginWrapper">
            <div className="loginContainer">
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" placeholder="Seu username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Sua senha" />
                    </FormGroup>
                    <FormGroup className="centerJustifier">
                        <Button onClick={() => login()} color='primary' onClick={() => login()}>Login</Button>
                    </FormGroup>
                    <FormGroup className="centerJustifier">
                        <span>Não tens conta? Crie uma <Link to='/'>aqui!</Link></span>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
}

export default Login