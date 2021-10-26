// modules
const { response, json } = require('express')
const express = require('express')
const morgan = require('morgan')

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const app = express()
app.use(express.json()) // json parser

morgan.token('json', (req, res) => {
  return req.method === 'POST'
    ? JSON.stringify(req.body)
    : ' '
})
// app.use(morgan('tiny')) // 3.7
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json')) // 3.8

// 3.1
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// 3.2
app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
  `)
})

// 3.3
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if(person) {
    response.json(person)
  } else {
    response.status(400).end()
  }
})

// 3.4
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

// 3.5 - 3.6
app.post('/api/persons', (request, response) => {
  let newName = '', newNumber = ''
  // 1 name&num exist
  if(request.body.name && request.body.number) {
    newName = request.body.name
    newNumber = request.body.number
  } else {
    return response.status(400).end() // bad request
  }
  // 2. name already in persons
  if(persons.map(p => p.name).includes(newName)) { 
    return response.json({error: 'name must be unique'})
  }
  const newPerson = {
    id: Math.floor(Math.random() * 65535),
    name: newName,
    number: newNumber
  }
  persons = persons.concat(newPerson) // bug: conflict possible
  response.json(newPerson)
})

const PORT = 3001
app.listen(PORT)
