import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Grid, Container } from 'semantic-ui-react'

import Projects from './Projects'
import MainGallery from './MainGallery'
import Materials from './Materials'

class Main extends Component {
  state = {
    search: '',
    psearch: ''
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if(!token){
      this.props.history.push('login')
    }
  }

  handleSearch = (e, {value}) => {
    this.setState({search: value})
    console.log(value)
  }

  handlePSearch = (e, {value}) => {
    this.setState({psearch: value})
    console.log(value)
  }

  handleTitleSort = () => {
    this.setState({projects: this.props.projects.sort((a,b) =>{
      return a.title.localeCompare(b.title)})})
  }

  handleDateSort = () => {
    this.setState({projects: this.props.projects.sort((a, b) => {
          a = new Date(a.due_date);
          b = new Date(b.due_date);
          return a>b ? -1 : a<b ? 1 : 0})})
  }

  render(){

    const filteredMaterials = this.props.materials.filter(material =>{
      return material.label.toLowerCase().includes(this.state.search.toLowerCase())
    })

    const filteredProjects = this.props.projects.filter(project =>{
      return project.title.toLowerCase().includes(this.state.psearch.toLowerCase())
    })

    return (
      <>
        <br />
        <Grid className="">
          <Grid.Column floated='left' width={8}>
            <Projects
              slug={this.props.slug}
              projects={filteredProjects}
              addProject={this.props.addProject}
              handleSearch={this.handlePSearch}
              titles={this.handleTitleSort}
              dateSort={this.handleDateSort}
              dates={this.props.dates}
              id={this.props.id}
              dropDown={this.props.dropDown}
              toDoList={this.props.toDoList}
              handleProgressSort = {this.handleProgressSort}
            />
          </Grid.Column>
          <Grid.Column floated="right" width={8}>
            <Materials materials={filteredMaterials}
             addMaterial={this.props.addMaterial}
             id={this.props.id}
             handleSearch={this.handleSearch}
             deleteMaterial={this.props.deleteMaterial}
             fetchMaterials={this.props.fetchMaterials}
             um={this.props.um}
            />
          </Grid.Column>
        </Grid>
        <Container>
          <MainGallery projects={this.props.finished} research={this.props.research} toDoList={this.props.toDoList} allNotes={this.props.notes}/>
        </Container>
      </>
    )
  }
}

export default withRouter(Main)
