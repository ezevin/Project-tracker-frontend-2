import React, { Component } from 'react'
import { Image, Modal, Card, Button } from 'semantic-ui-react'

class ResearchGallery extends Component {
  render(){

    const trigger = <Card color='teal' fluid>
                      <Image src={this.props.photo}  size='medium'/>
                    </Card>

      return(
        <>
          <Modal size="fullscreen" basic  trigger={trigger}>
          <center>
              <Card>
                <Image wrapped size='medium' src={this.props.photo} />
              </Card>
              <Button circular onClick={()=> this.props.deleteResearch(this.props.id)}>Delete</Button>
            </center>
          </Modal><br />
        </>
    )
  }
}

export default ResearchGallery
