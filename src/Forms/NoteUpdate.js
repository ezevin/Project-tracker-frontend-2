import React, { Component } from 'react';
import { Form, Button, Popup, Icon } from 'semantic-ui-react'

class NoteUpdate extends Component {

  state = {
    note: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({note: this.props.note})
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({note: e.target.value})
  }

  handleSubmit= (id) => {
    const { note } = this.state

    fetch(`http://localhost:3001/api/v1/notes/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ note })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchNotes())
        this.setState({isOpen: false})
  }

  render(){

    const value = this.state.note

    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Update Note:</label>
                    <input type="text" value={value} onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <>
      <Popup
        content={form}
        trigger={<Icon size="small" className="blue" name='pencil alternate' />}
        on='click'
        position='top left'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />


    </>

    )
  }
}

export default NoteUpdate
