import React, { Component } from 'react';
import { } from 'react-router-dom'
import { Header, Grid, Form } from 'semantic-ui-react'

import "../CSS/ToDoList.css"

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

    fetch(`http://localhost:3000/api/v1/to_do_lists`, {
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
    fetch(`http://localhost:3000/api/v1/to_do_lists/${id}`, {
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
  }

  render(){

    return(
      <div className="toDoListContainer">
        <Header inverted color='grey' className="textLead" textAlign="center" as='h2'>To Do List:</Header>
        <center>
          <Form inverted onSubmit={this.handleSubmit}>
              <Grid className="">
                <Grid.Column  width={2}>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Form.Input placeholder="Add A New ToDo" onChange={this.handleChange}/>
                </Grid.Column>
                <Grid.Column>
                  <button  className="button" type="submit">Add</button>
                </Grid.Column>
              </Grid>
          </Form>
        </center>
        <Grid className="">
          <Grid.Column width={3}><span className="textLead toDoListHeader">Done?</span></Grid.Column>
          <Grid.Column width={2}><span className="textLead toDoListHeader">Task:</span></Grid.Column>
          <Grid.Column width={7} textAlign="right"><span className="textLead toDoListHeader">Add Picture:</span></Grid.Column>
          <Grid.Column width={3}><span className="textLead toDoListHeader">Remove:</span></Grid.Column>
          </Grid>
          <div  className="toDoListList">
          {this.props.toDoList.map(list =>(
               <ItemList key={list.id} list={this.props.toDoList}
                fetchToDoList={this.props.fetchToDoList} toDoList={this.props.toDoList} id={list.id} complete={list.complete} item={list.item} deleteToDo={this.props.deleteToDo} handleDone={this.handleDone} pics={list.process_pic}/>
          ))}
          </div>
      </div>
    )
  }
}

export default ToDo
