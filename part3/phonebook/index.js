const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

morgan.token('post', (req, res) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(morgan(':post'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const s1 = `Phonebook has info for ${persons.length} people
    <p>${new Date()}</p>`
    response.send(s1)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const p = persons.find((person) => person.id === req.params.id)
    if (p) {
        res.json(p)
    } else {
        console.log(persons)
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id 
  persons = persons.filter(persons => persons.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * 100)
  const person = req.body
  person.id = id 

  if (persons.find(p => p.id === id)) {
    return res.status(400).json({
      error: 'id duplicate'
    })
  }

  if (persons.find(p => p.name === person.name)) {
    return res.status(400).json({
      error: 'name duplicate'
    })
  }
  persons = persons.concat(person)
  res.json(person)
})

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
  console.log(`Server runs on ${PORT}`)
})