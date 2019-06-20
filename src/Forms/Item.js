import React, { Component } from 'react';
import { Form, Button, Popup } from 'semantic-ui-react'

class Item extends Component {

  state = {
    label: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({label: this.props.label})
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({label: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { label } = this.state
    fetch(`http://localhost:3001/api/v1/materials/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ label })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchMaterials())
        this.setState({isOpen: false})
  }
  render(){
    const value = this.state.label
    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Update Item:</label>
                    <input value={value} onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<h3 className="inverseText">{this.props.label}</h3>}
        on='click'
        position='bottom right'
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default Item
