import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

type Props = {
    name: string
}

class Upload extends Component<Props> {

    public render() {
        return <Form.File type="file" id="file" name={this.props.name}></Form.File>
    }

}

export default Upload