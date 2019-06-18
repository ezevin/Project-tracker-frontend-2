import React, { Component } from 'react'
import { } from 'react-router-dom'
import { Image, Modal, Card, Button, Icon, Header, Grid } from 'semantic-ui-react'

const NUM_PROJECTS = 4

class ProcessModal extends Component {

  state = {
    isOpen: false,
    slideIndex: 0
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  plusSlides = (n) => {
    const process = this.props.toDoList.filter(picture => {
      return picture.project_id === this.props.projectId
    })

    const real = process.filter(pic => {
      return pic.process_pic !== "https://image.shutterstock.com/image-vector/empty-background-style-png-blank-450w-676832590.jpg"
    })

    let count = this.state.slideIndex+NUM_PROJECTS
    let total = (real.length)

    if (count < total){
      this.setState({slideIndex: this.state.slideIndex + NUM_PROJECTS})
    }
  }

  minusSlides = (n) => {
    let count = this.state.slideIndex+NUM_PROJECTS

    if (count > 4){
      this.setState({slideIndex: this.state.slideIndex - NUM_PROJECTS})
    }
  }

  render(){

    const process = this.props.toDoList.filter(picture => {
      return picture.project_id === this.props.projectId
    })

    const real = process.filter(pic => {
      return pic.process_pic !== "https://image.shutterstock.com/image-vector/empty-background-style-png-blank-450w-676832590.jpg"
    })

    const { slideIndex } = this.state
    const displayedProcess = real.slice(slideIndex, slideIndex + NUM_PROJECTS)

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
        <Grid className="modalPicContainer">
          <Grid.Column width={1} className="">
            <button className="modalButton " onClick={this.minusSlides}>&#10094;</button>
          </Grid.Column>
          <Grid.Column width={14} className="">
            <Grid columns={4} padded className="cards ">
            { displayedProcess.map(picture => {
              return <Card className="modalDetail" key={picture.id}>
              <Image wrapped size='medium' src={picture.process_pic} />
              <Header className="centered " as="h3">{picture.item}</Header>
              </Card>
            })}
            </Grid>
          </Grid.Column>
          <Grid.Column  width={1} className="">
            <button className="modalButton" onClick={this.plusSlides}>&#10095;</button>
          </Grid.Column>
        </Grid>
        </Modal.Content>
         <Button floated="right" icon='check' content='Back To Project Details' onClick={this.handleClose} />
      </Modal>
    )}
  }

  export default ProcessModal
