import React, { Component } from 'react'
import { } from 'react-router-dom'
import { Image, Modal, Card, Button, Icon, Grid } from 'semantic-ui-react'

const NUM_PROJECTS = 4

class ResearchModal extends Component {

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

    let count = this.state.slideIndex+NUM_PROJECTS
    let total = (this.props.research.length)

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
    const research = this.props.research.filter(research => {
      return research.project_id === this.props.projectId
    })

    const { slideIndex } = this.state
    const displayedResearch = research.slice(slideIndex, slideIndex + NUM_PROJECTS)

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
          <Grid className="modalPicContainer">
            <Grid.Column width={1} className="">
              <button className="modalButton " onClick={this.minusSlides}>&#10094;</button>
            </Grid.Column>
            <Grid.Column width={14} className="">
              <Grid columns={4} padded className="cards ">
               {displayedResearch.map(research => {
                return <Card  className="modalImg" key={research.id}><Image wrapped size='medium' src={research.image}  /></Card>
              })}
            </Grid>
          </Grid.Column>
          <Grid.Column  width={1} className="">
            <button className="modalButton" onClick={this.plusSlides}>&#10095;</button>
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Button floated="left" icon='check' content='Back To Project Details' onClick={this.handleClose} />
    </Modal>
    )}

  }

  export default ResearchModal
