const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const validateNum = (num) => {
  if (num.length <= 8) {
    return false
  }
  if (/\d{3}-\d+/.test(num)) {
    return true
  }
  return (/\d{2}-\d+/.test(num))
}

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    validate: validateNum
  }
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
  }
})

module.exports = mongoose.model('Phone', phoneSchema)