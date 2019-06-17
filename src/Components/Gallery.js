import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Image, Modal, Header, Card } from 'semantic-ui-react'

import ResearchModal from './ResearchModal'
import ProcessModal from './ProcessModal'

class Gallery extends Component {

  state = {
    isOpen: false,
    research: [],
    toDoList: [],
    notes: []
  }

componentDidMount(){
  const token = localStorage.getItem("token")
  if(!token){
    this.props.history.push('login')
  }else {
    fetch('http://localhost:3001/api/v1/researches')
    .then(res => res.json())
    .then(data => this.setState({research: data}))

    fetch('http://localhost:3001/api/v1/to_do_lists')
    .then(res => res.json())
    .then(data => this.setState({toDoList: data}))

    fetch('http://localhost:3001/api/v1/notes')
    .then(res => res.json())
    .then(data => this.setState({notes: data}))

  }
}

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  render(){

    const material = this.props.materials.map(material => material.label)

    const trigger = <div className="card"><Card  className="gallerycard" color='teal' fluid>
                      <Image src={this.props.finished_image}  size='medium'/>
                    </Card></div>


    const notes = this.props.allNotes.filter(note => {
      return note.project_id === this.props.projectId
    })

      return(
        <div>
          <Modal trigger={trigger}>
            <Modal.Content image>
              <Image  wrapped size='medium' src={this.props.photo} />
              <Modal.Description>
                <Header>{this.props.title}</Header>
                <Header className="scroll" as="h4">Date Finished: {this.props.date.toString().slice(0, 15)}</Header>
                  <Header className="scroll" as="h4">Project Notes: {notes.map(note => note.note)}</Header>
                <Header as="h4">Materials: {material.toString().split(", ")}</Header>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <ResearchModal  projectId={this.props.projectId} research={this.props.research} />
              <ProcessModal  projectId={this.props.projectId} toDoList={this.props.toDoList} />
            </Modal.Actions>
          </Modal><br />
        </div>
    )
  }
}

export default withRouter(Gallery)