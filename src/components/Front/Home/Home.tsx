import React, { Component } from 'react'
import { Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Footer from '../../UI/Footer'
import NavBar from '../../UI/NavBar'

class Home extends Component {

    public redirect() {
        
    }

    public render() {
        return (
            <div id="Home">
                <NavBar />
                    <Row>
                        <Col className="col-sm offset-3">
                            <h1>Hi, I am Xander.</h1>
                            <Link to="/about" className="btn btn-primary">About me</Link>
                        </Col>
                        <Col className="col-sm">
                            <img src={`${process.env.PUBLIC_URL}/profile/me.jpg`} height={250} style={{borderRadius : 125}} alt="picture of me" />
                        </Col>
                    </Row>
                <Footer />
            </div>
        )
    }
}

export default Home