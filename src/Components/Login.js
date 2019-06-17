import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'

// import Signup from './Signup'

const initialState = {
  error: false,
  fields: {
    username: '',
    password: ''
  }
}

class Login extends React.Component {
  constructor() {
    super();
    this.state = initialState
  }

  handleChange = e => {
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields });
  };

  handleSubmit = e => {
    e.preventDefault()
    // console.log(this.state.fields);
    fetch('http://localhost:3001/api/v1/auth',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(this.state.fields)
    })
    .then(res => res.json())
    .then(data => {
      if (data.error){
        this.setState({error: true})
      } else {
        this.props.handleUserLogin(data)
        this.props.history.push("/home")
        // console.log("data from api", data)
      }
    })
    // this.setState(initialState)
  };

  onClick = () => {
    this.setState({login: false})
  }

  render() {
    // console.log('Login props', this.props);
    const { fields } = this.state
     return (
      <div>
        <div className="ui form error">
          {
            this.state.error &&
            <div className="ui error message">
              Try Again
            </div>
          }
          <center>
            <Form inverted size='large' onSubmit={this.handleSubmit}>
                <Form.Input
                  width={5}
                  fluid icon='user'
                  iconPosition='left'
                  name="username"
                  value={fields.username}
                  placeholder='username'
                  label='Username:'
                  onChange={this.handleChange} />
                <Form.Input
                  width={5}
                  fluid icon='lock'
                  name="password"
                  type="password"
                  iconPosition='left'
                  label='Password:'
                  placeholder='password'
                  value={fields.password}
                  onChange={this.handleChange}/>
              <Button.Group>
                <Button>Login</Button>
              <Button.Or />
                <Link to='signup'>
                <Button color='blue'>Create An Account</Button></Link>
              </Button.Group>
            </Form>
          </center>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
