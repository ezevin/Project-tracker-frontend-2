import React, { Component } from 'react';
import { Form, Button, Popup } from 'semantic-ui-react'

class ProjectDeets
 extends Component {

  state = {
    details: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({details: this.props.details})
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({details: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { details } = this.state

    fetch(`http://localhost:3001/api/v1/projects/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ details })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchProjects())
        this.setState({isOpen: false})
  }
  render(){

    const value = this.state.details

    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Change Summary:</label>
                    <input value={value} onChange={this.handleChange} />
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<h4>Summary: {this.props.details}</h4>}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />
    )
  }
}

export default ProjectDeets
