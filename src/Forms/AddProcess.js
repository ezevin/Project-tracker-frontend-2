import React, { Component } from 'react';
import { Form, Button, Popup, Icon } from 'semantic-ui-react'

class AddProcess extends Component {

  state = {
    process_pic: "",
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({process_pic: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // debugger
    const { process_pic } = this.state

    fetch(`http://localhost:3001/api/v1/to_do_lists/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ process_pic })
        })
        .then(res=>res.json())
        .then(data => {console.log(data)})
        .then(()=> this.props.fetchToDoList())
        this.setState({isOpen: false})
  }

  render(){
    // console.log(this.props);
    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Add A Process Picture:</label>
                    <input placeholder="Process Picture" onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<Icon size="small" name='file image outline' />}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default AddProcess
