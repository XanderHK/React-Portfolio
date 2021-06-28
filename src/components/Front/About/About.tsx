import React, { Component } from 'react'
import Footer from '../../UI/Footer'
import NavBar from '../../UI/NavBar'

class About extends Component {
    public render() {
        return (
            <div id="About">
                <NavBar />
                <div>About</div>
                <Footer />
            </div>
        )
    }
}

export default About