const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('ERROR: Missing password')
  process.exit(1)
}

const username = 'jacob'
const password = process.argv[2]
const url = `mongodb+srv://${username}:${password}@cluster0.cbxjmju.mongodb.net/phonebook?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

if (process.argv.length === 5) {
  console.log('Saving note...')
  const name = process.argv[3]
  const num = process.argv[4]

  const phone = new Phone({
    name: name,
    number: num,
  })

  phone.save().then(result => {
    console.log(`added ${name} number ${num} to phonebook`)
    mongoose.connection.close()
  })

} else if (process.argv.length === 3) {
  console.log('Finding numbers...')
  Phone.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(phone => {
      console.log(phone.name, phone.number)
    })
    mongoose.connection.close()
  })
}
