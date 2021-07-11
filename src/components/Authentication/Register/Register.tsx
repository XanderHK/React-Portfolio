import React, { ChangeEvent, Component } from 'react'
import { Form, Button, Card, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../../UI/NavBar'
import Footer from '../../UI/Footer'

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

    public _isMounted: boolean = false;

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

    public componentDidMount() {
        this._isMounted = true;
    }

    /**
     * 
     * @param event 
     */
    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        } as unknown as Pick<State, keyof State>)
    }

    /**
     * 
     * @param event 
     * @returns 
     */
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
            if (this._isMounted) {
                this.setState({
                    redirect: true
                })
            }
        })
    }

    /**
     * 
     * @returns 
     */
    public redirect() {
        return <Redirect to="/login" />
    }

    public componentWillUnmount() {
        this._isMounted = false;
    }

    public render() {
        if (this.state.redirect) {
            return this.redirect()
        }

        return (
            <div id="Register">
                <NavBar />
                <Row className="align-items-center Auth-background">
                    <Col className="col-sm-4 mx-auto">
                        <Card className="card-block h-100 justify-content-center">
                            <Card.Header className="text-center">
                                USER REGISTER
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faUser} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Form.Control name="username" type="text" placeholder="Enter username" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faEnvelope} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faLock} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faLock} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Form.Control name="confirmPassword" type="password" placeholder="Confirm password" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group>
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faSignInAlt} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Button variant="dark" type="submit" className="btn-block">
                                                    Register
                                                 </Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Footer />
            </div>
        )
    }
}

export default Register