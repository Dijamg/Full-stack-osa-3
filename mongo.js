const mongoose = require('mongoose')

if ( process.argv.length != 3 && process.argv.length != 5  ) {
  console.log("Please give the right amount of parameters.")
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-c51f9.mongodb.net/person-app?retryWrites=true&w=majority`

    mongoose.connect(url, { useNewUrlParser: true })
    const personSchema = new mongoose.Schema({
        name: String,
        number: String
    })

    const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5){
    const personName = process.argv[3]
    const personNumber = process.argv[4]

    const person = new Person({
        name: personName,
        number: personNumber
    })

    person.save().then(result => {
        console.log(`Added ${personName} number ${personNumber} to phonebook.`)
        mongoose.connection.close()
    })

}else{
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    }


