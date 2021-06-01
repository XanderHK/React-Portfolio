import React, { ChangeEvent, Component } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from 'react-router'

type Props = {
    setToken: any
}

type State = {
    email: string
    password: string
    redirect: boolean
}

class Login extends Component<Props, State> {

    public constructor(props: Props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: false,
        }
    }

    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        } as unknown as Pick<State, keyof State>)
    }

    private handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const data = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(process.env.REACT_APP_API_URL + 'auth/login', data)
            .then((res) => {
                this.props.setToken(res.data)
            })
            .catch((err) => console.log(err))
    }

    public render() {
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />
        }

        return (
            <div id="Login">
                <Card>
                    <Card.Header>
                        Login
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default Login