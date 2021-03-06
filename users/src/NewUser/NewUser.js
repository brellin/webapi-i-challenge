import React, { Component } from 'react'

export default class NewUser extends Component {
    state = {
        name: '',
        bio: ''
    }

    handleChanges = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {
        console.log(this.state)
        return (
            <>
                <input
                    name='name'
                    onChange={this.handleChanges}
                    value={this.state.name}
                />
                <input
                    name='bio'
                    onChange={this.handleChanges}
                    value={this.state.bio}
                />
                <button
                    onClick={() => {
                        this.props.addUser(this.state)
                        this.setState({
                            name: '',
                            bio: ''
                        })
                        this.props.newUser()
                    }}
                >Submit</button>
            </>
        )
    }
}
