import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Form, Button, Modal } from 'semantic-ui-react'

class Finished extends Component {

  state = {
    finished: false,
    isOpen: false,
    finished_image: "https://image.shutterstock.com/image-vector/empty-background-style-png-blank-450w-676832590.jpg"
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
    console.log("state",this.state);
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
        .then(this.props.history.push('/gallery'))
        .then(()=> this.props.fetchProjects())
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { finished_image } = this.state
    this.props.history.push('/gallery')

    fetch(`http://localhost:3001/api/v1/projects/${this.props.projectId}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ finished_image, finished: true })
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)}, this.props.fetchProjects())
  }

  render(){
    console.log(this.props);
    const form =   <Form onSubmit={this.handleSubmit}>
                     <Form.Field>
                       <label>Picture URL:</label>
                       <input onChange={this.handleChange}/>
                     </Form.Field>
                      <Button icon='check' type="submit">All Done</Button>
                    </Form>
    return (
      <>
      <Modal size="mini" open={this.state.isOpen} onOpen={this.handleOpen} trigger={<Button type="button">I've Finished!</Button>}>
        <center><Modal.Header>CONGRATULATIONS!</Modal.Header></center>
        <Modal.Header as="h6"><center>CONGRATULATIONS! <br /> Would you like to add a final image? </center></Modal.Header>
          <Modal.Actions>
            <Button type="button" negative onClick={this.handleClick}>No</Button>
            <Modal size='small' trigger={<Button positive icon='checkmark' labelPosition='right' content='Yes' />}>
              <Modal.Header>Add Picture</Modal.Header>
                <Modal.Content>
                  {form}
                </Modal.Content>
                <Modal.Actions>
                </Modal.Actions>
            </Modal>
          </Modal.Actions>
      </Modal>
      </>

    )
  }
}

export default withRouter(Finished)
