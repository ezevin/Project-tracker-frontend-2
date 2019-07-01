import React, { Component } from 'react';

import { } from 'react-router-dom'
import { Header, Grid, Form } from 'semantic-ui-react'

import NoteList from '../Components/NoteList'

class Notes extends Component {
  state = {
    note: ""
  }

  handleChange = (e) => {

    this.setState({note: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.target.reset();

    const { note } = this.state

    fetch(`http://localhost:3001/api/v1/notes`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ note , project_id: this.props.projectId})
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchNotes())
  }


  render(){


    return(
      <div className="notesContainer textAll">
        <center>
          <Header inverted color='grey' as='h2' className="textLead" >Notes:</Header><br />
        </center>
        <Grid columns={5} padded className="link cards notesList">
          {this.props.notes.map(note =>(
             <NoteList key={note.id} handleUpdate={this.handleUpdate} note={note.note} notes={this.props.notes} id={note.id} item={note.item} deleteNote={this.props.deleteNote} fetchNotes={this.props.fetchNotes} projectId={this.props.projectId} />
          ))}
        </Grid><br />
        <center>
          <Form ref="form" inverted onSubmit={this.handleSubmit}>
          <center>
              <Grid>
                <Grid.Column width={12} textAlign="center">
                  <Form.TextArea  placeholder="Add A New Note" onChange={this.handleChange}/>
                </Grid.Column>
                <Grid.Column width={3} textAlign="center">
                  <button className="button" type="submit">Add</button>
                </Grid.Column>
              </Grid>
              </center>
          </Form>
        </center><br />
      </div>
    )
  }
}

export default Notes
