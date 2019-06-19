import React, { Component } from 'react';
import { Menu, Dropdown, Header } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'



class Top extends Component {

  render(){
    return (
       <Menu>
        <Menu.Menu size="massive" textAlign="center">
          <Link to="/home" >
            <Menu.Item>
              <Header as="h1" className='underline header'> FabFolio: </Header>
            </Menu.Item>
          </Link>
          <Link to="/home" >
            <Menu.Item className="headSummary">
              <Header as="h3"> A Fabricator's Portfolio </Header>
            </Menu.Item>
          </Link>
        </Menu.Menu>`

        <Menu.Menu position='right'>
          {
            this.props.currentUser &&
            <Link to="/profile" className="underline">
              <Menu.Item
                float='right'
                name='logout'>
                {`Welcome ${this.props.currentUser.username}`}
              </Menu.Item>
            </Link>
          }
          {
            this.props.currentUser &&
           <Link to="/home" >
             <Menu.Item name='home' refresh="true">
                 Home
             </Menu.Item>
           </Link>
         }
         {
           this.props.currentUser &&
           <Link to={`/gallery`}>
             <Menu.Item name='gallery' >
               Gallery
             </Menu.Item>
           </Link>
         }

         {
           this.props.currentUser &&
               <Dropdown className="dropdown" item text='Current Projects'>
                 <Dropdown.Menu className="">
                   {this.props.projects.map(project => (
                     <Link key={project.id}  refresh="true" to={`/show/${project.id}`}>
                       <Dropdown.Item key={project.id} onClick={()=>this.props.dropDown(project.id)}>{project.title}</Dropdown.Item>
                     </Link>
                   ))}
                 </Dropdown.Menu>
               </Dropdown>
           }

          <Link to="/login">
            {
              this.props.currentUser ?
              <Menu.Item
                float='right'
                name='logout'
                onClick={this.props.handleLogout}>
                Logout
              </Menu.Item>
              :
              <Menu.Item
              float='right'
              name='login'>
              Login
              </Menu.Item>
            }
          </Link>

        </Menu.Menu>
        </Menu>
    )
  }
}

export default withRouter(Top)
