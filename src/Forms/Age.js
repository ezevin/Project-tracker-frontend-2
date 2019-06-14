import React, { Component } from 'react';
import { Form, Button, Popup, Icon } from 'semantic-ui-react'

class Age extends Component {

  state = {
    age: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({age: this.props.age})
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({age: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { age } = this.state
    fetch(`http://localhost:3001/api/v1/users/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ age })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchUserData())
        this.setState({isOpen: false})
  }
  render(){
    const value = this.state.age

    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Update Age:</label>
                    <input value={value} onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<Icon size="small" name='add' />}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default Age
