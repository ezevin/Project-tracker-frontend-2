import React, { Component } from 'react'
import { Image, Modal, Card, Button } from 'semantic-ui-react'

class ResearchGallery extends Component {
  render(){

    const trigger = <Card color='teal' className="look showimg" fluid>
                      <Image src={this.props.photo}  size='medium'/>
                    </Card>

      return(
        <>
          <Modal size="fullscreen" basic  trigger={trigger}>
          <center>
              <Card className="look showmodal">
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
