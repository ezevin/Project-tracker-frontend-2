import React, { Component } from 'react'
import { Icon, Grid, Container } from 'semantic-ui-react'

import NoteUpdate from '../Forms/NoteUpdate'

class NoteList extends Component {

  render (){

      return(

      <Container>
            <Grid divided inverted relaxed>
              <Grid.Column width={3}>
                <NoteUpdate note={this.props.note} fetchNotes={this.props.fetchNotes} id={this.props.id} projectId={this.props.projectId}/>
              </Grid.Column>
              <Grid.Column width={10}>
               {this.props.note}
              </Grid.Column>
              <Grid.Column width={3} floated="right">

               <Icon name="delete"  onClick={()=> this.props.deleteNote(this.props.id)}/>
             </Grid.Column>
            </Grid>

       </Container>



    )
  }
}

export default NoteList
