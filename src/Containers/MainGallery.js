import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'

import Gallery from '../Components/Gallery'

class MainGallery extends Component {


  render(){

    return(
      <div className="shadow gallery">
        <Header inverted color='grey' textAlign="center" as='h2'>Photo Gallery</Header>
          <Grid columns={5} padded className="cards">
          {this.props.projects.map(project =>(
             <Gallery key={project.id} photo={project.finished_image} title={project.title} details={project.details} finished_image={project.finished_image} projectId={project.id} research={this.props.research} toDoList={this.props.toDoList} allNotes={this.props.allNotes} materials={project.materials}
             date={new Date(project.updated_at)}/>
          ))}
        </Grid>
      </div>
    )
  }
}

export default MainGallery
