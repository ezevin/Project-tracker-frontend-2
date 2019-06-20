import React, { Component } from 'react';
import { Form, Button, Popup } from 'semantic-ui-react'

class Place extends Component {

  state = {
    place_purchased: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({place_purchased: this.props.place_purchased})
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({place_purchased: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { place_purchased } = this.state
    fetch(`http://localhost:3001/api/v1/materials/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ place_purchased })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchMaterials())
        this.setState({isOpen: false})
  }
  render(){
    const value = this.state.place_purchased
    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Update Place Purchased:</label>
                    <input value={value} onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<h4>Place Purchased: {this.props.place_purchased}</h4>}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default Place
