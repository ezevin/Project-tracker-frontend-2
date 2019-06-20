import React, { Component } from 'react';
import { Form, Button, Popup, Icon } from 'semantic-ui-react'

class ProfilePic extends Component {

  state = {
    profile_picture: "",
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({profile_picture: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { profile_picture } = this.state
    fetch(`http://localhost:3001/api/v1/users/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ profile_picture })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchUserData())
        this.setState({isOpen: false})
  }

  openWidget = () => {
    window.cloudinary.createUploadWidget(
    {
      cloudName: "dwmlcwpfp",
      uploadPreset: "urxqwcln"
    },
    (error, result) => {
    if(result && result.event === "success"){
      this.setState({
          profile_picture: `https://res.cloudinary.com/${"dwmlcwpfp"}/image/upload/${result.info.path}`, uploaded: true
      });
    }
    }
  ).open()
  }

  render(){
    // console.log(this.props);
    const form = <Form onSubmit={this.handleSubmit}>

                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<Icon size="small" name='add'  onClick={this.openWidget} />}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default ProfilePic
