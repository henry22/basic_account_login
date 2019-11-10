const express = require('express')
const app = express()
const port = 3000
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const checkAccount = require('./check_account')

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/welcome', (req, res) => {
  const name = req.query.name
  res.render('welcome', { name: name })
})

app.post('/', (req, res) => {
  const account = req.body
  const isValidated = checkAccount(account).length ? true : false
  const matchAccount = checkAccount(account)[0]

  if (isValidated) {
    res.redirect('/welcome?name=' + matchAccount.firstName)
  } else {
    res.render('index', { isValidated: !isValidated })
  }
})

app.listen(port, () => console.log(`The server is listening on http:localhost:${port}`))