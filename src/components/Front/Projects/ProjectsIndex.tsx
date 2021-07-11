import React, { Component } from 'react'
import axios from 'axios'
import { Project } from '../../../types/types'
import { Row, Card, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faDesktop, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import NavBar from '../../UI/NavBar'
import Footer from '../../UI/Footer'
import { chunk } from '../../../functions/functions'

type Props = {

}

type State = {
    projects: Project[][],
    projectsIndex: number
}

class FrontProjectsIndex extends Component<Props, State> {

    public constructor(props: Props) {
        super(props)
        this.state = {
            projects: [],
            projectsIndex: 0
        }
    }

    public componentDidMount() {
        this.getProjects()
    }

    private getProjects(): void {
        axios.get(process.env.REACT_APP_API_URL + 'dashboard/projects')
            .then(res => {
                console.log(res)
                const projectChunks = chunk(res.data, 4)
                this.setState({
                    projects: projectChunks,
                    projectsIndex: 0
                })
            })
    }

    private switchPage = (event: React.MouseEvent<HTMLElement>) => {
        const id: string = (event.target as HTMLButtonElement).id
        const number: number = id === 'prev' ? -1 : 1
        const newIndex = this.state.projectsIndex + number

        this.setState({
            projectsIndex: newIndex
        })

        if (this.state.projectsIndex + 2 > this.state.projects.length) {
            this.setState({
                projectsIndex: 0
            })
            return
        }

        if (this.state.projectsIndex < 0) {
            this.setState({
                projectsIndex: this.state.projects.length - 1
            })
            return
        }
    }

    public componentDidUpdate() {
        console.log(this.state.projectsIndex)
    }

    public render() {
        if (this.state === null) return <div />
        return (
            <div id="ProjectsIndex">
                <NavBar />
                <div className="content">
                    <Row>
                        {this.state.projects[this.state.projectsIndex]?.map((project: Project, index: number) => {
                            return (
                                <Col className="col-sm" key={index}>
                                    <Card>
                                        <Card.Header>
                                            <img src={`${process.env.PUBLIC_URL}/uploads/${project.projectimagepath}`} height={250} alt="" />
                                        </Card.Header>
                                        <Card.Body>
                                            <h5 className="card-title">{project.projectname}</h5>
                                            <p>
                                                {project.projectdescription}
                                            </p>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Row>
                                                <Col className="col-sm-6 d-flex justify-content-center"><a href={'https://' + project.projectgithuburl} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a></Col>
                                                <Col className="col-sm-6 d-flex justify-content-center"><a href={'https://' + project.projectsiteurl} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDesktop} /></a></Col>
                                            </Row>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                    <Row>
                        <Col className="col-sm-4 mx-auto">
                            <Row>
                                <Col className="col-sm-6 d-flex justify-content-center">
                                    <Button type="button" id="prev" variant="dark" onClick={this.switchPage}>
                                        <FontAwesomeIcon icon={faArrowLeft} color="white" />
                                    </Button>
                                </Col>
                                <Col className="col-sm-6 d-flex justify-content-center">
                                    <Button type="button" id="next" variant="dark" onClick={this.switchPage}>
                                        <FontAwesomeIcon icon={faArrowRight} color="white" />
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <Footer />
            </div>
        )
    }
}

export default FrontProjectsIndex