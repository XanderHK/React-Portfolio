import React, { Component } from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import Logout from '../Authentication/Logout/Logout'
import GlobalState from '../../contexts/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Message from '../common/Message'

class NavBar extends Component {

    static contextType = GlobalState

    /**
     * 
     * @returns 
     */
    public menu() {
        const token: string = this.context.getToken()
        const isOnAdminPanel: boolean = this.context.isOnAdminPanel()
        const left: JSX.Element[] = []
        const right: JSX.Element[] = []

        if (isOnAdminPanel && token) {
            left.push(...[<Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>, <Nav.Link as={Link} to="/dashboard/projects">Projects</Nav.Link>, <Nav.Link as={Link} to="/dashboard/users">Users</Nav.Link>])
            right.push(<Nav.Link as={Link} to="/"><Button variant="dark" type="button">Site</Button></Nav.Link>)
        }

        if (!isOnAdminPanel || !token) {
            if (token) {
                right.push(<Nav.Link as={Link} to="/dashboard"><Button variant="dark" type="button">Dashboard</Button></Nav.Link>)
            }
            left.push(...[<Nav.Link as={Link} to="/">Home</Nav.Link>, <Nav.Link as={Link} to="/about">About</Nav.Link>, <Nav.Link as={Link} to="/projects">Projects</Nav.Link>])
        }

        if (token) {
            right.push(<Nav.Link as={Link} to="/login" ><Logout /></Nav.Link>)
        }

        if (!token) {
            right.push(...[<Nav.Link as={Link} to="/login"><Button variant="dark" type="button"><FontAwesomeIcon icon={faSignInAlt} /></Button></Nav.Link>, <Nav.Link as={Link} to="/register"><Button variant="dark" type="button"><FontAwesomeIcon icon={faUserPlus} /></Button></Nav.Link>])
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
            <div id="NavBar">
                <Navbar expand="lg">
                    {/* <Navbar.Brand><img className="img-responsive logo" src="https://xanderhk.nl/img/logo.png" alt="" /></Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav
                            // eslint-disable-next-line no-restricted-globals
                            activeKey={location.pathname}
                            className="navbar navbar-expand-lg navbar-dark rounded w-100">
                            {this.menu()}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {
                    this.context.errors.map((error: string) => {
                        return <Message text={error} variant="danger" />
                    })
                }
            </div >
        )
    }
}

export default NavBar