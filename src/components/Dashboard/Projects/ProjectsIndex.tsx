import React, { Component } from 'react'
import axios from 'axios'

type Props = {

}

type State = {
    projects: {}[]
}

class ProjectIndex extends Component<Props, State> {

    public componentDidMount() {
        this.getProjects()
    }

    public getProjects = () => {
        axios.get(process.env.REACT_APP_API_URL + 'dashboard/projects')
            .then(res => {
                console.log(res.data)
                this.setState({
                    projects: res.data
                })
            })
            .catch(err => console.log(err))
    }

    public render() {
        if (this.state == null) return <div />
        return (
            <div id="Projects">
                <ul>
                    {this.state.projects.map((project: any) => {
                        return <li>{project.projectname}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default ProjectIndex