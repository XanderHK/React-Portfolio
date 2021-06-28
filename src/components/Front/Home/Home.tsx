import React, { Component } from 'react'
import Footer from '../../UI/Footer'
import NavBar from '../../UI/NavBar'

class Home extends Component {
    public render() {
        return (
            <div id="Home">
                <NavBar />
                <div>Home</div>
                <Footer />
            </div>
        )
    }
}

export default Home