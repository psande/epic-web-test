const bodyParser = require('body-parser')
let mockDatabase = require('./mockDatabase.js')

function AccountHandler (app) {
  // Middleware
  const jsonParser = bodyParser.json({})

  // Incremental ID
  let currentId = mockDatabase.length + 1

  app.get('/accounts', (req, res) => {
    res.json(mockDatabase)
  })

  app.get('/accounts/:id', (req, res) => {
    const id = Number(req.params.id)

    if (Object.is(id, NaN)) {
      res.json({ error: true, message: 'invalid.parameter' })
      return
    }

    const account = mockDatabase.find((account) => account.id === id)

    if (account) {
      res.json(account)
      return
    }

    res.json({ error: true, message: 'account.not.found' })
  })

  app.post('/accounts', jsonParser, (req, res) => {
    const id = currentId++

    mockDatabase.push({
      id,
      name: req.body.name,
      birthday: new Date(req.body.birthday),
      email: req.body.email,
    })

    res.json({
      success: true, id,
    })
  })

  app.delete('/accounts/:id', (req, res) => {
    const id = Number(req.params.id)
    const initialRecords = mockDatabase.length
    let removed = []

    if (!Object.is(id, NaN)) {
      mockDatabase = mockDatabase.reduce((accumulator, account) => {
        if (account.id !== id) {
          accumulator.push(account)
        } else {
          removed.push(account)
        }
        return accumulator
      }, [])
    }

    const success = mockDatabase.length !== initialRecords
    res.json({ success, removed })
  })

  app.put('/accounts/:id', jsonParser, (req, res) => {
    const id = Number(req.params.id)
    let toUpdate = []

    if (!Object.is(id, NaN)) {
      for (let i = 0; i < mockDatabase.length; i++) {
        if (mockDatabase[i].id === id) {
          toUpdate.push(mockDatabase[i])
          mockDatabase[i] = {
            id,
            name: req.body.name,
            birthday: new Date(req.body.birthday),
            email: req.body.email,
          }
        }
      }
    }

    res.json({ success: !!toUpdate, updated: toUpdate })
  })
}

module.exports = AccountHandler
