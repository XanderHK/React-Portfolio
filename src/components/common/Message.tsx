import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'
import GlobalState from '../../contexts/GlobalState'

type Props = {
    text: string,
    variant: string
}

class Message extends Component<Props> {

    static contextType = GlobalState

    public componentDidMount = () => {
        // setInterval(() => {
        //     this.remove()
        // }, 1000)
    }

    private remove() {
        this.context.removeError(this.props.text)
    }

    public render() {
        return (
            <Alert variant={this.props.variant} onClick={this.remove.bind(this)}>
                {this.props.text}
            </Alert>
        )
    }
}

export default Message