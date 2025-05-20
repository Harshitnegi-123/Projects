// const express = require('express')
import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

const URL = 'mongodb://localhost:27017'
const client = new MongoClient(URL)


const dbName = 'PasswordManager'
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

await client.connect();

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult })
})

app.delete('/', async (req, res) => {
    const { id } = req.body
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.deleteOne({ id: id});
    res.send({ success: true, result: findResult })
})


app.listen(port, () => {
    console.log(`Example app listening on port  http://localhost:${port}`)
})