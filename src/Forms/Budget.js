import React, { Component } from 'react';
import { Form, Button, Popup } from 'semantic-ui-react'

class Budget extends Component {

  state = {
    budget: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({budget: this.props.budget})
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({budget: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { budget } = this.state
    fetch(`http://localhost:3001/api/v1/projects/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ budget })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchProjects())
        this.setState({isOpen: false})
  }
  render(){

    const value = this.state.budget

    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Update Budget:</label>
                    <input value={value} onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<h4>Budget: {this.props.budget}</h4>}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default Budget
