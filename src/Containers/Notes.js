import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import { } from 'react-router-dom'
import { Header, Grid, Button, Form } from 'semantic-ui-react'

import NoteList from '../Components/NoteList'

class Notes extends Component {
  state = {
    note: ""
  }

  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({note: e.target.value})
  }
  //
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
      <>
        <Header inverted color='grey' textAlign="center" as='h2'>Notes:</Header>
        <Grid columns={5} padded className="link cards ">
          {this.props.notes.map(note =>(
             <NoteList key={note.id} handleUpdate={this.handleUpdate} note={note.note} notes={this.props.notes} id={note.id} item={note.item} deleteNote={this.props.deleteNote} fetchNotes={this.props.fetchNotes} projectId={this.props.projectId} />
          ))}
        </Grid><br />
        <center>
          <Form ref="form" inverted onSubmit={this.handleSubmit}>
            <center>
              <Grid>
                <Grid.Column width={8}>
                  <Form.TextArea  placeholder="Add A New Note" onChange={this.handleChange}/>
                </Grid.Column>
                <Grid.Column>
                  <Button type="submit">Add</Button>
                </Grid.Column>
              </Grid>
            </center>
          </Form>
        </center><br />
      </>
    )
  }
}

export default Notes
