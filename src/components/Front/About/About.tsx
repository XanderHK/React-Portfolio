import React, { Component } from 'react'
import Footer from '../../UI/Footer'
import NavBar from '../../UI/NavBar'
import EducationTimeline from './timelines/EducationTimeline'

class About extends Component {
    public render() {
        return (
            <div id="About">
                <NavBar />
                <div>About</div>
                <EducationTimeline />
                <Footer />
            </div>
        )
    }
}

export default About