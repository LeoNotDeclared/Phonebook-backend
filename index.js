require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

// let persons = [
//   {
//     "id": 1,
//     "name": "Arto Hellas",
//     "number": "040-123456"
//   },
//   {
//     "id": 2,
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523"
//   },
//   {
//     "id": 3,
//     "name": "Dan Abramov",
//     "number": "12-43-234345"
//   },
//   {
//     "id": 4,
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122"
//   }
// ]

const app = express()
app.use(express.json()) // json parser

morgan.token('json', (req, res) => {
  return req.method === 'POST'
    ? JSON.stringify(req.body)
    : ' '
})
// app.use(morgan('tiny')) // 3.7
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json')) // 3.8

app.use(cors()) // 3.9
app.use(express.static('build')) // 3.9

// 3.1
app.get('/api/persons', (request, response) => {
  // response.json(persons)
  Person.find({}).then(people => {
    response.json(people)
    mongoose.connection.close()
  })
})

// 3.2
app.get('/info', (request, response) => {
  // response.send(`
  //   <p>Phonebook has info for ${persons.length} people</p>
  //   <p>${Date()}</p>
  // `)
  Person.find({}).then(people => {
    response.send(`<p>Phonebook has info for ${people.length} people</p> <p>${Date()}</p>`)
    mongoose.connection.close()
  })
})

// 3.3
app.get('/api/persons/:id', (request, response) => {
  // const id = Number(request.params.id)
  // const person = persons.find(p => p.id === id)
  // if(person) {
  //   response.json(person)
  // } else {
  //   response.status(400).end()
  // }
  Person.findById(request.params.id).then(p => {
    response.json(p)
    mongoose.connection.close()
  }).catch((error) => {
    console.log('error:', error.message)
    mongoose.connection.close()
  })
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
  if (request.body.name && request.body.number) {
    newName = request.body.name
    newNumber = request.body.number
  } else {
    return response.status(400).end() // bad request
  }
  // 2. name already in persons
  if (persons.map(p => p.name).includes(newName)) {
    return response.json({ error: 'name must be unique' })
  }
  const newPerson = {
    id: Math.floor(Math.random() * 65535),
    name: newName,
    number: newNumber
  }
  persons = persons.concat(newPerson) // bug: conflict possible
  response.json(newPerson)
})

const PORT = process.env.PORT
app.listen(PORT)
