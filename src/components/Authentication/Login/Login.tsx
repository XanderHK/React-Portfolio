import React, { ChangeEvent, Component } from 'react'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { Redirect } from 'react-router'
import GlobalState from '../../../contexts/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../../UI/NavBar'
import Footer from '../../UI/Footer'

type Props = {
}

type State = {
    email: string
    password: string
    redirect: boolean
}

class Login extends Component<Props, State> {

    static contextType = GlobalState
    public _isMounted: boolean

    public constructor(props: Props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: false,
        }
        this._isMounted = false
    }

    public componentDidMount() {
        this._isMounted = true
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
     */
    private handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const data = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(process.env.REACT_APP_API_URL + 'auth/login', data)
            .then((res) => {
                this.context.setToken(res.data)
                if (this._isMounted) {
                    this.setState({
                        redirect: true
                    })
                }
            })
            .catch((err) => console.log(err))
    }

    public redirect() {
        return <Redirect to="/dashboard" />
    }

    public componentWillUnmount() {
        this._isMounted = false
    }


    public render() {
        if (this.state.redirect) {
            return this.redirect()
        }

        return (
            <div id="Login">
                <NavBar />
                <Row className="align-items-center Auth-background">
                    <Col className="col-sm-4 mx-auto">
                        <Card className="card-block h-100 justify-content-center">
                            <Card.Header className="text-center">
                                USER LOGIN
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
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
                                    <Form.Group>
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faSignInAlt} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Button variant="dark" type="submit" className="btn-block">
                                                    Login
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
            </div >
        )
    }
}

export default Login