const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json())

const uri = "mongodb+srv://himel:himel646@cluster0.tmyoe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("BloodDb");
    const haiku = database.collection("users");
    
    // get method
    app.get('/users', async(req, res) => {
      const cursor = haiku.find({});
      const users = await cursor.toArray();
      res.send(users)
    })

    // post method
    app.post('/users', async(req, res) => {
      const newUser = req.body

      const result = await haiku.insertOne(newUser);

      res.json(result)
      console.log(`A document was inserted with the _id: ${result.insertedId}`, result);
    })

  } finally {

    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})