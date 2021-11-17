const mongoose = require('mongoose')

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
  id: Number,
  name: String,
  number: String
})

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