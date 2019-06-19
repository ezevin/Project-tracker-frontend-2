import React, { Component } from 'react';
import { Form, Button, Popup } from 'semantic-ui-react'

class DueDate extends Component {

  state = {
    due_date: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({due_date: this.props.due_date})
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({due_date: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { due_date } = this.state

    fetch(`http://localhost:3001/api/v1/projects/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ due_date })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchProjects())
        this.setState({isOpen: false})
  }
  render(){

    const value = this.state.due_date

    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Change Due Date:</label>
                    <input type="date" value={value} onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<h4>Date Due: {this.props.due_date}</h4>}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default DueDate
