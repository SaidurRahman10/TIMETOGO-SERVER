const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

//middle wares


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxzlll3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);





app.use(cors());
app.use(express.json());

const service = require('./data/data.json')

app.get('/', (req, res) => {
    res.send('Tourist Server is Running')
  })
app.get('/service', (req, res) => {
    res.send(service)
  })
 

  app.listen(port)