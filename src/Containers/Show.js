import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Header, Grid, Button, Divider } from 'semantic-ui-react'

import '../CSS/ShowCSS.css'

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
    pm: [],
    inventory: []
  }

  componentDidMount(){
    const token = localStorage.getItem("token")
    if(!token){
      this.props.history.push('login')
    }else {
      fetch(`http://localhost:3000/api/v1/projects/${this.props.slug}`)
      .then(res => res.json())
      .then(data => this.setState({projects: data, researches: data.researches, toDoList: data.to_do_lists, inventory: data.inventories, notes: data.notes, id: data.id}))

    }
  }

  fetchProjects = () => {
    fetch(`http://localhost:3000/api/v1/projects/${this.state.id}`)
    .then(res => res.json())
    .then(data => this.setState({projects: data}))
  }

  fetchInventory = () => {
    fetch(`http://localhost:3000/api/v1/projects/${this.state.id}`)
    .then(res => res.json())
    .then(data => this.setState({inventory: data.inventories}))
  }

  // fetchPM = () => {
  //   fetch('http://localhost:3000/api/v1/project_materials')
  //   .then(res => res.json())
  //   .then(data => this.setState({pm: data},console.log("PM", data)))
  // }

  addToInventory = (item) => {
    this.setState({inventory: [...this.state.inventory, item]})
  }

  deleteInventory = (item) => {
    fetch(`http://localhost:3000/api/v1/inventories/${item.id}`, {
      method: "delete"
      })
    .then(() =>this.fetchInventory())

    console.log(this.state.inventory);
    const material = this.props.materials.filter(material => {
                        return material.label === item.label
                      })

    const id = material.map(material => material.id)
    const total = material.map(material => material.quantity)

    fetch(`http://localhost:3000/api/v1/materials/${id}`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
        },
      body: JSON.stringify({ quantity: (parseInt(total) + 1 ).toString()})
         })
           .then(res=>res.json())
           .then(data => {this.setState(data)})
           .then(() => this.props.fetchMaterials())
  }

  handleSearch = (e, {value}) => {
    this.setState({search: value})
  }

  fetchToDoList = () => {
    fetch(`http://localhost:3000/api/v1/projects/${this.state.id}`)
    .then(res => res.json())
    .then(data => this.setState({toDoList: data.to_do_lists}))
  }

  deleteToDo = (item) => {
    const deleted = this.state.toDoList.find(list => list.id === item)
    fetch(`http://localhost:3000/api/v1/to_do_lists/${deleted.id}`, {
      method:"delete"
    })
    .then(() =>this.fetchToDoList())
  }

  fetchNotes = () => {
    fetch(`http://localhost:3000/api/v1/projects/${this.state.id}`)
    .then(res => res.json())
    .then(data => this.setState({notes: data.notes}))
  }

  deleteNote = (item) => {
    const deleted = this.state.notes.find(note => note.id === item)
    fetch(`http://localhost:3000/api/v1/notes/${deleted.id}`, {
      method:"delete"
    })
    .then(() =>this.fetchNotes())
  }

  fetchResearchImages = () => {
    fetch(`http://localhost:3000/api/v1/projects/${this.state.id}`)
    .then(res => res.json())
    .then(data => this.setState({researches: data.researches}))
  }

  deleteResearch = (item) => {
    const deleted = this.state.researches.find(research => research.id === item)
    fetch(`http://localhost:3000/api/v1/researches/${deleted.id}`, {
      method:"delete"
    })
    .then(() =>this.fetchResearchImages())
  }

  render(){

    const { title, details, start_date, due_date, finished, budget } = this.state.projects

    const prices = this.state.inventory.map(material => material.price)

    const total = prices.reduce((a,b) => a+b, 0)

    const { projectId } = this.props

    const item = this.state.inventory.map(item => item.label)

    const allFilteredMaterials = this.props.materials.filter(material => {
      return !item.includes(material.label)
    })

    const filteredMaterials = this.state.inventory.filter(material =>{
      return material.label.toLowerCase().includes(this.state.search.toLowerCase())
    })

        return (
        <>
          <div className="">
            <Grid padded className="">
                  <Grid.Column width={4} textAlign="center">
                    <div className="textAll startDate">
                      <StartDate id={this.state.id} start_date={start_date} fetchProjects={this.fetchProjects}/>
                    </div><br /> <br /><br /><br /><br />
                    <div className="budget textAll">
                      <Budget id={this.state.id} fetchProjects={this.fetchProjects} budget={budget}/>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={7} className="projectName">
                      <br / >
                      <Title id={this.state.id} title={title} fetchProjects={this.fetchProjects}/>
                      <br />
                    <center>
                      <ProjectDeets id={this.state.id} details={details} fetchProjects={this.fetchProjects}/>
                    </center>
                  </Grid.Column>
                  <Grid.Column width={3} textAlign="center">
                    <div className="dueDate textAll">
                    <DueDate id={this.state.id} due_date={due_date} fetchProjects={this.fetchProjects}/>
                    </div><br /><br /><br /><br /><br />
                    <div className="remainingBudget textAll">
                      <h4>Remaining Budget: ${budget - (total )}</h4>
                    </div>
                  </Grid.Column>
              </Grid>
            <Divider className="" inverted/>
              <Grid padded className="">
                <Grid.Column floated='left' className="" width={5}>
                  <div className="noteBox">
                    <Notes notes={this.state.notes} fetchNotes={this.fetchNotes} deleteNote={this.deleteNote} projectId={this.state.id}/>
                  </div>
                </Grid.Column>
                <Grid.Column className="" width={6}>
                  <div className="todoBox">
                    <ToDo fetchToDoList={this.fetchToDoList} toDoList={this.state.toDoList} projectId={this.state.id} deleteToDo={this.deleteToDo}/>
                  </div>
                </Grid.Column>
                <Grid.Column className="" floated="right" width={5}>
                  <div className="materialsBox">
                    <ProjectMaterials
                      id={this.state.id}
                      materials={filteredMaterials}
                      handleSearch={this.handleSearch}
                      allMaterials={allFilteredMaterials}
                      fetchInventory={this.fetchInventory}
                      addToInventory={this.addToInventory}
                      deleteInventory={this.deleteInventory}
                      fetchMaterials={this.props.fetchMaterials}
                      pm={this.props.pm}/>
                    </div>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className="" width={6}>
                  <div className="researchBox">
                    <ResearchImages fetchResearchImages={this.fetchResearchImages} researches={this.state.researches} projectId={this.state.id} deleteResearch={this.deleteResearch}/>
                  </div>
                </Grid.Column>
                <Grid.Column className="" floated="right" width={6}>
                  <div className="processBox">
                    <ProcessPics fetchToDoList={this.fetchToDoList} toDoList={this.state.toDoList} projectId={projectId} />
                  </div>
                </Grid.Column>
              </Grid><br />
            </div>
            <div className="showButtons">
              <Button className="deleteButton" inverted color='red' onClick={()=> this.props.deleteProject(this.state.id)}>Delete Project</Button>
              <Finished projectId={this.state.id} finished={finished} fetchProjects={this.props.fetchProjects} fetchToDoList={this.fetchToDoList} fetchNotes={this.fetchNotes} refresh={this.props.refresh}/>

            </div>
          </>
      )
  }
}

export default withRouter(Show)
