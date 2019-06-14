import React, { Component } from 'react'
import { Icon, Grid, Container } from 'semantic-ui-react'

import AddProcess from '../Forms/AddProcess'

class ItemList extends Component {
  state = {
    done: false
  }


  render (){

      return(
        <>
        <Container>
        <Grid  className={this.props.complete ? "done" : "undone"} >
          <Grid.Column width={2}>
            <Icon name="check" onClick={()=> this.props.handleDone(this.props.id)}/>
          </Grid.Column>
          <Grid.Column width={8}>
            {this.props.item}
          </Grid.Column>
          <Grid.Column width={3}>
            <AddProcess toDoList={this.props.toDoList} process_pics={this.props.pics} id={this.props.id} fetchToDoList={this.props.fetchToDoList}/>
          </Grid.Column>
          <Grid.Column width={3}>
            <Icon name="delete"  onClick={()=> this.props.deleteToDo(this.props.id)}/>
          </Grid.Column>
        </Grid>
       </Container><br />
       </>
    )
  }
}

export default ItemList
