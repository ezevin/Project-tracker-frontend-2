import React, { Component } from 'react';
import { Form, Button, Popup, Image } from 'semantic-ui-react'

class ItemImage extends Component {

  state = {
    image_url: "",
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({image_url: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { image_url } = this.state
    fetch(`http://localhost:3001/api/v1/materials/${this.props.id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ image_url })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchMaterials())
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
        image_url: `https://res.cloudinary.com/${"dwmlcwpfp"}/image/upload/${result.info.path}`, uploaded: true
      });
    }
    }
  ).open()
  }

  render(){
    console.log(this.props);
    const form = <Form onSubmit={this.handleSubmit}>
                  <Button type='submit'>Submit</Button>
                 </Form>

    return (
      <Popup
        content={form}
        trigger={<Image size="small" src={this.props.image_url} onClick={this.openWidget}/>}
        on='click'
        position='bottom right'
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
            />

    )
  }
}

export default ItemImage
