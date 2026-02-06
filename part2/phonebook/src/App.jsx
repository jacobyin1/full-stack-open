import { useState, useEffect } from 'react'
import axios from 'axios'
import useServices from "./services/persons"

const Filter = (props) => {
  return (
    <input value={props.filter} onChange={props.onChange} />
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.name} onChange={props.changeName}/>
        <br />
        number: <input value={props.number} onChange={props.changeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, setPersons }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number} &nbsp;
          <button onClick={() => {
            if (window.confirm(`Delete ${person.name}?`)) {
              useServices
                .delete_p(person.id)
                .then(deleteP => {
                  setPersons(persons.filter(p => p.id !== deleteP.id))
                })
            }
          }}>delete</button>
        </div>
      ))}
    </div>
  )
}

const Message = ({ message, success=true }) => {
  if (message === null) {
    return null
  }

  if (success) {
    return (
      <div className="msg">{message}</div>
    )
  }

  return (
    <div className="fail-msg">{message}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageGreen, setMessageGreen] = useState(true)

  useEffect(() => {
    console.log("Running effect")
    axios
      useServices.getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const updateMessage = (string, isGreen) => {
    setMessage(string)
    setMessageGreen(isGreen)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const changeNum = (person, newNumber) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const newPerson = { ...person, number: newNumber }
        useServices
          .update(newPerson.id, newPerson)
          .then(response => {
            setPersons(persons.map(p => p.id === person.id ? response : p))
            updateMessage(`Updated ${newPerson.name}`)
          })
          .catch(error => {
            updateMessage(
              `Information of ${person.name} has already been removed from server`, 
              false
            )
          })
      }
  }
  const addName = (e) => {
    e.preventDefault()
    if (persons.some(e => e.name === newName)) {
      changeNum(persons.find(p => p.name === newName), newNumber)
    } else {
      const newNameObj = { name: newName, number: newNumber }
      useServices.create(newNameObj)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNumber('')
          updateMessage(`Added ${person.name}`)
        })
    }
  }

  const handleNewName = (e) => setNewName(e.target.value)
  const handleNewNumber = (e) => setNumber(e.target.value)

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} success={messageGreen}></Message>
      <Filter filter={filter} onChange={e => setFilter(e.target.value)} />

      <h3>add a new</h3>
      <PersonForm 
        onSubmit={addName}
        name={newName}
        number={newNumber}
        changeName={handleNewName}
        changeNumber={handleNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} setPersons={setPersons}/>
    </div>
  )
}

export default App