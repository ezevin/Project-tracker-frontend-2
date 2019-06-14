import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Header, Grid, Button, Divider } from 'semantic-ui-react'

import ProjectMaterials from './ProjectMaterials'
import StartDate from '../Forms/StartDate'
import Budget from '../Forms/Budget'
import DueDate from '../Forms/DueDate'
import ProjectDeets from '../Forms/ProjectDeets'
import Notes from './Notes'
import Finished from '../Forms/Finished'
import Title from '../Forms/Title'
import ResearchImages from './ResearchImages'
import ProcessPics from './ProcessPics'
import ToDo from './ToDo'


class Show extends Component {
  state = {
    search: '',
    projects: [],
    researches: [],
    toDoList: [],
    projectMaterials: [],
    notes: [],
    id: "",
    pm: []
  }

  componentDidMount(){
    const token = localStorage.getItem("token")
    if(!token){
      this.props.history.push('login')
    }else {
      fetch(`http://localhost:3001/api/v1/projects/${this.props.slug}`)
      .then(res => res.json())
      .then(data => this.setState({projects: data, researches: data.researches, toDoList: data.to_do_lists, projectMaterials: data.materials, notes: data.notes, id: data.id}))

      // fetch('http://localhost:3001/api/v1/project_materials')
      // .then(res => res.json())
      // .then(data => this.setState({pm: data},console.log("PM", data)))
    }
  }

  fetchProjects = () => {
    fetch(`http://localhost:3001/api/v1/projects/${this.props.id}`)
    .then(res => res.json())
    .then(data => this.setState({projects: data}))
  }

  fetchProjectMaterials = () => {
    fetch(`http://localhost:3001/api/v1/projects/${this.state.id}`)
    .then(res => res.json())
    .then(data => this.setState({projectMaterials: data.materials}))
  }

  fetchPM = () => {
    fetch('http://localhost:3001/api/v1/project_materials')
    .then(res => res.json())
    .then(data => this.setState({pm: data},console.log("PM", data)))
  }

  addProjectMaterial = (projectmaterial) => {
    this.setState({pm: [...this.state.pm, projectmaterial]})
  }

