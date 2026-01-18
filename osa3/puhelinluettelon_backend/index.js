require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Contact = require('./models/contact')

app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

// GET all
app.get('/api/persons', (request, response, next) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
    .catch(error => next(error))
})

// GET by id
app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// GET Infosivu
app.get('/info', (request, response, next) => {
  const pvm = new Date()

  Contact.countDocuments({}).then(lkm => {
    response.send(`
            <p>Phonebook has info for ${lkm} people</p>
            <p>${pvm}</p>
            `)
  })
    .catch(error => next(error))
})

// POST
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save().then(savedContact => {
    response.json(savedContact)
  })
    .catch(error => next(error))
})

// PUT
app.put('/api/persons/:id', (request, response, next) => {
  console.log('Päivitetään:', request.params.id)

  const { name, number } = request.body

  Contact.findById(request.params.id)
    .then(contact => {
      if (!contact) {
        console.log('eipä löytyny')
        return response.status(404).end()
      }

      contact.name = name
      contact.number = number

      return contact.save().then((updatetContact) => {
        response.json(updatetContact)
      })
    })
    .catch(error => next(error))
})

// DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.use(express.static('dist'))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
