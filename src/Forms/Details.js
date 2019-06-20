import React, { Component } from 'react';
import { Form, Button, Popup } from 'semantic-ui-react'

class Details extends Component {

  state = {
    description: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({description: this.props.description})
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({description: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { description } = this.state
    fetch(`http://localhost:3001/api/v1/materials/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ description })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchMaterials())
        this.setState({isOpen: false})
  }

  render(){

    const value = this.state.description
    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Update Details:</label>
                    <input value={value} onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<h4> Details: {this.props.description}</h4>}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default Details