  deleteProjectMaterials = (id) => {
     const deleted = this.state.projectMaterials.find(material => material.id === id)
     this.props.pm.find(item => {
       if (item.project_id === this.state.id && item.material_id === deleted.id){
         fetch(`http://localhost:3001/api/v1/project_materials/${item.id}`, {
           method: "delete"
         })
         .then(() =>this.fetchProjectMaterials())
       }})
       // window.location.reload()

    const material = this.props.materials.filter(material => {
                        if (material.id === id){return material}
                      })
    const total = material.map(item => item.quantity)
    fetch(`http://localhost:3001/api/v1/materials/${id}`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
        },
      body: JSON.stringify({ quantity: (parseInt(total) + 1 ).toString()})
         })
           .then(res=>res.json())
           .then(data => {this.setState(data)})
  }

  handleSearch = (e, {value}) => {
    this.setState({search: value})
  }

  fetchToDoList = () => {
    fetch(`http://localhost:3001/api/v1/projects/${this.state.id}`)
    .then(res => res.json())
    .then(data => this.setState({toDoList: data.to_do_lists}))
  }

  deleteToDo = (item) => {
    const deleted = this.state.toDoList.find(list => list.id === item)
    fetch(`http://localhost:3001/api/v1/to_do_lists/${deleted.id}`, {
      method:"delete"
    })
    .then(() =>this.fetchToDoList())
  }

  fetchNotes = () => {
    fetch(`http://localhost:3001/api/v1/projects/${this.state.id}`)
    .then(res => res.json())
    .then(data => this.setState({notes: data.notes}))
  }

  deleteNote = (item) => {
    const deleted = this.state.notes.find(note => note.id === item)
    fetch(`http://localhost:3001/api/v1/notes/${deleted.id}`, {
      method:"delete"
    })
    .then(() =>this.fetchNotes())
  }

  fetchResearchImages = () => {
    fetch(`http://localhost:3001/api/v1/projects/${this.state.id}`)
    .then(res => res.json())
    .then(data => this.setState({researches: data.researches}))
  }

  deleteResearch = (item) => {
    const deleted = this.state.researches.find(research => research.id === item)
    fetch(`http://localhost:3001/api/v1/researches/${deleted.id}`, {
      method:"delete"
    })
    .then(() =>this.fetchResearchImages())
  }

  render(){

    const { id, title, details, start_date, due_date, finished, budget } = this.state.projects

    const prices = this.state.projectMaterials.map(material => material.price)

    const total = prices.reduce((a,b) => a+b, 0)

    const { projectId } = this.props

    const pmId = this.state.projectMaterials.map(pm => pm.id)

    const allFilteredMaterials = this.props.materials.filter(material => {
      if(!pmId.includes(material.id)){
        return material
      }
    })

    const filteredMaterials = this.state.projectMaterials.filter(material =>{
      return material.label.toLowerCase().includes(this.state.search.toLowerCase())
    })

        return (
          <div>
              <Header inverted color='grey' textAlign='center' as='h1'>{title}
                <Title id={this.state.id} title={title} fetchProjects={this.fetchProjects}/>
              </Header>
              <Header  inverted color='grey' textAlign='center' as="h3">Summary: {details}<ProjectDeets id={this.state.id} details={details} fetchProjects={this.fetchProjects}/></Header>

            <Grid padded>
              <Grid.Row>
                <Grid.Column width={6} floated='left'>Date Started: {start_date}
                  <StartDate id={id} start_date={start_date} fetchProjects={this.fetchProjects}/>
                </Grid.Column>

                <Grid.Column width={5}>
                  <Finished projectId={id} finished={finished} fetchProjects={this.fetchProjects}/>
                </Grid.Column>

                <Grid.Column width={3} floated='right'>Date Due: {due_date}
                  <DueDate id={id} due_date={due_date} fetchProjects={this.fetchProjects}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Column width={6} floated='left'>Budget: ${budget}
                <Budget id={id} budget={budget} fetchProjects={this.fetchProjects}/>
              </Grid.Column>

              <Grid.Column width={3} floated='right'>Remaining Budget: ${budget - (total )}</Grid.Column>
            </Grid>

            <Divider inverted/>
            <br />

              <Grid padded>
                <Grid.Column floated='left' width={5}>
                  <Notes notes={this.state.notes} fetchNotes={this.fetchNotes} deleteNote={this.deleteNote} projectId={this.state.id}/>
                </Grid.Column>

                <Grid.Column  width={6}>
                  <ToDo fetchToDoList={this.fetchToDoList} toDoList={this.state.toDoList} projectId={this.state.id} deleteToDo={this.deleteToDo}/>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <ProjectMaterials
                    id={this.state.id}
                    materials={filteredMaterials}
                    handleSearch={this.handleSearch}
                    allMaterials={allFilteredMaterials}
                    fetchProjectMaterials={this.fetchProjectMaterials}
                    addProjectMaterial={this.addProjectMaterial}
                    deleteMaterial={this.deleteProjectMaterials}
                    fetchPM={this.fetchPM}
                    pm={this.props.pm}
                    handleAddMaterial={this.props.handleAddMaterial}/>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column  width={7}>
                  <ResearchImages fetchResearchImages={this.fetchResearchImages} researches={this.state.researches} projectId={this.state.id} deleteResearch={this.deleteResearch}/>
                </Grid.Column>
                <Grid.Column floated="right" width={7}>
                  <ProcessPics fetchToDoList={this.fetchToDoList} toDoList={this.state.toDoList} projectId={projectId} />
                </Grid.Column>
              </Grid>
              <Button onClick={()=> this.props.deleteProject(id)}>Delete Project</Button>
            </div>
      )
  }
}

export default withRouter(Show)
