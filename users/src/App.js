import React from 'react';
import User from './User'
import NewUser from './NewUser'
import axios from 'axios'
import './App.scss';

class App extends React.Component {
  state = {
    users: [],
    error: '',
    newUser: false
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        this.setState({
          ...this.state,
          users: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  addUser = user => {
    axios
      .post('http://localhost:5000/api/users', user)
      .then(res => {
        console.log(res)
        this.setState({
          ...this.state,
          users: [...this.state.users, res.data]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  editUser = (user, id) => {
    axios
      .put(`http://localhost:5000/api/users/${id}`, user)
      .then(res => {
        this.setState({
          ...this.state,
          users: res.data
        })
      })
      .catch(err => console.log(err))
  }

  delUser = id => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  newUser = () => {
    this.setState({ newUser: !this.state.newUser })
  }

  render() {
    console.log(this.state.users)
    return (
      <div className="App">
        <header className="App-header">
          <h1>Users</h1>
        </header>

        <section>
          {!this.state.newUser ?
            this.state.users.map((user, id) => (
              <User user={user} editUser={this.editUser} delUser={this.delUser} key={id} />
            )) :
            <NewUser newUser={this.newUser} addUser={this.addUser} />
          }
          <button
            onClick={() => this.newUser()}
            style={{
              display: this.state.newUser ?
                'none' : 'block'
            }}
          >New User</button>
        </section>

        <footer>
          I only put this here because I wanted some space at the bottom.
        </footer>
      </div>
    );
  }
}

export default App;
