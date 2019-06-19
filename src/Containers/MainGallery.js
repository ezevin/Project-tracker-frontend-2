import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'

import Gallery from '../Components/Gallery'

const NUM_PROJECTS = 6

class MainGallery extends Component {

state= {
  slideIndex: 0,
}

plusSlides = (n) => {
  let count = this.state.slideIndex+NUM_PROJECTS
  let total = (this.props.projects.length)

  if (count < total){
    this.setState({slideIndex: this.state.slideIndex + NUM_PROJECTS})
  }
}

minusSlides = (n) => {
  let count = this.state.slideIndex+NUM_PROJECTS

  if (count > 6){
    this.setState({slideIndex: this.state.slideIndex - NUM_PROJECTS})
  }
}

currentSlide(n) {
  console.log(n);
  // this.setState({slideIndex: n})
  // return this.showSlides(this.state.slideIndex = n);
}

// showSlides(slideIndex) {
//   // var i;
//   let slides = this.props.projects
//   let dots = document.getElementsByClassName("dot");
//   if (slideIndex > slides.length) {this.setState({slideIndex: 1})}
//   if (slideIndex < 1) {this.setState({slideIndex: slides.length})}
//   for (let i = 0; i < slides.length; i++) {
//     return  slides[i].style.display = "none";
//   }
//   for (let i = 0; i < dots.length; i++) {
//     return dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
// }

  render(){
    const { slideIndex } = this.state
    const displayedProjects = this.props.projects.slice(slideIndex, slideIndex + NUM_PROJECTS)

    return(
    <>
      <div className="shadowGallery">
        <Header className="textLead" inverted color='grey' textAlign="center" as='h2'>Photo Gallery</Header>
        <div>
          <Grid columns={5} padded className="cards">
            <Grid.Column width={1}>
              <button className="mainGalleryButton" onClick={this.minusSlides}>&#10094;</button>
            </Grid.Column>
            <Grid.Column width={14}><center>
              <Grid columns={6} padded className="link mainGallery cards">
                {displayedProjects.map(project =>{
                   return <Gallery key={project.id} photo={project.finished_image} title={project.title} details={project.details} finished_image={project.finished_image} projectId={project.id} research={this.props.research} toDoList={this.props.toDoList} allNotes={this.props.allNotes} materials={project.inventories}
                   date={new Date(project.updated_at)}/>
                })}
              </Grid></center>
            </Grid.Column>
          <Grid.Column width={1} textAlign="right">
            <button className="mainGalleryButton" onClick={this.plusSlides}>&#10095;</button>
          </Grid.Column>
        </Grid>
        </div>
        </div>
      </>
    )
  }
}

export default MainGallery
