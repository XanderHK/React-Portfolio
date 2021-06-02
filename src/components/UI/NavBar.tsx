import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import Logout from '../Authentication/Logout/Logout'

class NavBar extends Component {



    public render() {
        return (
            <Nav
                // eslint-disable-next-line no-restricted-globals
                activeKey={location.pathname}
            >
                <Nav.Item>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/register">Register</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link><Logout /></Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }
}

export default NavBar