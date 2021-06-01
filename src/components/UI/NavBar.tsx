import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'

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
            </Nav>
        )
    }
}

export default NavBar