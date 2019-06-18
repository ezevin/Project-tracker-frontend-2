import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Header, Button, Popup, Form, Search, Grid, Container } from 'semantic-ui-react'

import ProjectList from '../Components/ProjectList'


class Projects extends Component {
  state = {
    title: "",
    user_id: "",
    isOpen: false,
    value: ""
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    this.setState({title: e.target.value})
  }

  handleRadio = (e, {value}) => {
    this.setState({value})
  }

  handleSubmit= (e) => {
    const { title } = this.state

    fetch('http://localhost:3001/api/v1/projects', {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            title, user_id:this.props.id
           })
        })
        .then(res=>res.json())
        .then(data => {
          return this.props.addProject(data),
          this.props.history.push(`/show/${data.id}`)})
        this.setState({isOpen: false})
  }

  render(){
    const { value } = this.state.value

    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Project Name:</label>
                    <input placeholder='Title' onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Start Project</Button>
                </Form>

    return(
      <div className="shadowProjects">
        <div className="projects">
          <Grid>
            <Grid.Row>
              <Grid.Column width={9}>
                <Header className="text" inverted color='grey' textAlign="center" as='h2'>Current Projects</Header>
              </Grid.Column>
              <Grid.Column width={5}>
                <center><Search className="text" width={15} onSearchChange={this.props.handleSearch} showNoResults={false} /></center>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
            <center><span className="text">Sort By Project Name:</span>
                  <input type="radio" value="Name" checked={value === 'Name'} onChange={this.props.titles}/></center><br />
              </Grid.Column>
              <Grid.Column width={6}>
                  <center><span className="text">Sort By Date:</span>
                        <input  type="radio" value="Name" checked={value === 'Name'} onChange={this.props.dateSort}/></center><br />
              </Grid.Column>
            </Grid.Row>
          </Grid>
            <center><Container align="center">
              <Grid>
                <Grid.Column width={6}>
                  <span className="text">Project Name:</span>
                </Grid.Column>
                <Grid.Column width={6}>
                  <span className="text">Due Date:</span>
                </Grid.Column>
              </Grid>
            </Container></center>
        {this.props.projects.map(project =>(
          <Link to={`/show/${project.id}`} key={project.id} onClick={()=>this.props.dropDown(project.id)}>
          <ProjectList key={project.id} project={project.title} dueDate={project.due_date} id={project.id} dropDown={this.props.dropDown} projects={this.props.projects}/>
          </Link>
          ))
        }
        </div>
        <br /><center><Popup trigger={<button className="button"> Start A New Project</button>}
                  content={form}
                  on='click'
                  position='bottom right'
                  open={this.state.isOpen}
                  onOpen={this.handleOpen}
                  onClose={this.handleClose}
                  /></center>
      </div>
    )
  }
}


export default withRouter(Projects)

// <Grid.Column width={8}>
//     <span className="color">Due Date:          </span>
//     <input type="radio" value="DueDate" checked={value === 'DueDate'} onChange={this.props.dates}/>
// </Grid.Column>
