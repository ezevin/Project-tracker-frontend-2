import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'

import ProcessList from '../Components/ProcessList'

class ProcessPics extends Component {

state = {
  process_pic: ""
}

handleReset = (id) => {

// const { process_pic } = this.state

fetch(`http://localhost:3001/api/v1/to_do_lists/${id}`, {
      method: "PATCH",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ process_pic: "https://image.shutterstock.com/image-vector/empty-background-style-png-blank-450w-676832590.jpg" })
    })
    .then(res=>res.json())
    .then(data => {this.setState(data)})
    .then(()=> this.props.fetchToDoList())

}
    render(){
      const real = this.props.toDoList.filter(pic => {
        return pic.process_pic !== "https://image.shutterstock.com/image-vector/empty-background-style-png-blank-450w-676832590.jpg"
      })
      return(
        <>
          <Header inverted color='grey' textAlign="center" as='h2'>Process Pictures</Header>
          <Grid columns={5} padded className="cards ">
            {real.map(pic =>(
               <ProcessList key={pic.id} reset={this.handleReset} photo={pic.process_pic} title={pic.item} details={pic.details} finished_image={pic.finished_image} id={pic.id} research={this.props.research}/>
            ))}
          </Grid>
        </>
      )
    }
}

export default ProcessPics
