const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7fhovkc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
    
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const menuCollection = client.db('authenticFood').collection('products');
    const reviewCollection = client.db('authenticFood').collection('reviews');
    const cartCollection = client.db('authenticFood').collection('carts');
     
    app.get('/menu', async(req,res) => {
        const query = await menuCollection.find().toArray()
        res.send(query)
    })

    app.get('/reviews', async(req,res) => {
        const query = await reviewCollection.find().toArray()
        res.send(query)
    })

    app.post('/carts', async(req,res) => {
        const items = req.body;
        console.log(items)
        const result = await cartCollection.insertOne(items)
        res.send(result)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=> {
    res.send('food isn being cooked')
})

app.listen(port, ()=> {
    console.log("port is running", port)
})