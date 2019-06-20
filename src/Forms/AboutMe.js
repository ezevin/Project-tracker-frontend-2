import React, { Component } from 'react';
import { Form, Button, Popup, Icon } from 'semantic-ui-react'

class AboutMe extends Component {

  state = {
    about_me: "",
    isOpen: false
  }

  componentDidMount() {
    this.setState({about_me: this.props.about_me})
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({about_me: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { about_me } = this.state
    fetch(`http://localhost:3001/api/v1/users/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ about_me })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchUserData())
        this.setState({isOpen: false})
  }
  render(){
    console.log(this.props, this.state);

    const value = this.state.about_me

    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Update About Me:</label>
                    <input type="text" value={value} onChange={this.handleChange}/>
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

export default AboutMe
