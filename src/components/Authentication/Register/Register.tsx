import React, { ChangeEvent, Component } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from 'react-router'

type Props = {

}

type State = {
    username: string
    email: string
    password: string
    confirmPassword: string
    redirect: boolean
}

class Register extends Component<Props, State> {

    public constructor(props: Props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            redirect: false
        }
    }

    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        } as unknown as Pick<State, keyof State>)
    }

    private handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (this.state.password !== this.state.confirmPassword) return

        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        axios.post(process.env.REACT_APP_API_URL + 'auth/register', data).then((res) => {
            this.setState({
                redirect: true
            })
        })
    }

    public redirect() {
        return <Redirect to="/login" />
    }

    public render() {
        if (this.state.redirect) {
            return this.redirect()
        }

        return (
            <div id="Register">
                <Card>
                    <Card.Header>
                        Register
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control name="username" type="text" placeholder="Enter username" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control name="confirmPassword" type="password" placeholder="Password" onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Register