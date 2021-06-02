import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import Logout from '../Authentication/Logout/Logout'
import GlobalState from '../../contexts/GlobalState'

class NavBar extends Component {

    static contextType = GlobalState

    /**
     * 
     * @returns 
     */
    public menu() {
        const token = this.context.getToken()
        const url = window.location.href
        const left = [];
        const right = []

        if (url.includes('dashboard')) {
            left.push(...[<Nav.Link href="/dashboard">Dashboard</Nav.Link>, <Nav.Link href="/dashboard/projects">Projects</Nav.Link>, <Nav.Link href="/dashboard/users">Users</Nav.Link>])
            right.push(<Nav.Link href="/">Site</Nav.Link>)
        }

        if (!url.includes('dashboard')) {
            if (token) {
                right.push(<Nav.Link href="/dashboard">Dashboard</Nav.Link>)
            }
            left.push(...[<Nav.Link>Home</Nav.Link>, <Nav.Link>About</Nav.Link>, <Nav.Link>Projects</Nav.Link>])
        }

        if (token) {
            right.push(<Nav.Link><Logout /></Nav.Link>)
        }

        if (!token) {
            right.push(...[<Nav.Link href="/login">Login</Nav.Link>, <Nav.Link href="/register">Register</Nav.Link>])
        }

        if (token) {
            return (
                <React.Fragment>
                    <ul className="navbar-nav mr-auto">
                        {left.map((element, index) => {
                            return (
                                <Nav.Item key={index}>
                                    {element}
                                </Nav.Item>
                            )
                        })}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {right.map((element, index) => {
                            return (
                                <Nav.Item key={index}>
                                    {element}
                                </Nav.Item>
                            )
                        })}
                    </ul>
                </React.Fragment >
            )
        }
        return (
            <React.Fragment>
                <ul className="navbar-nav mr-auto">
                    {left.map((element, index) => {
                        return (
                            <Nav.Item key={index}>
                                {element}
                            </Nav.Item>
                        )
                    })}
                </ul>
                <ul className="navbar-nav ml-auto">
                    {right.map((element, index) => {
                        return (
                            <Nav.Item key={index}>
                                {element}
                            </Nav.Item>
                        )
                    })}
                </ul>
            </React.Fragment>
        )
    }

    public render() {
        return (
            <Nav
                // eslint-disable-next-line no-restricted-globals
                activeKey={location.pathname}
                className="navbar navbar-expand-lg navbar-dark rounded"
            >
                {this.menu()}
            </Nav>
        )
    }
}

export default NavBar