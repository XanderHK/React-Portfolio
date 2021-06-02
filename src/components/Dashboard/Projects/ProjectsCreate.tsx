import React, { ChangeEvent, Component } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import Upload from '../../common/Upload'
import GlobalState from '../../../contexts/GlobalState'

type Props = {

}

type State = {
    errors: string[]
}

class ProjectCreate extends Component<Props, State> {

    static contextType = GlobalState

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
            .then(res => console.log(res))
            .catch(err => console.log(err.response.data))
    }

    public render() {
        return (
            <div id="ProjectCreate">
                <Card>
                    <Card.Header>
                        Create Project
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Label>Project name</Form.Label>
                                <Form.Control name="projectName" type="text" placeholder="Enter project name" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Project description</Form.Label>
                                <Form.Control name="projectDescription" type="text" placeholder="project description" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Project cover</Form.Label>
                                <Upload name="projectFile" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Create project
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }

}

export default ProjectCreate