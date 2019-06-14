import React, { Component } from 'react'
import { } from 'react-router-dom'
import { Image, Modal, Card, Button, Icon } from 'semantic-ui-react'

class ResearchModal extends Component {

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
    const research = this.props.research.filter(research => {
      if(research.project_id === this.props.projectId){
        return research
      }
    })

    return (
      <Modal
        open={this.state.isOpen}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        trigger={
          <Button floated="left" primary icon>
            Research Images <Icon name='right chevron' />
          </Button>} >
        <Modal.Content image>
           {research.map(research => {
            return <Card key={research.id}><Image wrapped size='medium' src={research.image}  /></Card>
          })}
      </Modal.Content>
      <Button floated="left" icon='check' content='Back To Project Details' onClick={this.handleClose} />
    </Modal>
    )}

  }

  export default ResearchModal
