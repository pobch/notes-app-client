import React, { Component } from 'react'
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { API } from 'aws-amplify'
import './Home.css'

export default class Home extends Component {
  state = {
    notes: [],
    isLoading: true
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return
    }

    try {
      const notes = await this.notes()
      this.setState({ notes })
    } catch(error) {
      alert(error) // In case of 'Network Error', the `error` will be an object!!
    }

    this.setState({ isLoading: false })
  }

  notes = () => {
    return API.get('notes', '/notes')
  }

  renderNotesList = (notes) => {
    return [{}].concat(notes).map( (note, i) => 
      i === 0
        ? <LinkContainer
            key="new"
            to="/notes/new"
          >
            <ListGroupItem>
              <h4>
                <b>{'\uFF0B'}</b> Create New Note
              </h4>
            </ListGroupItem>
          </LinkContainer>
        : <LinkContainer
            key={note.noteId}
            to={`/notes/${note.noteId}`}
          >
            <ListGroupItem header={note.content.trim().split('\n')[0]}>
              Create: {new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
    )
  }

  renderNotes = () => {
    return (
      <div className="notes">
        <PageHeader>Your Notes</PageHeader>
        <ListGroup>{!this.state.isLoading && this.renderNotesList(this.state.notes)}</ListGroup>
      </div>
    )
  }

  renderLander = () => {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app :)</p>
      </div>
    )
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}
      </div>
    )
  }
}
