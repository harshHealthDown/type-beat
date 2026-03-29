const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let persons = [
    { "id": "1", "name": "83_calm_walk", "rawspeed": 121.2, "speed": 110.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "2", "name": "23_bird_wht", "rawspeed": 99.1, "speed": 96.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "3", "name": "21_thecommunist", "rawspeed": 98.2, "speed": 95.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "4", "name": "9_i_love_hitler", "rawspeed": 87.5, "speed": 87.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "5", "name": "69_diddy_p", "rawspeed": 86.9, "speed": 83.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "6", "name": "72_epstein_dad", "rawspeed": 85.3, "speed": 84.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "7", "name": "23_pak_mujahid", "rawspeed": 79.2, "speed": 78.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "8", "name": "19_sp_immortal", "rawspeed": 78.5, "speed": 76.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "9", "name": "112_112_112", "rawspeed": 65.3, "speed": 64.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "10", "name": "88_depressed_p", "rawspeed": 64.2, "speed": 60.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "11", "name": "9_i_love_hitler", "rawspeed": 87.5, "speed": 87.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "12", "name": "69_diddy_p", "rawspeed": 86.9, "speed": 83.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "13", "name": "72_epstein_dad", "rawspeed": 85.3, "speed": 84.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "14", "name": "23_pak_mujahid", "rawspeed": 79.2, "speed": 78.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "15", "name": "19_sp_immortal", "rawspeed": 78.5, "speed": 76.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "16", "name": "112_112_112", "rawspeed": 65.3, "speed": 64.5, "accuracy":96.7, "lastupdated": "12/5/26" },{ "id": "17", "name": "69_diddy_p", "rawspeed": 86.9, "speed": 83.5, "accuracy":96.7, "lastupdated": "12/5/26" }
  ]

app.get('/persons',(req,res,next) => {
    res.status(200).json(persons)
})

app.get('/persons/:id',(req,res,next) => {
    const id = req.params.id
    res.status(200).json(persons.filter(person=>person.id==id)[0])
})

app.post('/persons',(req,res,next) => {
    const person = req.body
    persons.push(person)
    res.status(200).json(person)
})

app.put('/persons/:id',(req,res,next) => {
    const id = req.params.id
    for (let i = 0; i<persons.length; i++) {
        if (persons[i].id==id) {
            persons[i] = req.body
            break
        }
    }
    res.status(200).end()
})

app.delete('/persons/:id',(req,res,next) => {
    const id = req.params.id
    for (let i = 0; i<persons.length; i++) {
        if (persons[i].id==id) {
            persons = persons.filter(person=>person.id!=id)
            break
        }
    }
    res.status(200).end()
})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`app is listening to request on PORT ${PORT}`)
})