import Note from './components/Note'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note...")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('Some error happened...')
 
  useEffect(() => {
    noteService.getAll().then(respNotes => {
        console.log('promise fulfilled')
        setNotes(respNotes)
      })
  }, [])

  const handleNewNote = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = (e) => {
    e.preventDefault()
    console.log("clicked", e.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    
    noteService.create(noteObject).then(respNotes => {
        setNotes(notes.concat(respNotes))
        setNewNote('')
      })
  }

  const notesToShow = showAll
    ? notes 
    : notes.filter(note => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote).then(respNotes => {
      setNotes(notes.map(note => note.id === id ? respNotes : note))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      console.log(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}></Notification>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNewNote}/>
        <button type="submit">save</button>
      </form>
      <Footer></Footer>
    </div>
  )
}

export default App