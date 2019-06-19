import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Image, Modal, Header, Card } from 'semantic-ui-react'

import ResearchModal from './ResearchModal'
import ProcessModal from './ProcessModal'
import GalleryMaterialInfo from './GalleryMaterialInfo'


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

    const trigger = <div className="card">
                      <Card fluid className="finishedimg" color='teal'>
                        <Image wrapped src={this.props.finished_image}  size='big'/>
                        <Header className="centered" as="h3">{this.props.title}</Header>
                      </Card><br /><br />
                    </div>


    const notes = this.props.allNotes.filter(note => {
      return note.project_id === this.props.projectId
    })

      return(
        <div>
          <Modal trigger={trigger}>
            <Modal.Content image className="">
              <img className="modalImg" alt={this.props.photo} src={this.props.photo}/>
              <Modal.Description>
                <Header className="underline" as="h2">{this.props.title}</Header>
                <Header className="scroll" as="h4">Date Finished: {this.props.date.toString().slice(0, 15)}</Header>
                <div className="finalNote">
                  <Header as="h4">
                  Notes From Project:
                  {notes.map(note => {
                      return <li>{note.note}</li>
                  })}
                  </Header>
                </div>
                <Header as="h4">Materials: {this.props.materials.map(material => (
                  <GalleryMaterialInfo
                    key={material.id}
                    label={material.label}
                    price={material.price}
                    description={material.description}
                    id={material.id}
                    image_url={material.image_url}
                    place_purchased={material.place_purchased}/>
                ))}</Header>
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
