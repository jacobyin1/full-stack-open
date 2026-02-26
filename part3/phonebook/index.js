require('dotenv').config()
const express = require('express')
const Phone = require('./models/phone')
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
	Phone.find({}).then(entries => {
		const s1 = `Phonebook has info for ${entries.length} people
			<p>${new Date()}</p>`
		response.send(s1)
	})
})

app.get('/api/persons', (request, response) => {
    Phone.find({}).then(entries => {
        response.json(entries)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    // const p = persons.find((person) => person.id === req.params.id)
    // if (p) {
    //     res.json(p)
    // } else {
    //     console.log(persons)
    //     res.status(404).end()
    // }
	Phone.findById(request.params.id)
		.then(phone => {
			if (phone) {
				response.json(phone)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	// const id = req.params.id 
	// persons = persons.filter(persons => persons.id !== id)
	// res.status(204).end()
	Phone.findByIdAndDelete(request.params.id)
		.then(deletedPerson => {
			response.json(deletedPerson)
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body

	if (!body.name) {
		return response.status(400).json({ error: 'no name' })
	}

	if (!body.number) {
		return response.status(400).json({ error: 'no number' })
	}

	const phone = new Phone({
		name: body.name,
		number: body.number
	})

	phone.save().then(savedPhone => {
		response.json(savedPhone)
	})
		.catch(error => next(error))
	// const id = Math.floor(Math.random() * 100)
	// const person = req.body
	// person.id = id 

	// if (persons.find(p => p.id === id)) {
	//   return res.status(400).json({
	//     error: 'id duplicate'
	//   })
	// }

	// if (persons.find(p => p.name === person.name)) {
	//   return res.status(400).json({
	//     error: 'name duplicate'
	//   })
	// }
	// persons = persons.concat(person)
	// res.json(person)
})

app.put('/api/persons/:id', (request, response, next) => {
	Phone.findById(request.params.id)
		.then(person => {
			if (!person) {
				return response.status(404).end()
			}

			person.number = request.body.number
			
			return person.save().then(updatedPerson => {
				response.json(updatedPerson)
			})
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server runs on ${PORT}`)
})