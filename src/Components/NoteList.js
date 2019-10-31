import React, { Component } from 'react'
import { Icon, Grid, Container } from 'semantic-ui-react'

import "../CSS/Notes.css"

import NoteUpdate from '../Forms/NoteUpdate'

class NoteList extends Component {
  state = {
    isOpen: false
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  render (){

      return(

      <Container>
            <Grid divided inverted relaxed>
              <Grid.Column width={1}>
                <NoteUpdate note={this.props.note} fetchNotes={this.props.fetchNotes} id={this.props.id} projectId={this.props.projectId}/>
              </Grid.Column>
              <Grid.Column width={10}>
               <span>{this.props.note}</span>
              </Grid.Column>
              <Grid.Column width={3} floated="right">
               <Icon name="delete" className="inverseText" onClick={()=> this.props.deleteNote(this.props.id)}/>
             </Grid.Column>
            </Grid><br />
       </Container>



    )
  }
}

export default NoteList
