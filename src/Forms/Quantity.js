import React, { Component } from 'react';
import { Form, Button, Popup } from 'semantic-ui-react'

class Quantity extends Component {

  state = {
    quantity: "",
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({quantity: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { quantity } = this.state
    fetch(`http://localhost:3001/api/v1/materials/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ quantity })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchMaterials())
        this.setState({isOpen: false})
  }
  render(){
    // console.log(this.props);
    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Update Quantity:</label>
                    <input placeholder={this.props.quantity} onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<h4>Quantity:{this.props.quantity}</h4>}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default Quantity
