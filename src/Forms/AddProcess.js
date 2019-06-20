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

  openWidget = () => {
    window.cloudinary.createUploadWidget(
    {
      cloudName: "dwmlcwpfp",
      uploadPreset: "urxqwcln"
    },
    (error, result) => {
    if(result && result.event === "success"){
      this.setState({
        process_pic: `https://res.cloudinary.com/${"dwmlcwpfp"}/image/upload/${result.info.path}`, uploaded: true
      });
    }
    }
  ).open()
  }

  render(){
    // console.log(this.props);
    const form = <Form  type='submit' onSubmit={this.handleSubmit}>
                  <Button type='submit'>Submit</Button>
                </Form>

    return (
      <Popup
        content={form}
        trigger={<Icon size="small" className="blue" name='file image outline' onClick={this.openWidget} />}
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
