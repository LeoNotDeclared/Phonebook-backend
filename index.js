require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
// const mongoose = require('mongoose')

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
  }).catch((error) => {
    console.log('error:', error.message)
    response.status(400).end()
  })
})

// 3.4
app.delete('/api/persons/:id', (request, response, next) => {
  // const id = Number(request.params.id)
  // persons = persons.filter(p => p.id !== id)
  // response.status(204).end()
  Person.findByIdAndRemove(request.params.id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
})

// 3.5 - 3.6
app.post('/api/persons', (request, response, next) => {
  let newName = '', newNumber = ''
  // 1 name&num input bar not null
  if (request.body.name && request.body.number) {
    newName = request.body.name
    newNumber = request.body.number
  } else {
    // console.log('post null data')
    response.json({ error: 'post null data' })
    return response.status(400).end() // bad request
  }
  // 2. name already in persons
  // if (persons.map(p => p.name).includes(newName)) {
  //   return response.json({ error: 'name must be unique' })
  // }
  // Person.find({name: newName}).then(result => {
  //   console.log(result, result.length)
  //   if(result.length !== 0) {
  //     // response.json({ error: 'name must be unique' })
  //     // console.log('error: name must be unique')
  //     // 有问题 暂时为同一个名字的人提供多个条目 3.14
  //     return response.status(400).end() // bad request
  //   }
  // })
  // add to db
  const newPerson = new Person({
    id: Math.floor(Math.random() * 65535),
    name: newName,
    number: newNumber
  })
  // persons = persons.concat(newPerson) // bug: conflict possible
  newPerson.save()
    .then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
    })
    .catch(error => {
      next(error)
    })
  // response.json(newPerson)
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, {new: true}).then(updatePerson => {
    response.json(updatePerson)
  }).catch(error => next(error))
})

const unknowEndpoint = (request, response) => {
  response.status(404).send({error: 'unknow endpoint'})
}
app.use(unknowEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
