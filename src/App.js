import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'

import './App.css';
import Main from './Containers/Main'
import Top from './Components/Top'
import Login from './Components/Login'
import Signup from './Components/Signup'
import FinishedPictures from './Containers/FinishedPictures'
import Show from './Containers/Show'
import Profile from './Components/Profile'

class App extends Component {
  state = {
    projects: [],
    materials: [],
    pID: null,
    currentUser: null,
    id: '',
    projectMaterials: [],
    pm: [],
    users: [],
    user: [],
    finished: [],
    allResearch: [],
    allToDo: [],
    allNotes: []
  }

  componentDidMount(){

    const token = localStorage.getItem('token')
    console.log("token is", token);
    if(token){
      fetch('http://localhost:3001/api/v1/current_user', {
        headers: {
          Authorization: token
        }
      })
      .then(res => res.json())
      .then((user) => {
        if (!user.error){
          this.setState({currentUser: user})
        }
        let id = this.state.currentUser.id
        fetch(`http://localhost:3001/api/v1/users/${id}`)
        .then(res => res.json())
        .then(data => this.setState({projects: data.projects, materials: data.materials, user: data}))
        this.setState({id: id})
      })
    }
    //
    // fetch('http://localhost:3001/api/v1/project_materials')
    // .then(res => res.json())
    // .then(data => this.setState({pm: data}))

    // fetch(`http://localhost:3001/api/v1/projects/${this.state.pID}`)
    // .then(res => res.json())
    // .then(data => this.setState({projectMaterials: data.materials, research: data.researches, toDoList: data.to_do_lists, projectMaterials: data.materials, notes: data.notes}, console.log("PROJECTS", data)))

    // fetch('http://localhost:3001/api/v1/user_materials')
    // .then(res => res.json())
    // .then(data => this.setState({um: data}, console.log("UM", data)))

    fetch('http://localhost:3001/api/v1/researches')
    .then(res => res.json())
    .then(data => this.setState({allResearch: data}))

    fetch('http://localhost:3001/api/v1/to_do_lists')
    .then(res => res.json())
    .then(data => this.setState({allToDo: data}))

    fetch('http://localhost:3001/api/v1/notes')
    .then(res => res.json())
    .then(data => this.setState({allNotes: data}))
  }

  /******************************************/
  /*               MENU BAR                */
  /******************************************/
  dropDown = (id) => {
    this.setState({pID: id})
    this.props.history.push(`/show/${id}`)
    this.fetchProjects()
    window.location.reload()
  }

  refresh = () => {
      this.fetchUserData()
      this.fetchProjects()
      this.fetchMaterials()
  }


  /******************************************/
  /*                                        */
  /******************************************/

  /******************************************/
  /*        LOGIN/LOGOUT/USERINFO          */
  /******************************************/
  handleUserLogin = (user) => {
    console.log("User response", user);
    localStorage.setItem("token", user.token)
    this.setState({currentUser:user})
      this.fetchUserData()
      this.fetchProjects()
      this.fetchMaterials()
  }

  handleLogout = () => {
    localStorage.removeItem("token")
    this.setState({
      projects: [],
      materials: [],
      pID: null,
      currentUser: null,
      id: '',
      projectMaterials: [],
      pm: [],
      users: [],
      user: [],
      finished: [],
      allResearch: [],
      allToDo: [],
      allNotes: []
    })
    this.props.history.push('login')
  }

  addUsers = user => {
    this.setState({ users: [...this.state.users, user] })
  }

  fetchUserData = () => {
    let id = this.state.currentUser.id
    fetch(`http://localhost:3001/api/v1/users/${id}`)
    .then(res => res.json())
    .then(data => this.setState({user: data}))
  }
  /******************************************/
  /*                                        */
  /******************************************/

  /******************************************/
  /*    ADD/UPDATE/DELETE/SORT PROJECTS     */
  /******************************************/
  addProject = (project) => {
    this.setState({projects: [...this.state.projects, project]})
  }

  fetchProjects = () => {
    let id = this.state.currentUser.id
    fetch(`http://localhost:3001/api/v1/users/${id}`)
    .then(res => res.json())
    .then(data => this.setState({projects: data.projects}))
    this.setState({id: id})
  }

