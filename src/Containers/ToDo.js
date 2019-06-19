import React, { Component } from 'react';
// import { Route } from 'react-router-dom'
import { } from 'react-router-dom'
import { Header, Grid, Form } from 'semantic-ui-react'

import ItemList from '../Components/ItemList'

class ToDo extends Component {
  state = {
    complete: false,
    item: ""
  }

  handleChange = (e) => {
    this.setState({item: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.target.reset();

    const { item } = this.state

    fetch(`http://localhost:3001/api/v1/to_do_lists`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ item: item, project_id: this.props.projectId})
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchToDoList())
  }

  handleDone = (id) => {
    fetch(`http://localhost:3001/api/v1/to_do_lists/${id}`, {
          method: "PATCH",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ complete: !this.state.complete})
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchToDoList())
        console.log("DONE", id);
  }

  render(){

    return(
      <div className="toDoListContainer">
        <Header inverted color='grey' className="textLead" textAlign="center" as='h2'>To Do List:</Header>
        <center>
          <Form inverted onSubmit={this.handleSubmit}>
            <center>
              <Grid className="">
                <Grid.Column  width={2}>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Form.Input  placeholder="Add A New ToDo" onChange={this.handleChange}/>
                </Grid.Column>
                <Grid.Column>
                  <button  className="button" type="submit">Add</button>
                </Grid.Column>
              </Grid>
            </center>
          </Form>
        </center><br />
        <Grid className=" toDoListHeader">
        <Grid.Column width={3}><span className="textLead"><h3>Done?</h3></span></Grid.Column>
        <Grid.Column width={4}><span className="textLead"><h3>Task:</h3></span></Grid.Column>
        <Grid.Column width={5} textAlign="right"><span className="textLead"><h3>Add Picture:</h3></span></Grid.Column>
        <Grid.Column width={3}><span className="textLead"><h3>Remove:</h3></span></Grid.Column>
        <Grid.Column width={3}></Grid.Column>
        </Grid>
        <Grid columns={5} padded className="link cards toDoListList">
          {this.props.toDoList.map(list =>(
             <><ItemList key={list.id} list={this.props.toDoList}
              fetchToDoList={this.props.fetchToDoList} toDoList={this.props.toDoList} id={list.id} complete={list.complete} item={list.item} deleteToDo={this.props.deleteToDo} handleDone={this.handleDone} pics={list.process_pic}/><br /></>
          ))}
        </Grid>
      </div>
    )
  }
}

export default ToDo
