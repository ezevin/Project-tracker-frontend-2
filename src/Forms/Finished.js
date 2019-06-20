import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Button, Modal } from 'semantic-ui-react'

class Finished extends Component {

  state = {
    finished: false,
    isOpen: false,
    finished_image: ""
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({finished_image: e.target.value})
  }

  handleClick = () => {
    // const { finished } = this.state
    // this.setState({finished: true})
    fetch(`http://localhost:3001/api/v1/projects/${this.props.projectId}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ finished: true })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(() => this.props.history.push('/gallery'))
        .then(()=> this.props.fetchProjects())
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { finished_image } = this.state

    fetch(`http://localhost:3001/api/v1/projects/${this.props.projectId}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ finished_image, finished: true })
        })
        .then(res=>res.json())
        .then(data => {
          this.setState({data})
          this.props.fetchProjects()
          this.props.history.push('/gallery')        })
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
        finished_image: `https://res.cloudinary.com/${"dwmlcwpfp"}/image/upload/${result.info.path}`, uploaded: true
      });
    }
    }
  ).open()
  }

  render(){
    // console.log(this.props);
    const form =   <Form type="submit" onSubmit={this.handleSubmit}>
                      <Button type="submit">All Done</Button>
                    </Form>
    return (
      <>
      <Modal size="mini" open={this.state.isOpen} onOpen={this.handleOpen} trigger={<Button inverted color="teal" type="button">I've Finished!</Button>}>
        <center><Modal.Header>CONGRATULATIONS!</Modal.Header></center>
        <Modal.Header as="h6"><center>CONGRATULATIONS! <br /> Would you like to add a final image? </center></Modal.Header>
          <Modal.Actions>
            <Button type="button" negative onClick={this.handleClick}>No</Button>
            <Modal size='mini' trigger={<Button positive icon='checkmark' labelPosition='right' content='Yes'  onClick={this.openWidget}/>}>
                <Modal.Content>
                  {form}
                </Modal.Content>
            </Modal>
          </Modal.Actions>
      </Modal>
      </>

    )
  }
}

export default withRouter(Finished)
