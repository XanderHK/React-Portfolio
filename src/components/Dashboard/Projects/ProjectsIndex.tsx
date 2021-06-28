import React, { Component } from 'react'
import axios from 'axios'
import GlobalState from '../../../contexts/GlobalState'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

type Props = {

}

type State = {
    projects: {}[],
}

class ProjectIndex extends Component<Props, State> {

    static contextType = GlobalState

    public componentDidMount() {
        this.getProjects()
    }

    private getProjects = () => {
        axios.get(process.env.REACT_APP_API_URL + 'dashboard/projects')
            .then(res => {
                this.setState({
                    projects: res.data
                })
            })
            .catch(err => console.log(err))
    }

    private deleteProject = (id: number): void => {
        const headers = {
            headers: {
                'Authorization': `Bearer [${this.context.getToken()}]`,
                'Content-Type': 'multipart/form-data'
            }
        }
        axios
            .delete(process.env.REACT_APP_API_URL + `dashboard/projects/${id}`, headers)
            .then(res => {
                if (res.status === 200) {
                    this.getProjects();
                }
            })
            .catch(err => console.log(err))
    }

    public render() {
        if (this.state == null) return <div />
        return (
            <div id="Projects">
                <Link to="/dashboard/projects/create"><Button variant="dark">Create</Button></Link>
                <hr />
                <table>
                    <thead>
                        <tr>
                            <th>
                                Name:
                            </th>
                            <th>
                                Actions:
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map((project: any, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{project.projectname}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => this.deleteProject(project.projectid)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProjectIndex