import React, { Component } from 'react'
import GlobalState from '../../contexts/GlobalState'
import { Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faGitlab } from '@fortawesome/free-brands-svg-icons'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

class Footer extends Component {

    static contextType = GlobalState

    public render() {
        if (this.context.isOnAdminPanel()) return <div />
        return (
            <footer className="footer">
                <Row>
                    <Col className="col-sm-4 mx-auto">
                        <Row>
                            <Col className="col-sm-3 d-flex justify-content-center">
                                <FontAwesomeIcon icon={faLinkedin} color="white" size="lg" />
                            </Col>
                            <Col className="col-sm-3 d-flex justify-content-center">
                                <FontAwesomeIcon icon={faGithub} color="white" size="lg" />
                            </Col>
                            <Col className="col-sm-3 d-flex justify-content-center">
                                <FontAwesomeIcon icon={faGitlab} color="white" size="lg" />
                            </Col>
                            <Col className="col-sm-3 d-flex justify-content-center">
                                <FontAwesomeIcon icon={faAddressBook} color="white" size="lg" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </footer>
        )
    }
}

export default Footer