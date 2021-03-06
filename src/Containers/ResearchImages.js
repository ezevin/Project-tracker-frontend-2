import React, { Component } from 'react'
import { Grid, Popup, Form, Button, Icon } from 'semantic-ui-react'

import '../CSS/ResearchCSS.css'

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

    fetch(`https://fabfolio-backend.herokuapp.com/api/v1/researches`, {
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

  openWidget = () => {
    window.cloudinary.createUploadWidget(
    {
      cloudName: "dwmlcwpfp",
      uploadPreset: "urxqwcln"
    },
    (error, result) => {
    if(result && result.event === "success"){
      this.setState({
        image: `https://res.cloudinary.com/${"dwmlcwpfp"}/image/upload/${result.info.path}`, uploaded: true
      });
    }
    }
  ).open()
  }

  render(){
    const { slideIndex } = this.state
    const displayedResearch = this.props.researches.slice(slideIndex, slideIndex + NUM_PROJECTS)

    const form = <Form onSubmit={this.handleSubmit}>
                  <Button type='submit'>Add Image</Button>
                 </Form>

    return(
      <div className="look researchContainer textAll">
        <Grid>
          <Grid.Column textAlign="right" width={10}>
            <h2>Research Images:</h2>
          </Grid.Column>
          <Grid.Column width={4}>
            <Popup trigger={<Icon size="large" className="blue pointer" name='file image outline' onClick={this.openWidget} />}
                  content={form}
                  on='click'
                  position='top left'
                  open={this.state.isOpen}
                  onOpen={this.handleOpen}
                  onClose={this.handleClose}
                  />
          </Grid.Column>
        </Grid>
        <div className="researchdetails">
        <Grid className="">

            <button className="researchButtonLeft" onClick={this.minusSlides}>&#10094;</button>
            <div className="researchgallery">
              <Grid columns={5} padded className="link cards ">
                {displayedResearch.map(research =>(
                   <ResearchGallery key={research.id} research={research} id={research.id} photo={research.image} deleteResearch={this.props.deleteResearch}/>
                ))}
              </Grid>
            </div>
            <button className="researchButtonRight" onClick={this.plusSlides}>&#10095;</button>
        </Grid>
        </div>
      </div>
    )
  }
}

export default ResearchImages
