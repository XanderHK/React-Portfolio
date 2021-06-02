import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

type Props = {
    name: string
}

class Upload extends Component<Props> {

    public render() {
        return <Form.Control type="file" id="file" name={this.props.name}></Form.Control>
    }

}

export default Upload