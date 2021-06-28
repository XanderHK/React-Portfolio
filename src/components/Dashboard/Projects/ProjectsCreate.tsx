import React, { ChangeEvent, Component } from 'react'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Upload from '../../common/Upload'
import GlobalState from '../../../contexts/GlobalState'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignature, faFileSignature, faImage, faPlusSquare, faDesktop } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

type Props = {

}

type State = {
    redirect: boolean
}

class ProjectCreate extends Component<Props, State> {

    static contextType = GlobalState
    public _isMounted = false

    public constructor(props: Props) {
        super(props)
        this.state = {
            redirect: false,
        }
    }

    public componentDidMount() {
        this._isMounted = true;
    }

    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value
        } as unknown as Pick<State, keyof State>)
    }

    private handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const headers = {
            headers: {
                'Authorization': `Bearer [${this.context.getToken()}]`,
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post(process.env.REACT_APP_API_URL + "dashboard/projects/create", formData, headers)
            .then(res => {
                if (this._isMounted) {
                    this.setState({
                        redirect: true
                    })
                }
            })
            .catch(err => {
                this.context.setError(err.response.data)
                console.log(err.response.data)
            })
    }

    /**
     * 
     * @returns 
     */
    public redirect() {
        return <Redirect to="/dashboard/projects" />
    }

    public componentWillUnmount() {
        this._isMounted = false
    }

    public render() {
        if (this.state.redirect) {
            return this.redirect()
        }

        return (
            <div id="ProjectCreate" className="Form-background">
                <Row className="align-items-center">
                    <Col className="col-sm-4 mx-auto">
                        <Card>
                            <Card.Header className="text-center">
                                CREATE PROJECT
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faSignature} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Form.Control name="projectName" type="text" placeholder="Enter project name" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group>
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faFileSignature} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Form.Control as="textarea" rows={3} name="projectDescription" type="text" placeholder="project description" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group>
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faGithub} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Form.Control name="projectGithubUrl" type="text" placeholder="Enter github url" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group>
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faDesktop} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Form.Control name="projectSiteUrl" type="text" placeholder="Enter site url" onChange={this.handleChange} />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group>
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faImage} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Upload name="projectFile" />
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group>
                                        <Row>
                                            <Col className="col-sm-2">
                                                <Form.Label><div className="round-btn"><FontAwesomeIcon icon={faPlusSquare} color="white" /></div></Form.Label>
                                            </Col>
                                            <Col className="col-sm-10">
                                                <Button variant="dark" type="submit" className="btn-block">
                                                    Create
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default ProjectCreate