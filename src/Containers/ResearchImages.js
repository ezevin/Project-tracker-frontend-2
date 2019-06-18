import React, { Component } from 'react'
import { Header, Grid, Popup, Icon, Form, Button } from 'semantic-ui-react'

import ResearchGallery from '../Components/ResearchGallery'

const NUM_PROJECTS = 5

class ResearchImages extends Component {
  state = {
    isOpen: false,
    image: "",
    slideIndex: 0
  }

  plusSlides = (n) => {
    let count = this.state.slideIndex+NUM_PROJECTS
    let total = (this.props.researches.length)

    if (count < total){
      this.setState({slideIndex: this.state.slideIndex + NUM_PROJECTS})
    }
  }

  minusSlides = (n) => {
    let count = this.state.slideIndex+NUM_PROJECTS

    if (count > 5){
      this.setState({slideIndex: this.state.slideIndex - NUM_PROJECTS})
    }
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({image: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { image } = this.state

    fetch(`http://localhost:3001/api/v1/researches`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ image: image, project_id: this.props.projectId})
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchResearchImages())
        this.setState({isOpen: false})
  }
  render(){
    const { slideIndex } = this.state
    const displayedResearch = this.props.researches.slice(slideIndex, slideIndex + NUM_PROJECTS)

    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Image Url:</label>
                    <input placeholder='Title' onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Add Image</Button>
                </Form>

    return(
      <div className="look researchContainer textAll">
        <Header inverted color='grey' textAlign="center" as='h2' className="textLead">
          <Popup trigger={<Icon size="small" name='add'/>}
                  content={form}
                  on='click'
                  position='top left'
                  open={this.state.isOpen}
                  onOpen={this.handleOpen}
                  onClose={this.handleClose}
                  />Research Images:
        </Header>
        <Grid className="">
          <Grid.Column width={1}>
            <button className="researchButton" onClick={this.minusSlides}>&#10094;</button>
          </Grid.Column>
          <Grid.Column width={14}>
            <Grid columns={5} padded className="link cards ">
              {displayedResearch.map(research =>(
                 <ResearchGallery key={research.id} research={research} id={research.id} photo={research.image} deleteResearch={this.props.deleteResearch}/>
              ))}
            </Grid>
          </Grid.Column>
          <Grid.Column width={1}>
            <button className="researchButton" onClick={this.plusSlides}>&#10095;</button>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default ResearchImages
