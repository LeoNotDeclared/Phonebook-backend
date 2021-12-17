const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

// 连接
mongoose.connect(url).then(result => {
  console.log('connected to MongoDB')
}).catch( (error) => {
  console.log('error connecting to MongoDB:', error.message)
})

// Schema
const personSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type:String,
    required: true
  }
})

// 对 personSchema 使用 uniqueValidator
personSchema.plugin(uniqueValidator)

// 重写 toJSON
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// 导出
module.exports = mongoose.model('Person', personSchema)