import { useState, useEffect } from 'react'
import contactService from './services/persons'
import Notification from './Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)



  useEffect(() => {
    console.log('effect')
    contactService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    // Jos nimi alle 3 merkkiä
    if (newName.length < 3) {
      setNotification({ message: 'Person validation failed: name: ' + newName + ' is shorter than the minimum allowed length (3).', type: 'error' })
      setTimeout(() => setNotification(null), 5000)
      return
    }

    const nimiObject = {
      name: newName,
      number: newNumber,
    }

    // Jos nimi jo olemassa
    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    contactService
      .create(nimiObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')

        setNotification({ message: `Added ${response.data.name}`, type: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  const deletePerson = (id) => {
    if (window.confirm('Delete this person?')) {
      contactService
        .exterminate(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          console.log(error.response.data)
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleVertailu = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filter={filter} handleVertailu={handleVertailu} />
      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

const Filter = ({ filter, handleVertailu }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleVertailu} />
    </div>
  )
}

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
      {persons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  )
}


export default App