import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api.js'
import './index.scss'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()
    
    const createAccount = async () => {
        await api.post('/newuser', {
            username,
            password,
            role: 'user',
            workouts: [],
        }).then((user) => {
            history.push('/login')
        })
    }

    return (
        <div className="signupWrapper">
            <div className="signupContainer">
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" placeholder="Seu username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="Sua senha" />
                    </FormGroup>
                    <FormGroup className="centerJustifier">
                        <Button color='primary' onClick={() => createAccount()}>Criar conta</Button>
                    </FormGroup>
                    <FormGroup className="centerJustifier">
                        <span>Já tens uma conta? Faça login <Link to='/login'>aqui!</Link></span>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
}

export default SignUp