import React, { Component } from 'react'
import { Header, Grid } from 'semantic-ui-react'

import '../CSS/ProcessCSS.css'

import ProcessList from '../Components/ProcessList'

const NUM_PROJECTS = 5

class ProcessPics extends Component {

state = {
  process_pic: "",
  slideIndex: 0
}

plusSlides = (n) => {
  let count = this.state.slideIndex+NUM_PROJECTS
  let total = (this.props.toDoList.length)

  if (count < total){
    this.setState({slideIndex: this.state.slideIndex + NUM_PROJECTS})
  }
}

minusSlides = (n) => {
  let count = this.state.slideIndex+NUM_PROJECTS

  if (count > 5){
    this.setState({slideIndex: this.state.slideIndex - NUM_PROJECTS})
  }
}

handleReset = (id) => {

fetch(`https://fabfolio-backend.herokuapp.com/api/v1/to_do_lists/${id}`, {
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
      const { slideIndex } = this.state
      const displayedProcess = this.props.toDoList.slice(slideIndex, slideIndex + NUM_PROJECTS)

      const real = displayedProcess.filter(pic => {
        return pic.process_pic !== "https://image.shutterstock.com/image-vector/empty-background-style-png-blank-450w-676832590.jpg"
      })
      return(
        <div className="processContainer textAll">
          <Header inverted color='grey' textAlign="center" as='h2' className="textLead">
            Process Pictures
          </Header>
          <div className="processdetails">
            <Grid className="">
              <button className="processButtonLeft" onClick={this.minusSlides}>&#10094;</button>
              <div className="processgallery">
                <Grid columns={5} padded className="cards look">
                  {real.map(pic =>(
                      <ProcessList key={pic.id} reset={this.handleReset} photo={pic.process_pic} title={pic.item} details={pic.details} finished_image={pic.finished_image}id={pic.id}
                      research={this.props.research}/>
                  ))}
                </Grid>
              </div>
            <button className="processButtonRight" onClick={this.plusSlides}>&#10095;</button>
          </Grid>
        </div>
        </div>
      )
    }
}

export default ProcessPics
