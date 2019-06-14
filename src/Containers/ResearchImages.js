import React, { Component } from 'react'
import { Header, Grid, Popup, Icon, Form, Button } from 'semantic-ui-react'

import ResearchGallery from '../Components/ResearchGallery'

class ResearchImages extends Component {
  state = {
    isOpen: false,
    image: ""
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.setState({isOpen: false})
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({image: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { image } = this.state

    fetch(`http://localhost:3001/api/v1/researches`, {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ image: image, project_id: this.props.projectId})
        })
        .then(res=>res.json())
        .then(data => {this.setState(data)})
        .then(()=> this.props.fetchResearchImages())
        this.setState({isOpen: false})
  }
  render(){
    const form = <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Image Url:</label>
                    <input placeholder='Title' onChange={this.handleChange}/>
                  </Form.Field>
                  <Button type='submit'>Add Image</Button>
                </Form>

    return(
      <>
        <Header inverted color='grey' textAlign="center" as='h2'>
          <Popup trigger={<Icon size="small" name='add'/>}
                  content={form}
                  on='click'
                  position='top left'
                  open={this.state.isOpen}
                  onOpen={this.handleOpen}
                  onClose={this.handleClose}
                  />Research Images:
        </Header>
        <Grid columns={5} padded className="link cards ">
          {this.props.researches.map(research =>(
             <ResearchGallery key={research.id} research={research} id={research.id} photo={research.image} deleteResearch={this.props.deleteResearch}/>
          ))}
        </Grid>
      </>
    )
  }
}

export default ResearchImages
