import React, { Component } from 'react';
import { Form, Button, Popup } from 'semantic-ui-react'

class Price extends Component {

  state = {
    price: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({price: this.props.price})
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({price: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { price } = this.state
    fetch(`http://localhost:3001/api/v1/materials/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ price })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchMaterials())
        this.setState({isOpen: false})
  }
  render(){
    const value = this.state.price

    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Update Price:</label>
                    <input value={value} onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<h4>Price:{this.props.price}</h4>}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default Price
