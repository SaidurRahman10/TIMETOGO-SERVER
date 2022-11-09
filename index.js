const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion , ObjectId} = require("mongodb");
require("dotenv").config();

//middle wares

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qxzlll3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const placeCollection = client.db("timetogo").collection("place");
    app.get("/place", async (req, res) => {
      const query = {};
      const data = placeCollection.find(query);
      const cursor = await data.limit(3).toArray();
      res.send(cursor);
    });
    app.get("/place/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const place = await placeCollection.findOne(query)
      res.send(place)
    });

    app.get("/allPlace", async (req, res) => {
        const query = {};
        const data = placeCollection.find(query);
        const cursor = await data.toArray();
        res.send(cursor);
    });
    
    
    app.get("/allPlace/:id", async(req, res) => {
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const place = await placeCollection.findOne(query)
        res.send(place)
    });
















  } finally {
  }
};
run().catch((error) => console.log(error));



app.get("/", (req, res) => {
  res.send("Tourist Server is Running");
});

app.listen(port);
