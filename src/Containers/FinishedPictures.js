import React, { Component } from 'react'
import { Header, Grid, Search } from 'semantic-ui-react'

import '../CSS/FinishedGalleryCSS.css'

import Gallery from '../Components/Gallery'

const NUM_PROJECTS = 12

class FinishedPictures extends Component {

  state = {
    search: '',
    value: "",
    slideIndex: 0
  }

  handleSearch = (e, {value}) => {
    this.setState({search: value})
  }

  plusSlides = (n) => {
    let count = this.state.slideIndex+NUM_PROJECTS
    let total = (this.props.projects.length)
    console.log(total);
    if (count < total){
      this.setState({slideIndex: this.state.slideIndex + NUM_PROJECTS})
    }
  }

  minusSlides = (n) => {
    let count = this.state.slideIndex+NUM_PROJECTS
    console.log(count);
    if (count > 21){
      this.setState({slideIndex: this.state.slideIndex - NUM_PROJECTS})
    }
  }

  render(){
    const { slideIndex } = this.state
    const displayedProjects = this.props.projects.slice(slideIndex, slideIndex + NUM_PROJECTS)

    const filtered = displayedProjects.filter(project => {
      return project.title.toLowerCase().includes(this.state.search.toLowerCase())
    })

    console.log(this.props.projects);
    return(
      <>
        <Grid >
        <Grid.Column width={6}>
        </Grid.Column>
        <Grid.Column className="textAll" width={4}>
          <Header inverted color='grey' textAlign="center" as='h1' className="textLead">Photo Gallery</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <center>
            <Search width={15} onSearchChange={this.handleSearch} showNoResults={false} />
          </center>
        </Grid.Column>
        </Grid>
        <br />
        <br />
        <br />
        <Grid >
          <Grid.Column className="finishedgallery">
            <Grid columns={5} padded className="link cards">
            <Grid.Column width={1}>
              <button className="finishedButton"
              onClick={this.minusSlides}>&#10094;</button>
            </Grid.Column>
            <Grid.Column width={14}><center>
              <Grid columns={5} padded className="link cards">
                {filtered.map(project =>(
                   <Gallery key={project.id} photo={project.finished_image} budget={project.budget} title={project.title} details={project.details} finished_image={project.finished_image} projectId={project.id} research={this.props.research} toDoList={this.props.toDoList} materials={project.inventories}  allNotes={this.props.allNotes} fetchProjects={this.props.fetchProjects} start={new Date(project.start_date)} due={new Date(project.due_date)} date={new Date(project.updated_at)}/>
                ))}
              </Grid></center>
            </Grid.Column>
            <Grid.Column width={1}>
            <button className="finishedButton" onClick={this.plusSlides}>&#10095;</button>
              </Grid.Column>
            </Grid>
            </Grid.Column>
          </Grid>





      </>
    )
  }
}

export default FinishedPictures
