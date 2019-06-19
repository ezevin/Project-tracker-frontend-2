import React, { Component } from 'react';
import { Form, Button, Popup, Header } from 'semantic-ui-react'

class Title extends Component {

  state = {
    title: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({title: this.props.title})
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({title: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { title } = this.state

    fetch(`http://localhost:3001/api/v1/projects/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ title })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchProjects())
        this.setState({isOpen: false})
  }
  render(){

    const value = this.state.title

    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Change Title:</label>
                    <input value={value} onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<Header className="textLead"  inverted color='grey'>{this.props.title}</Header>}
        on='click'
        position='bottom center'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default Title
