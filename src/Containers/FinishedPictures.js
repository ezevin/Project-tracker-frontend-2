import React, { Component } from 'react'
import { Header, Grid, Search } from 'semantic-ui-react'

import Gallery from '../Components/Gallery'

class FinishedPictures extends Component {

  state = {
    search: '',
    value: ""
  }

  handleSearch = (e, {value}) => {
    this.setState({search: value})
  }
  //
  // handleDateSort = () => {
  //   this.setState({projects: this.props.projects.sort((a, b) => {
  //         a = new Date(a.due_date);
  //         b = new Date(b.due_date);
  //         return a>b ? -1 : a<b ? 1 : 0})})
  // }

  render(){
    // const { value } = this.state.value

    const filtered = this.props.projects.filter(project => {
      return project.title.toLowerCase().includes(this.state.search.toLowerCase())
    })

    return(
      <>
        <Grid >
        <Grid.Column width={6}>
        </Grid.Column>
        <Grid.Column width={4}>
          <Header inverted color='grey' textAlign="center" as='h2'>Photo Gallery</Header>
        </Grid.Column>
        <Grid.Column textAlign="right">
          <center>
            <Search width={15} onSearchChange={this.handleSearch} showNoResults={false} />
          </center><br />
        </Grid.Column>
        </Grid>
        <Grid columns={5} padded className="link cards">
          {filtered.map(project =>(
             <Gallery key={project.id} photo={project.finished_image} title={project.title} details={project.details} finished_image={project.finished_image} projectId={project.id} research={this.props.research} toDoList={this.props.toDoList} materials={project.inventories}  allNotes={this.props.allNotes}
             date={new Date(project.updated_at)}
             fetchProjects={this.props.fetchProjects}/>
          ))}
        </Grid>





      </>
    )
  }
}

export default FinishedPictures