  deleteProject = (dproject) => {
    const deleted = this.state.projects.find(project => project.id === dproject)
    fetch(`http://localhost:3001/api/v1/projects/${deleted.id}`, {
      method:"delete"
    })
    .then(this.props.history.push('home'))
    .then(() =>this.fetchProjects())
  }

  handleTitleSort = () => {
    this.setState({projects: this.state.projects.sort((a,b) =>{
      return a.title.localeCompare(b.title)})})
  }

  handleDateSort = () => {
    this.setState({projects: this.props.projects.sort((a, b) => {
          a = new Date(a.due_date);
          b = new Date(b.due_date);
          return a>b ? -1 : a<b ? 1 : 0})})
  }

  /******************************************/
  /*                                        */
  /******************************************/

  /******************************************/
  /*     ADD/UPDATE/DELETE MATERIALS         */
  /******************************************/
  addMaterial = (material) => {
    this.setState({materials: [...this.state.materials, material]})
    console.log("NEw", material);
  }

  fetchMaterials = () => {
    let id = this.state.currentUser.id
    fetch(`http://localhost:3001/api/v1/users/${id}`)
    .then(res => res.json())
    .then(data => this.setState({materials: data.materials}))
  }

  deleteMaterial = (dmaterial) => {
    const deleted = this.state.materials.find(material => material.id === dmaterial)
    console.log("item", deleted.id);
    fetch(`http://localhost:3001/api/v1/materials/${deleted.id}`, {
      method:"delete"
    })
    .then(() =>this.fetchMaterials())
  }

  /******************************************/
  /*                                        */
  /******************************************/

  render (){

    const unfinished = this.state.projects.filter(project => {
      return project.finished === false
    })

    const finished = this.state.projects.filter(project => {
      return project.finished
    })

    return (
      <>
        <Top id={this.state.id} projects={unfinished} dropDown={this.dropDown} currentUser={this.state.currentUser} handleLogout={this.handleLogout} refresh={this.refresh}/><br />
        <Switch>
          <Route path='/Home' render={(routerProps)=>{
            const slug = routerProps.match.params.slug
            return<Main slug={slug}
                    projects={unfinished}
                    finished={finished}
                    materials={this.state.materials}
                    addProject={this.addProject}
                    addMaterial={this.addMaterial}
                    deleteMaterial={this.deleteMaterial}
                    // research={this.state.allResearch}
                    titles={this.handleTitleSort}
                    dates={this.handleDateSort}
                    id={this.state.id}
                    fetchMaterials={this.fetchMaterials}
                    dropDown={this.dropDown}
                    research={this.state.allResearch}
                    toDoList={this.state.allToDo}
                    notes={this.state.allNotes}
                    // um={this.state.um}
                    />}}/>
          <Route path="/login" render={() => {
            return <Login handleUserLogin={this.handleUserLogin } handleLogout={this.handleLogout} addUsers={this.addUsers} users={this.state.users} currentUser={this.props.currentUser}/>}}/>
            <Route path="/signup" render={() => {
              return <Signup handleUserLogin={this.handleUserLogin } handleLogout={this.handleLogout} addUsers={this.addUsers} users={this.state.users} currentUser={this.props.currentUser}/>}}/>
          <Route path="/gallery" render={(routerProps) => {
            return <FinishedPictures projects={finished} research={this.state.allResearch} toDoList={this.state.allToDo}   allNotes={this.state.allNotes}
            fetchProjects={this.fetchProjects}
            dateSort={this.handleDateSort}
            />}} />
          <Route path="/show/:slug" render={(routerProps) => {
            const slug = routerProps.match.params.slug
              return <Show  slug={slug} projects={unfinished}
               finished={finished}
               materials={this.state.materials} projectId={this.state.pID} fetchProjects={this.fetchProjects} deleteProject={this.deleteProject}
               deleteProjectMaterials={this.deleteProjectMaterials}
               projectMaterials={this.state.projectMaterials}
               fetchProjectMaterials={this.fetchProjectMaterials}
               addProjectMaterial={this.addProjectMaterial}
               fetchMaterials={this.fetchMaterials}   refresh={this.refresh}     userId={this.state.id}
               />}}
               />
          <Route path="/profile" render={() => {
            return <Profile currentUser={this.state.currentUser} fetchUserData={this.fetchUserData} user={this.state.user} />}} />
          </Switch>
      </>
    );
  }
}

export default withRouter(App);
