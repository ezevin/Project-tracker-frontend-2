import React, { Component } from 'react'
import { } from 'react-router-dom'
import { Image, Modal, Card, Button, Icon } from 'semantic-ui-react'

class ProcessModal extends Component {

  state = {
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  render(){

    const process = this.props.toDoList.filter(picture => {
      if(picture.project_id === this.props.projectId){
        return picture
      }
    })
    return (
      <Modal
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        trigger={
        <Button primary icon>
          Process Pictures <Icon name='right chevron' />
        </Button>} >
        <Modal.Content image>
          { process.map(picture => {
            return <Card key={picture.id}><Card.Content><Card.Header>{picture.item}</Card.Header></Card.Content><Image wrapped size='medium' src={picture.process_pic} /></Card>
          })}
        </Modal.Content>
         <Button floated="right" icon='check' content='Back To Project Details' onClick={this.handleClose} />
      </Modal>
    )}
  }

  export default ProcessModal
